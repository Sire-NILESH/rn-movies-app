import * as SQlite from "expo-sqlite";
import {
  IDBEpisode,
  IImageItemSettingsValue,
  IReduxListMedia,
  ImageItemTypes,
  MediaTypes,
  TCollectionType,
  TDbCollectionType,
} from "../../types/typings";
import {
  allImageItemsQualities,
  allImgItemsType,
  allImgItemsValues,
  defaultImgQualitiesconfig,
} from "../config/imgQualityConfig";

export type TValidTableNames = "medias" | "collection" | "image_qualities";
export type TValidDBNames = "settingsDatabase" | "collectionDatabase";

let settingsDatabase: SQlite.SQLiteDatabase;
let collectionDatabase: SQlite.SQLiteDatabase;

export const dbOpen = () => {
  settingsDatabase = SQlite.openDatabase("app_settings.db");
  collectionDatabase = SQlite.openDatabase("mediaCollection.db");
};

// Open the database
dbOpen();

export const dbClose = async () => {
  settingsDatabase.closeAsync();
  collectionDatabase.closeAsync();
};

// "watchlist" | "favourites" | "watched";
const mapper: { [key in TCollectionType]: TDbCollectionType } = {
  watchlist: "watchlist",
  favourites: "favourites",
  watched: "watched",
};

interface ISQLQuery {
  query: string;
  arguments: (string | number | null)[];
  successMessage: string;
  errorMessage: string;
  rowsAffectedSuccess?: String;
  nestedQueryWhenEmptyTable?: ISQLQuery[];
  // nestedQuery?: ISQLQuery[];
}

// function to execute multiple SQL statements
const executeMultipleQueries = async (
  sqlStatements: ISQLQuery[],
  finalMessage: string,
  database: SQlite.WebSQLDatabase
) => {
  return new Promise<void>((resolve, reject) => {
    database.transaction(
      (tx) => {
        sqlStatements.forEach((sql) => {
          tx.executeSql(
            sql.query,
            sql.arguments,
            (_tx, results) => {
              // console.log(sql.successMessage);
              if (sql.rowsAffectedSuccess && results.rowsAffected > 0) {
                // console.log(sql.rowsAffectedSuccess);
              }

              if (results.rows.length === 0) {
                // EXE ANY NESTED SQL STATEMENT FOR CASE WHEN ROWS WERE AFFECTED.
                if (sql.nestedQueryWhenEmptyTable !== undefined) {
                  // create the async function that will execute the nested SQL statements
                  async function exeNestedQuery() {
                    // ts needed a new check to make sure it is'nt undefined
                    if (sql.nestedQueryWhenEmptyTable)
                      await executeMultipleQueries(
                        sql.nestedQueryWhenEmptyTable,
                        "success running nested query",
                        database
                      );
                  }

                  exeNestedQuery();
                }
              }
              // }
            },
            (_, err) => {
              // console.log(sql.errorMessage);
              // console.log(err);
              // reject(err);
              return true;
            }
          );
        });
      },
      (error) => {
        reject(error);
      },
      () => {
        // console.log(finalMessage);
        resolve();
      }
    );
  });
};

