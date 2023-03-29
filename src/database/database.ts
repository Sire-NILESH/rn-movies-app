import * as SQlite from "expo-sqlite";
import { IReduxListMedia, MediaTypes, TCollectionType } from "../typings";

const database = SQlite.openDatabase("mediaCollection.db");

// "watchlist" | "favourites" | "watched";
const mapper: { [key in TCollectionType]: string } = {
  watchlist: "isWatchlist",
  favourites: "isFavourite",
  watched: "isWatched",
};

export function initDB() {
  // initialize the database
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS mediaCollection (
          mediaId REAL PRIMARY KEY,
          mediaType TEXT,
          dateAdded REAL,
          dateAddedString TEXT,
          mediaTitle REAL NULL,
          mediaDate REAL NULL,
          poster_path TEXT NULL,
          backdrop_path TEXT NULL,
          isFavourite BOOLEAN,
          isWatchlist BOOLEAN,
          isWatched BOOLEAN
         ) `,
        [],
        () => {
          console.log("Table was CREATED into the database");
          resolve();
        },
        (_, err) => {
          console.log("error CREATING table, from database.js\n", err);
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
        `INSERT INTO mediaCollection (
          mediaId, 
          mediaType, 
          dateAdded, 
          dateAddedString,
          mediaTitle, 
          mediaDate, 
          poster_path, 
          backdrop_path, 
          isFavourite, 
          isWatchlist, 
          isWatched
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          media.mediaId,
          media.mediaType,
          media.dateAdded,
          new Date(media.dateAdded).toDateString(),
          media.mediaTitle ? media.mediaTitle : null,
          media.mediaDate ? media.mediaDate : null,
          media.poster_path ? media.poster_path : null,
          media.backdrop_path ? media.backdrop_path : null,
          collectionType === "favourites" ? "TRUE" : "FALSE",
          collectionType === "watchlist" ? "TRUE" : "FALSE",
          collectionType === "watched" ? "TRUE" : "FALSE",
        ],
        () => {
          console.log("INSERTED data into table");
          resolve();
        },
        (_, err) => {
          console.log(
            "error INSERTING data into table, from database.js\n",
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

// `SELECT *
//         FROM mediaCollection
//         WHERE mediaType = ?
//         AND ? = "TRUE"
//         GROUP BY dateAddedString
//         ORDER BY dateAdded DESC
//         `;

export function getMediaFromCollection(
  mediaType: MediaTypes,
  collectionType: TCollectionType
) {
  const collectionColumn = mapper[collectionType];

  console.log("pppaaarraaams", mediaType, collectionColumn);

  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT *
         FROM mediaCollection
         WHERE mediaType = "tv"
         AND isWatchlist = "TRUE"
         ORDER BY dateAdded DESC
        `,
        [],
        // [mediaType, collectionColumn],
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

export function getAllFromCollection() {
  const promise = new Promise<SQlite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * 
        FROM mediaCollection
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

// export function getMediaFromCollection(
//   mediaId: number,
//   mediaType: MediaTypes,
//   collectionType: TCollectionType
// ) {
//   const collectionColumn = mapper[collectionType];

//   const promise = new Promise<void>((resolve, reject) => {
//     database.transaction((tx) => {
//       tx.executeSql(
//         `SELECT *
//         FROM mediaCollection
//         WHERE mediaId = ?
//         AND mediaType = ?
//         AND ? = "TRUE"
//         GROUP BY dateAddedString
//         ORDER BY dateAdded DESC
//         `,
//         [mediaId, mediaType, collectionColumn],
//         () => {
//           resolve();
//         },
//         (_, err) => {
//           console.log(
//             "error retrieveing data from table, from database.js\n",
//             err
//           );
//           reject(err);
//           return true;
//         }
//       );
//     });
//   });

//   return promise;
// }

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

// DROP TABLE [IF EXISTS] [schema_name.]table_name;  mediaCollection
export async function deleteCollection() {
  // find and change the collection column of the media to FALSE which means it was removed form the collection.
  return await new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS mediaCollection`,
        [],
        () => {
          console.log("DELETED DATABASE 💥");
          resolve();
        },
        (_, err) => {
          console.log("error deleting table, from database.js\n", err);
          reject(err);
          return true;
        }
      );
    });
  });
}

export async function deleteMediaFromCollection(
  mediaId: number,
  mediaType: MediaTypes,
  collectionType: TCollectionType
) {
  const collectionColumn = mapper[collectionType];

  // find and change the collection column of the media to FALSE which means it was removed form the collection.
  await new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
      UPDATE mediaCollection
      SET ? = "FALSE"
      WHERE mediaId = ? AND mediaType = ?
      `,
        [collectionColumn, mediaId, mediaType],
        () => {
          console.log("REMOVED data from COLLECTION");
          resolve();
        },
        (_, err) => {
          console.log(
            "error removing media from a collection in the table, from database.js\n",
            err
          );
          reject(err);
          return true;
        }
      );
    });
  });

  // now suppose if the media has all the collection columns set to "FALSE" then there is no point in keeping the media, look for it and delete it.
  const promiseDelete = await new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
      DELETE FROM mediaCollection 
      WHERE mediaId = ? 
            AND mediaType = ? 
            AND isFavorite = "FALSE"
            AND isWatchlist = "FALSE"
            AND isWatched = "FALSE"
      `,
        [mediaId, mediaType],
        () => {
          console.log(
            "Data was not found further in any other collection, hence DELETED media from table"
          );
          resolve();
        },
        (_, err) => {
          console.log(
            "error removing media from a collection in the table, from database.js\n",
            err
          );
          reject(err);
          return true;
        }
      );
    });
  });

  return promiseDelete;
}
