import React, { memo } from "react";
import { Text, View, Button } from "react-native";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import CountriesDropdown from "../components/ui/CountriesDropdown";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import { useDefaultRegionHooks } from "../hooks/reduxHooks";
import { deleteCollection, getAllFromCollection } from "../database/database";
import { initDB } from "./../database/database";

const SettingsScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  const { navigation, route } = props;

  const { setDefaultRegionHandler, defaultRegion } = useDefaultRegionHooks();

  return (
    <View className="bg-secondary flex-1 items-center justify-start px-3 space-y-10">
      <View className="w-full mt-6">
        <View className="flex-row space-x-2 items-center mb-2">
          <Ionicons
            name="location-outline"
            color={Colors.text_dark}
            size={24}
          ></Ionicons>
          <View>
            <Text className="text-text_highLight font-semibold mb-1">
              Default region
            </Text>
            <Text className="text-text_dark text-sm">
              A default region for the watch providers.
            </Text>
          </View>
        </View>

        <View
          className="flex-row items-center justify-between px-2 mt-2 mx-2 bg-accent rounded-xl"
          style={{ backgroundColor: "rgb(4, 20, 10)" }}
        >
          <Text className="text-text_tertiary mx-4">Select a country </Text>

          <CountriesDropdown
            currentCountry={defaultRegion}
            setCountryHandler={setDefaultRegionHandler}
          />
        </View>
      </View>
      {/* <Text className="text-stone-700 font-bold text-3xl">Settings Screen</Text> */}
      <View className="mt-20 items-center justify-center flex-row">
        <Button
          title="All table Data"
          color={"black"}
          onPress={() => {
            try {
              getAllFromCollection().then((data) => {
                console.log(
                  "AAAAAAll data from DB, settings screen",
                  data["rows"]["_array"]
                );
              });
            } catch (err) {
              console.log(err);
            }
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
          title="Delete table"
          color={"black"}
          onPress={() => {
            try {
              async function deleteTable() {
                await deleteCollection();
              }
              deleteTable();
            } catch (err) {
              console.log(err);
            }
          }}
        />
      </View>
    </View>
  );
};

export default memo(SettingsScreen);