export async function initSettingsDB() {
  const sqlStatements: ISQLQuery[] = [
    // IMAGE ITEMS QUALITIES TABLE
    {
      query: `CREATE TABLE IF NOT EXISTS image_qualities (
        name TEXT NOT NULL CHECK (name IN ( 
          ${allImgItemsType.map((img) => `\'${img}\'`).join(", ")}
          )),
        quality TEXT NOT NULL CHECK (quality IN ( 
          ${allImageItemsQualities.map((img) => `\'${img}\'`).join(", ")}
          )),
        value TEXT NOT NULL CHECK (value IN ( 
          ${allImgItemsValues.map((img) => `\'${img}\'`).join(", ")}
          )),
        PRIMARY KEY (name)
      );`,
      arguments: [],
      successMessage: "...checked image_qualities table STATUS: FINE",
      rowsAffectedSuccess:
        "...image_qualities table was CREATED into the database ✨",
      errorMessage: "Error creating image_qualities table",
    },
    // INSERT INITIAL DATA TO IMG ITEM QUALITY SETTINGS TABLE
    {
      query: `
          SELECT *
          FROM image_qualities
      ;`,
      arguments: [],
      successMessage: "...checking image_qualities table if empty",
      rowsAffectedSuccess: "...image_qualities table was found empty",
      nestedQueryWhenEmptyTable: [
        {
          query: `INSERT INTO image_qualities (
          name,
          quality,
          value
          ) VALUES
           (?, ?, ?),
           (?, ?, ?),
           (?, ?, ?),
           (?, ?, ?);`,
          arguments: [
            "thumbnail",
            "Default",
            defaultImgQualitiesconfig["thumbnail"].value,
            "watchProviders",
            "Default",
            defaultImgQualitiesconfig["watchProviders"].value,
            "banner",
            "Default",
            defaultImgQualitiesconfig["banner"].value,
            "companies",
            "Default",
            defaultImgQualitiesconfig["companies"].value,
          ],
          successMessage: "...adding initial data to image_qualities table",
          rowsAffectedSuccess:
            "...image_qualities table's initial data was added into the table since it was found empty",
          errorMessage:
            "Error add initial data to image_qualities table from nested query",
        },
      ],
      errorMessage: "Error add initial data to image_qualities table",
    },
  ];

  // execute querys
  try {
    await executeMultipleQueries(
      sqlStatements,
      "...Stage 1 Settings DB setup completed",
      settingsDatabase
    );
    console.log("Inital Settings DB setup completed ✅");
  } catch (error) {
    throw error;
  }
}

export async function initCollectionDB() {
  const sqlStatements: ISQLQuery[] = [
    // MEDIAS TABLE
    {
      query: `CREATE TABLE IF NOT EXISTS medias (
      mediaId REAL NOT NULL,
      mediaType TEXT NOT NULL,
      mediaTitle TEXT NULL,
      mediaDate REAL NULL,
      poster_path TEXT NULL,
      backdrop_path TEXT NULL,
      PRIMARY KEY (mediaId, mediaType)
     ) `,
      arguments: [],
      successMessage: "...checked media table STATUS: FINE",
      rowsAffectedSuccess: "...media table was CREATED into the database ✨",
      errorMessage: "Error creating media table",
    },
    // WATCHED EPISODES TABLE
    {
      query: `CREATE TABLE IF NOT EXISTS watched_episodes (
      episodeId REAL NOT NULL,
      seasonId REAL NOT NULL,
      tvShowId REAL NOT NULL,
      watchedDate REAL NULL,
      PRIMARY KEY (episodeId)
     ) `,
      arguments: [],
      successMessage: "...checked watched_episodes table STATUS: FINE",
      rowsAffectedSuccess:
        "...watched_episodes table was CREATED into the database ✨",
      errorMessage: "Error creating watched_episodes table",
    },
    // WATCHED INDICES TABLE FOR EPISODES TABLE FOR FASTER LOOKUP.
    {
      query: `CREATE INDEX IF NOT EXISTS
      idx_season_with_show
      ON watched_episodes (tvShowId, seasonId); 
      `,
      arguments: [],
      successMessage: "...checked idx_tvShowId_seasonId table STATUS: FINE",
      rowsAffectedSuccess:
        "...idx_tvShowId_seasonId table was CREATED into the database ✨",
      errorMessage: "Error creating idx_tvShowId_seasonId table",
    },
    // COLLECTION TABLE
    {
      query: `CREATE TABLE IF NOT EXISTS collection (
        mediaId REAL NOT NULL,
        mediaType TEXT NOT NULL,
        dateAdded REAL NOT NULL,
        dateAddedString TEXT NOT NULL,
        collection TEXT NOT NULL CHECK (collection IN ('favourites', 'watchlist', 'watched')),
        PRIMARY KEY (mediaId, mediaType, collection),
        FOREIGN KEY (mediaId, mediaType) REFERENCES medias (mediaId, mediaType) ON DELETE CASCADE
      )`,
      arguments: [],
      successMessage: "...checked collection table STATUS: FINE",
      rowsAffectedSuccess:
        "...collection table was CREATED into the database ✨",
      errorMessage: "Error creating collection table",
    },
  ];

  // execute querys
  try {
    await executeMultipleQueries(
      sqlStatements,
      "...Stage 1 Collection DB setup completed",
      collectionDatabase
    );
    console.log("Inital Collection DB setup completed ✅");
  } catch (error) {
    throw error;
  }
}

export async function addImgItemSetting(
  newImgSetting: IImageItemSettingsValue
) {
  const sqlStatements: ISQLQuery[] = [
    {
      query: `
        UPDATE image_qualities
        SET quality = ?, value = ?
        WHERE name = ?
      `,
      arguments: [
        newImgSetting.imgQuality.quality,
        newImgSetting.imgQuality.value,
        newImgSetting.key,
      ],
      successMessage:
        "...attempt to add new img settings data into image_qualities table",
      rowsAffectedSuccess: `SUCCESS, new img settings data for ${newImgSetting.key} added to image_qualities table`,
      errorMessage: `Error adding new img settings data for ${newImgSetting.key} to image_qualities table`,
    },
  ];

  await executeMultipleQueries(
    sqlStatements,
    "added new img settings region",
    settingsDatabase
  );
}

export function getImgItemSetting(imgItem: ImageItemTypes) {
  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    settingsDatabase.transaction((tx) => {
      tx.executeSql(
        `SELECT * 
        FROM image_qualities
        WHERE name = ?
        `,
        [imgItem],
        (_, results) => {
          // console.log("Got data from table");
          resolve(results);
        },
        (_, err) => {
          // console.log(
          //   "error retrieveing data from table, from database.js\n",
          //   err
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function showAllTablesInDb(database: SQlite.WebSQLDatabase) {
  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
      SELECT name 
      FROM sqlite_master 
      WHERE type = 'table'
      ORDER BY name
      `,
        [],
        (_tx, results) => {
          // console.log("Total tables in the database: ", results.rows.length);
          // console.log(results.rows._array);
          resolve(results);
        },
        (_tx, err) => {
          // console.log("Error fetching tables from database");
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

// DELETE FROM media_categories
// WHERE mediaId = 1 AND mediaType = 'movie' AND category = 'favourite';
export function removeMediaFromCollection(
  mediaId: number,
  mediaType: MediaTypes,
  collectionType: TCollectionType
) {
  const promise = new Promise<void>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `
      DELETE FROM collection
      WHERE mediaId = ?
      AND mediaType = ? 
      AND collection = ?
      `,
        [mediaId, mediaType, collectionType],
        // SUCCESS CASE LEVEL 1
        () => {
          // console.log(
          //   `DELETEed media ${mediaId} of type ${mediaType} from ${collectionType} collection`
          // );

          // When reached here, we removed the media from the collection, now also remove it from the medias table.
          collectionDatabase.transaction((tx) => {
            tx.executeSql(
              `DELETE FROM medias 
               WHERE mediaId = ? AND mediaType = ? AND NOT EXISTS (
                SELECT 1 FROM collection 
                WHERE mediaId = ? AND mediaType = ? 
               )
                `,
              [mediaId, mediaType, mediaId, mediaType],
              // SUCCESS CASE LEVEL 2
              (_tx, results) => {
                if (results.rowsAffected > 0) {
                  // console.log(
                  //   `DELETEed media ${mediaId} of type ${mediaType} from the medias table as it was in no other collection`
                  // );
                }
                resolve();
              },
              // ERROR CASE LEVEL 2
              (_, err) => {
                // console.log(
                //   `Error INSERTING media into the collection as ${collectionType}js`
                // );
                reject(err);
                return true;
              }
            );
          });
        },
        // ERROR CASE LEVEL 1
        (_tx, err) => {
          // console.log(
          //   `Error DELETING media ${mediaId} of type ${mediaType} from the ${collectionType} collection, database.js`
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function insertMediaToCollection(
  media: IReduxListMedia,
  collectionType: TCollectionType
) {
  const promise = new Promise<void>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `
      INSERT INTO collection (
        mediaId,
        mediaType,
        dateAdded, 
        dateAddedString,
        collection
      ) VALUES (?, ?, ?, ?, ?);`,
        [
          media.mediaId,
          media.mediaType,
          media.dateAdded,
          new Date(media.dateAdded).toDateString(),
          collectionType,
        ],
        () => {
          // console.log(`Inserted media into collection as ${collectionType}`);

          // When reached here, we have the media into the collection, now also add it to the medias table.
          collectionDatabase.transaction((tx) => {
            tx.executeSql(
              `INSERT OR IGNORE INTO medias (
                mediaId, 
                mediaType, 
                mediaTitle, 
                mediaDate, 
                poster_path, 
                backdrop_path
                )
                VALUES (?, ?, ?, ?, ?, ?);
                `,
              [
                media.mediaId,
                media.mediaType,
                media.mediaTitle ? media.mediaTitle : null,
                media.mediaDate ? media.mediaDate : null,
                media.poster_path ? media.poster_path : null,
                media.backdrop_path ? media.backdrop_path : null,
              ],
              () => {
                // console.log("INSERTED media into medias table");
                resolve();
              },
              (_, err) => {
                // console.log(
                //   "error INSERTING media into medias table, from database.js\n",
                //   err
                // );
                reject(err);
                return true;
              }
            );
          });
        },
        (_tx, err) => {
          // console.log(
          //   `Error INSERTING media into the collection as ${collectionType}`
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

// Query to find if a media is in a specific category:
export function mediaExistsInCollection(
  mediaId: number,
  mediaType: MediaTypes,
  collectionType: TCollectionType
) {
  const promise = new Promise<Boolean>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `
        SELECT 1 FROM collection 
        WHERE mediaId = ?
        AND mediaType = ?
        AND collection = ?
        `,
        [mediaId, mediaType, collectionType],
        (_tx, results) => {
          // console.log(
          //   `Media ${mediaId} of type ${mediaType} queried in ${collectionType} collection table`
          // );
          if (results.rows.length > 0) {
            // media exists
            // console.log("Media exists");
            resolve(true);
          } else {
            // media does not exist.
            // console.log("Media does not exist");
            resolve(false);
          }
        },
        (_tx, err) => {
          // console.log(
          //   `Error querying ${mediaId} of type ${mediaType} in ${collectionType} collection table`
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

// gets all the medias of a specified mediatype from specified collection/category
export function getMediasFromCollection(
  mediaType: MediaTypes,
  collectionType: TCollectionType,
  sort?: "ASC" | "DESC"
) {
  const collectionColumn = mapper[collectionType];

  // ? for parameters are only applicable when it is a value and not a table/column name. we added the column name dynamically but in an unconventional way of doing it by string interpolation. But it is strictly typed.
  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `SELECT 
        m.mediaId,
        m.mediaType,
        m.mediaTitle,
        m.mediaDate,
        m.poster_path,
        m.backdrop_path,
        c.dateAdded,
        c.dateAddedString
         FROM medias AS m
         JOIN collection AS c
         ON m.mediaId = c.mediaId
         AND m.mediaType = c.mediaType
         AND c.mediaType = ?
         WHERE c.collection = ?
         ORDER BY c.dateAdded ${sort ? sort : "DESC"};
        `,
        [mediaType, collectionColumn],
        // [mediaType, collectionColumn],
        (_, results) => {
          // console.log(`Got ${mediaType} medias from ${collectionColumn}`);
          resolve(results);
        },
        (_, err) => {
          // console.log(
          //   `error retrieveing ${mediaType} medias from ${collectionColumn}, from database.js\n`,
          //   err
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function getAllFromCollection() {
  const promise = new Promise<void>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `SELECT * 
        FROM medias
        `,
        [],
        (_, results) => {
          // console.log(
          //   `Got ${results.rows.length} data from medias table :`,
          //   results.rows._array
          // );

          collectionDatabase.transaction((tx) => {
            tx.executeSql(
              `SELECT * 
              FROM collection
              `,
              [],
              (_, results) => {
                // console.log(
                //   `Got ${results.rows.length} data from collection table :`,
                //   results.rows._array
                // );
              }
            );
          });

          resolve();
        },
        (_, err) => {
          // console.log(
          //   "error retrieveing data from table, from database.js\n",
          //   err
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function getdataFromATableFromDB(
  tableName: TValidTableNames,
  dbName: TValidDBNames
) {
  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    const database =
      dbName === "collectionDatabase" ? collectionDatabase : settingsDatabase;

    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * 
        FROM ${tableName}
        `,
        [],
        (_, results) => {
          // console.log("Got data from table");
          resolve(results);
        },
        (_, err) => {
          // console.log(
          //   "error retrieveing data from table, from database.js\n",
          //   err
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function insertEpisode(episode: IDBEpisode) {
  const promise = new Promise<void>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `
      INSERT INTO watched_episodes (
        episodeId, 
        seasonId, 
        tvShowId, 
        watchedDate
      ) VALUES (?, ?, ?, ?);`,
        [
          episode.episodeId,
          episode.seasonId,
          episode.tvShowId,
          episode.watchedDate,
        ],
        () => {
          // console.log(
          //   `Inserted episode ${episode.episodeId} into watched_episodes`
          // );
          resolve();
        },
        (_tx, err) => {
          // console.log(
          //   `Error INSERTING episode ${episode.episodeId} into the watched_episodes`
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function removeEpisode(episodeId: number) {
  const promise = new Promise<void>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `
      DELETE FROM watched_episodes
      WHERE episodeId = ?
      `,
        [episodeId],
        // SUCCESS CASE LEVEL 1
        () => {
          // console.log(
          //   `DELETEed episode ${episodeId} from watched_episodes table`
          // );
          resolve();
        },
        // ERROR CASE
        (_tx, err) => {
          // console.log(
          //   `Error DELETING episode ${episodeId} from the $watched_episodes database.js`
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function getAllWatchedEpisoesOfShowsSeason(
  tvShowId: number,
  seasonId: number
) {
  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `SELECT * 
        FROM watched_episodes
        WHERE tvShowId = ?
        AND seasonId = ?
        `,
        [tvShowId, seasonId],
        (_, results) => {
          // console.log("Got data from table");
          resolve(results);
        },
        (_, err) => {
          // console.log(
          //   "error retrieveing data from table, from database.js\n",
          //   err
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export async function deleteCollection(collectionType: TDbCollectionType) {
  // find and change the collection column of the media to FALSE which means it was removed form the collection.
  const promise = new Promise<void>((resolve, reject) => {
    collectionDatabase.transaction((tx) => {
      tx.executeSql(
        `
      DELETE FROM collection
      WHERE collection = ?
      `,
        [collectionType],
        // SUCCESS CASE LEVEL 1
        (_tx, results) => {
          if (results.rowsAffected > 0) {
            // console.log(
            //   `DELETED all medias from ${collectionType} collection 💥`
            // );
          }

          // When reached here, we removed the media from the collection, now also remove it from the medias table.
          collectionDatabase.transaction((tx) => {
            tx.executeSql(
              `DELETE 
               FROM medias 
               WHERE (mediaId, mediaType) 
               NOT IN (
                SELECT DISTINCT mediaId, mediaType 
                FROM collection 
               )
                `,
              [],
              // SUCCESS CASE LEVEL 2
              (_tx, results) => {
                if (results.rowsAffected > 0) {
                  // console.log(
                  //   `DELETEed all medias from the medias table that was of the type ${collectionType} collection`
                  // );
                }
                resolve();
              },
              // ERROR CASE LEVEL 2
              (_, err) => {
                // console.log(
                //   `Error DELETING medias from the medias table, from database.js`
                // );
                reject(err);
                return true;
              }
            );
          });
        },
        // ERROR CASE LEVEL 1
        (_tx, err) => {
          // console.log(
          //   `Error DELETING medias from the ${collectionType} collection, from database.js`
          // );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export async function deleteAllTables(database: SQlite.WebSQLDatabase) {
  // find and change the collection column of the media to FALSE which means it was removed form the collection.
  return await new Promise<void>((resolve, reject) => {
    const tableNames = [
      "collection",
      "medias",
      "mediaCollection",
      "image_qualities",
    ];

    database.transaction((tx) => {
      tableNames.forEach((tableName) => {
        tx.executeSql(
          `DROP TABLE IF EXISTS ${tableName}`,
          [],
          () => {
            console.log("DELETED TABLE " + tableName + " 💥");
            resolve();
          },
          (_, err) => {
            // console.log(
            //   `error deleting "${tableName}" table, from database.js\n`,
            //   err
            // );
            reject(err);
            return true;
          }
        );
      });
    });
  });
}
