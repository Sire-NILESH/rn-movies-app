import * as SQlite from "expo-sqlite";
import {
  IReduxListMedia,
  MediaTypes,
  TCollectionType,
  TDbCollectionType,
} from "../../types/typings";

const database = SQlite.openDatabase("mediaCollection.db");

// "watchlist" | "favourites" | "watched";
const mapper: { [key in TCollectionType]: TDbCollectionType } = {
  watchlist: "watchlist",
  favourites: "favourites",
  watched: "watched",
};

export function initDB() {
  // initialize the database
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS medias (
          mediaId REAL NOT NULL,
          mediaType TEXT NOT NULL,
          dateAdded REAL NOT NULL,
          dateAddedString TEXT NOT NULL,
          mediaTitle REAL NULL,
          mediaDate REAL NULL,
          poster_path TEXT NULL,
          backdrop_path TEXT NULL,
          PRIMARY KEY (mediaId, mediaType)
         ) `,
        [],
        () => {
          console.log("...media Table was CREATED into the database");
          tx.executeSql(
            `
          CREATE TABLE IF NOT EXISTS collection (
            mediaId REAL NOT NULL,
            mediaType TEXT NOT NULL,
            collection TEXT NOT NULL CHECK (collection IN ('favourites', 'watchlist', 'watched')),
            PRIMARY KEY (mediaId, mediaType, collection),
            FOREIGN KEY (mediaId, mediaType) REFERENCES medias (mediaId, mediaType) ON DELETE CASCADE
          )`,
            [],
            (tx, results) => {
              console.log("...collection Table was CREATED into the database");
              console.log("Initial DB setup completed.");
              resolve();
            },
            (_, err) => {
              console.log("Error while CREATING Collection Table\n", err);
              reject(err);
              console.log("Initial DB setup failed.");
              return true;
            }
          );
          resolve();
        },
        (_, err) => {
          console.log("error CREATING inital tables in the database\n", err);
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function showAllTablesInDb() {
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
          console.log("Total tables in the database: ", results.rows.length);
          console.log(results.rows._array);
          resolve(results);
        },
        (_tx, err) => {
          console.log("Error fetching tables from database");
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
    database.transaction((tx) => {
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
          console.log(
            `DELETEed media ${mediaId} of type ${mediaType} from ${collectionType} collection`
          );

          // When reached here, we removed the media from the collection, now also remove it from the medias table.
          database.transaction((tx) => {
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
                  console.log(
                    `DELETEed media ${mediaId} of type ${mediaType} from the medias table as it was in no other collection`
                  );
                }
                resolve();
              },
              // ERROR CASE LEVEL 2
              (_, err) => {
                console.log(
                  `Error INSERTING media into the collection as ${collectionType}js`
                );
                reject(err);
                return true;
              }
            );
          });
        },
        // ERROR CASE LEVEL 1
        (_tx, err) => {
          console.log(
            `Error DELETING media ${mediaId} of type ${mediaType} from the ${collectionType} collection, database.js`
          );
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
    database.transaction((tx) => {
      tx.executeSql(
        `
      INSERT INTO collection (
        mediaId,
        mediaType,
        collection
      ) VALUES (?, ?, ?)`,
        [media.mediaId, media.mediaType, collectionType],
        () => {
          console.log(`Inserted media into collection as ${collectionType}`);

          // When reached here, we have the media into the collection, now also add it to the medias table.
          database.transaction((tx) => {
            tx.executeSql(
              `INSERT OR IGNORE INTO medias (
                mediaId, 
                mediaType, 
                dateAdded, 
                dateAddedString,
                mediaTitle, 
                mediaDate, 
                poster_path, 
                backdrop_path
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `,
              [
                media.mediaId,
                media.mediaType,
                media.dateAdded,
                new Date(media.dateAdded).toDateString(),
                media.mediaTitle ? media.mediaTitle : null,
                media.mediaDate ? media.mediaDate : null,
                media.poster_path ? media.poster_path : null,
                media.backdrop_path ? media.backdrop_path : null,
              ],
              () => {
                console.log("INSERTED media into medias table");
                resolve();
              },
              (_, err) => {
                console.log(
                  "error INSERTING media into medias table, from database.js\n",
                  err
                );
                reject(err);
                return true;
              }
            );
          });
        },
        (_tx, err) => {
          console.log(
            `Error INSERTING media into the collection as ${collectionType}`
          );
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
    database.transaction((tx) => {
      tx.executeSql(
        `
        SELECT 1 FROM collection 
        WHERE mediaId = ?
        AND mediaType = ?
        AND collection = ?
        `,
        [mediaId, mediaType, collectionType],
        (_tx, results) => {
          console.log(
            `Media ${mediaId} of type ${mediaType} queried in ${collectionType} collection table`
          );
          if (results.rows.length > 0) {
            // media exists
            console.log("Media exists");
            resolve(true);
          } else {
            // media does not exist.
            console.log("Media does not exist");
            resolve(false);
          }
        },
        (_tx, err) => {
          console.log(
            `Error querying ${mediaId} of type ${mediaType} in ${collectionType} collection table`
          );
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
  collectionType: TCollectionType
) {
  const collectionColumn = mapper[collectionType];

  // ? for parameters are only applicable when it is a value and not a table/column name. we added the column name dynamically but in an unconventional way of doing it by string interpolation. But it is strictly typed.
  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT *
         FROM medias
         WHERE (mediaId, mediaType) 
         IN (
          SELECT mediaId, mediaType
          FROM collection 
          WHERE mediaType = ?
          AND collection = ?
          )
          ORDER BY dateAdded DESC
        `,
        [mediaType, collectionColumn],
        // [mediaType, collectionColumn],
        (_, results) => {
          console.log(`Got ${mediaType} medias from ${collectionColumn}`);
          resolve(results);
        },
        (_, err) => {
          console.log(
            `error retrieveing ${mediaType} medias from ${collectionColumn}, from database.js\n`,
            err
          );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function getAllFromCollection() {
  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * 
        FROM medias
        `,
        [],
        (_, results) => {
          console.log("Got data from table");
          resolve(results);
        },
        (_, err) => {
          console.log(
            "error retrieveing data from table, from database.js\n",
            err
          );
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
    database.transaction((tx) => {
      tx.executeSql(
        `
      DELETE FROM collection
      WHERE collection = ?
      `,
        [collectionType],
        // SUCCESS CASE LEVEL 1
        (_tx, results) => {
          if (results.rowsAffected > 0) {
            console.log(
              `DELETED all medias from ${collectionType} collection 💥`
            );
          }

          // When reached here, we removed the media from the collection, now also remove it from the medias table.
          database.transaction((tx) => {
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
                  console.log(
                    `DELETEed all medias from the medias table that was of the type ${collectionType} collection`
                  );
                }
                resolve();
              },
              // ERROR CASE LEVEL 2
              (_, err) => {
                console.log(
                  `Error DELETING medias from the medias table, from database.js`
                );
                reject(err);
                return true;
              }
            );
          });
        },
        // ERROR CASE LEVEL 1
        (_tx, err) => {
          console.log(
            `Error DELETING medias from the ${collectionType} collection, from database.js`
          );
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export async function deleteAllTables() {
  // find and change the collection column of the media to FALSE which means it was removed form the collection.
  return await new Promise<void>((resolve, reject) => {
    const tableNames = ["collection", "medias"];

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
            console.log(
              `error deleting "${tableName}" table, from database.js\n`,
              err
            );
            reject(err);
            return true;
          }
        );
      });
    });
  });
}
