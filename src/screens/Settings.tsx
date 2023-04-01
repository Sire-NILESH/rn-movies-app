import React, { memo } from "react";
import { Text, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IDrawerScreenProps } from "../library/NavigatorScreenProps/DrawerScreenProps";
import CountriesDropdown from "../components/ui/CountriesDropdown";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import { useDefaultRegionHooks } from "../hooks/reduxHooks";
import {
  deleteAllTables,
  deleteCollection,
  getAllFromCollection,
  showAllTablesInDb,
} from "../database/database";
import { initDB } from "./../database/database";
import CustomButton from "./../components/ui/CustomButton";
import { TDbCollectionType } from "../typings";
import DeleteSettings from "../components/DeleteSettings";

const SettingsScreen: React.FunctionComponent<IDrawerScreenProps> = (props) => {
  const { navigation, route } = props;

  const { setDefaultRegionHandler, defaultRegion } = useDefaultRegionHooks();

  function RenderSettingCard(props: {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    children?: React.ReactNode;
    // children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  }) {
    return (
      <View className="w-full mt-6 bg-neutral-900 py-4 px-2 rounded-xl">
        <View className="flex-row space-x-2 items-center mb-2 mx-2">
          <Ionicons
            name={props.iconName}
            color={Colors.text_dark}
            size={24}
          ></Ionicons>
          <View>
            <Text className="text-text_highLight font-semibold mb-1">
              {props.title}
            </Text>
            <Text className="text-text_dark text-sm">{props.subtitle}</Text>
          </View>
        </View>

        {props.children}
      </View>
    );
  }

  return (
    <View className="bg-secondary flex-1">
      <ScrollView
        className="bg-secondary px-3 space-y-10"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/* DEFAULT REGION */}
        <RenderSettingCard
          iconName="location-outline"
          title="Default region"
          subtitle="A default region for the watch providers."
        >
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
        </RenderSettingCard>

        {/* IMPORT/EXPORT */}
        <RenderSettingCard
          iconName="document-outline"
          title="Import/Export"
          subtitle="Import/export your collections here."
        >
          <View
            className="flex-row items-center justify-between px-2 mt-2 mx-2 bg-accent rounded-xl"
            style={{ backgroundColor: "rgb(4, 20, 10)" }}
          >
            <View className="flex-row space-x-2 items-center mx-4">
              <MaterialCommunityIcons
                name="import"
                size={18}
                color={Colors.text_primary}
              />
              <Text className="text-text_tertiary mx-4">Import a file </Text>
            </View>

            <CountriesDropdown
              currentCountry={defaultRegion}
              setCountryHandler={setDefaultRegionHandler}
            />
          </View>
          <View
            className="flex-row items-center justify-between px-2 mt-2 mx-2 bg-accent rounded-xl"
            style={{ backgroundColor: "rgb(4, 20, 10)" }}
          >
            <View className="flex-row space-x-2 items-center mx-4">
              <MaterialCommunityIcons
                name="export"
                size={18}
                color={Colors.text_primary}
              />
              <Text className="text-text_tertiary mx-4">Export a file </Text>
            </View>

            <CountriesDropdown
              currentCountry={defaultRegion}
              setCountryHandler={setDefaultRegionHandler}
            />
          </View>
        </RenderSettingCard>

        {/* DELETE */}
        <RenderSettingCard
          iconName="trash-outline"
          title="Delete"
          subtitle="You can delete your collections here."
        >
          <DeleteSettings />
        </RenderSettingCard>

        {/* <Text className="text-stone-700 font-bold text-3xl">Settings Screen</Text> */}
        <View className="mt-20 items-center justify-center flex-row flex-wrap">
          <Button
            title="All table Data"
            color={"black"}
            onPress={() => {
              getAllFromCollection()
                .then((data) => {
                  console.log(
                    "AAAAAAll data from DB, settings screen",
                    data["rows"]["_array"]
                  );
                })
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
            title="Show tables"
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
      </ScrollView>
    </View>
  );
};

export default memo(SettingsScreen);
