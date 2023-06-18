import { View, Button } from "react-native";
import React from "react";
import {
  deleteAllTables,
  getAllFromCollection,
  getdataFromACollection,
  initDB,
  showAllTablesInDb,
} from "../../storage/database";

const DevOnlySettings = () => {
  return (
    <View className="mt-20 items-center justify-center flex-row flex-wrap">
      <Button
        title="All table Data"
        color={"black"}
        onPress={() => {
          getAllFromCollection()
            .then((_data) => {})
            .catch((err) => {
              console.log(err);
            });
        }}
      />
      <Button
        title="Create table"
        color={"black"}
        onPress={() => {
          try {
            async function createDB() {
              await initDB();
            }
            createDB();
          } catch (err) {
            console.log(err);
          }
        }}
      />
      <Button
        title="Show table"
        color={"black"}
        onPress={() => {
          try {
            async function showTablesDB() {
              await showAllTablesInDb();
            }
            showTablesDB();
          } catch (err) {
            console.log(err);
          }
        }}
      />
      <Button
        title="Show Lang table"
        color={"black"}
        onPress={() => {
          try {
            async function showTablesDB() {
              const data = await getdataFromACollection("image_qualities");
              console.log(data.rows._array);
            }
            showTablesDB();
          } catch (err) {
            console.log(err);
          }
        }}
      />
      <Button
        title="Delete tables"
        color={"black"}
        onPress={() => {
          try {
            async function deleteTable() {
              await deleteAllTables();
            }
            deleteTable();
          } catch (err) {
            console.log(err);
          }
        }}
      />
    </View>
  );
};

export default DevOnlySettings;
