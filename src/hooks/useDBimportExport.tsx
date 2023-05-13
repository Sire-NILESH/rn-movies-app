import { Platform } from "react-native";
import { useState } from "react";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { dbClose, dbOpen, initDB } from "../storage/database";

const useDBimportExport = () => {
  const [isLoadingImportExport, setIsLoadingImportExport] = useState(true);

  const exportDb = async () => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + "Maven/collection/mediaCollection.db",
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "mediaCollection.db",
          "application/octet-stream"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        console.log("Permission not granted");
      }
    } else {
      await Sharing.shareAsync(
        FileSystem.documentDirectory + "Maven/collection/mediaCollection.db"
      );
    }
  };

  const importDb = async () => {
    setIsLoadingImportExport(true);
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (result.type === "success") {
      if (
        !(
          await FileSystem.getInfoAsync(
            FileSystem.documentDirectory + "Maven/collection/"
          )
        ).exists
      ) {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "Maven/collection/"
        );
      }

      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "Maven/collection/mediaCollection.db",
        base64,
        { encoding: FileSystem.EncodingType.Base64 }
      );

      // close the old database connection
      await dbClose();
      // now on open, it will open the new database connection to newly imported db
      dbOpen();
      // just check the db id it actually has all the necessary initial tables.
      await initDB();

      setIsLoadingImportExport(false);
    }
  };

  return { exportDb, importDb, isLoadingImportExport };
};

export default useDBimportExport;
