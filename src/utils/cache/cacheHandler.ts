// import { Cache } from "react-native-cache";

// const cache = new Cache({
//   namespace: "myapp",
//   backend: {
//     type: "asyncstorage",
//     options: {
//       size: 1000,
//       defaultExpires: 24 * 60 * 60 * 1000, // 1 day
//       enableCache: true,
//       sync: {
//         maxAge: 30 * 60 * 1000, // 30 minutes
//         autoSync: false, // disable automatic syncing
//       },
//     },
//   },
// });

// cache
//   .get("mykey")
//   .then((data) => {
//     // display UI with cached data
//   })
//   .catch((error) => {
//     // handle cache miss
//   });

// // Manually trigger the sync operation as needed
// cache
//   .sync()
//   .then(() => {
//     // handle successful sync
//   })
//   .catch((error) => {
//     // handle sync error
//   });
