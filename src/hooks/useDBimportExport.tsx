import { Platform } from "react-native";
import { useState } from "react";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { dbClose, dbOpen, initCollectionDB } from "../storage/database";
import { showErrorToast, showSuccessToast } from "../utils/helpers/helper";
import { useAppDispatch } from "./reduxHooks";
import { forceUpdateDbCollectionModified } from "../store/dbCollectionModifiedSlice";

const useDBimportExport = () => {
  const [isLoadingImportExport, setIsLoadingImportExport] = useState(true);
  const dispatch = useAppDispatch();

  const exportDb = async () => {
    if (Platform.OS === "android") {
      /** in case of Android, we need to check for storage permissions to the path on the disk(that the user will select) 
       where we are going to export the backup to.*/
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      /** if the permission was granted, we will proceed by first reading our original db
       * (which is stored inside the app's data directory as "SQlite/dbName.db")
       */
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + "SQLite/mediaCollection.db",
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        /** after reading the original db, we will create the backup file(of our name) on the disk on the path that was selected
         * by the user above in the permissions block.
         */
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "maven_backup.db",
          "application/octet-stream"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });

            showSuccessToast(
              "Exported !",
              "Your backup was exported successfully."
            );
          })
          .catch((e) =>
            showErrorToast(
              "Error !",
              "Something went wrong while exporting backup"
            )
          );
      } else {
        // cannot export db if we don't have the permissions to the file system path.
        showErrorToast(
          "Permissions required !",
          "Need storage permissions to export the backup."
        );
      }
    } else {
      // for case when platform is IOS, things are straight forward.
      await Sharing.shareAsync(
        FileSystem.documentDirectory + "SQLite/mediaCollection.db"
      );
      showSuccessToast("Exported !", "Your backup was exported successfully.");
    }
  };

  const importDb = async () => {
    setIsLoadingImportExport(true);

    try {
      /** a document picker will show the file path that this app was granted permissions of,
       * it is only from where we can choose the backup file and no where else*/
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      /** when we got something, we proceed by first checking if we have the original db file's path setup.
       * remember that when we exe the '.openDatabase(originalDatabase)', the database will be created under the app's documents directory, i.e. ${FileSystem.documentDirectory}/SQLite/${originalDatabase}.
       */
      if (result.type === "success") {
        if (
          !(
            await FileSystem.getInfoAsync(
              FileSystem.documentDirectory + "SQLite"
            )
          ).exists
        ) {
          // if we don't have the directory, make it
          await FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + "SQLite"
          );
        }

        /** now that the directory is setup for storing the db to app's data directory,
         * we will now read the picked backup file
         */
        const base64 = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // write the read file as original db to the app's data directory of /SQlite/mediaCollection.db
        await FileSystem.writeAsStringAsync(
          FileSystem.documentDirectory + "SQLite/mediaCollection.db",
          base64,
          { encoding: FileSystem.EncodingType.Base64 }
        );

        // close the old database connection
        await dbClose();
        // now on open, it will open the new database connection to newly imported db
        dbOpen();
        // just check the db id it actually has all the necessary initial tables.
        await initCollectionDB();
        showSuccessToast(
          "Imported !",
          "Your backup was imported successfully."
        );

        // force update the collection screens
        dispatch(forceUpdateDbCollectionModified());
      }
    } catch (err) {
      showErrorToast("Error !", "Something went wrong while importing backup");
    }
    setIsLoadingImportExport(false);
  };

  return { exportDb, importDb, isLoadingImportExport };
};

export default useDBimportExport;
