import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../../utils/Colors";
import { IUrlObject, MediaTypes } from "../../../types/typings";
import {
  moviePlaylist,
  tvPlaylist,
} from "../../config/customPlaylistsAndGenresList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeaturedPlaylists from "./FeaturedPlaylists";
import MediaGenresSelect from "./MediaGenresSelect";
import useFilterSectionHooks from "../../hooks/useFilterSectionHooks";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  mediaListType: MediaTypes;
  closeWithConfirm: (playlists: IUrlObject[]) => void;
}

const TopTabs = createMaterialTopTabNavigator();

const TAB_WIDTH = 80;

const MediaWizardModal: React.FC<IProps> = ({
  isVisible,
  onClose,
  mediaListType,
  closeWithConfirm,
}) => {
  const {
    setCurrentLangHandler,
    setCurrentYearHandler,
    setCurrentGenreSortByHandler,
    setReleaseYearConstraintHandler,
    currentYear,
    filters,
  } = useFilterSectionHooks({ mediaListType });

  const [selectedPlaylists, setSelectedPlaylists] = useState<IUrlObject[]>([]);

  function selectedPlaylistHandlers(
    playlist: IUrlObject,
    remove?: boolean
  ): void {
    if (remove !== undefined && remove === true) {
      setSelectedPlaylists((prev) => {
        const i = prev.findIndex(
          (playlistCurrent) => playlistCurrent.name === playlist.name
        );
        prev.splice(i, 1);
        return [...prev];
      });
    } else setSelectedPlaylists((prev) => [...prev, playlist]);
  }

  function onConfirmHandler() {
    // const selectedGenresNames: string[] = [];
    const selectedGenresList: string[] = [];

    selectedPlaylists.forEach((p) => {
      if (p.queryParams.with_genres) {
        selectedGenresList.push(p.queryParams.with_genres);
        // selectedGenresNames.push(p.name);
      }
    });

    // if we have a case of multiple selections of genres, we make a single new  IUrlObject playlist and have all the genres as one single comma separated list and filters.
    if (selectedGenresList.length > 1) {
      const commaSeperatedGenresList: string = selectedGenresList.join(",");

      const playlist: IUrlObject = {
        name: "Custom Genres",
        url: `/discover/${mediaListType}`,
        queryParams: {
          with_genres: commaSeperatedGenresList,
          ...filters,
        },
        additionalFiltersUnsupported: true,
      };

      closeWithConfirm([playlist]);
    }
    // else we can simply just add filters and pass the selected playlists
    else {
      const selectedPlaylistsWithFilters = selectedPlaylists.map((p) => {
        const temp = p;
        temp.queryParams = { ...p.queryParams, ...filters };
        return temp;
      });
      closeWithConfirm(selectedPlaylistsWithFilters);
    }
  }

  function onConfirmPlaylist(playlist: IUrlObject) {
    closeWithConfirm([playlist]);
  }

  // playlists to show in the modal
  const playlists = mediaListType === "movie" ? moviePlaylist : tvPlaylist;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="absolute my-[18%] mx-[5%] h-[85%] w-[90%] bg-neutral-800 rounded-xl pb-2 border border-neutral-700/60 [elevation:10]">
        {/* HEADER */}
        <View className="flex-row items-center justify-between h-[42] bg-tertiary rounded-t-xl px-[20]">
          {/* Header Title */}
          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons
              name="drama-masks"
              size={24}
              color={Colors.green[100]}
            />
            <Text className="text-text_highLight text-sm">{`${
              mediaListType === "movie" ? "Movie" : "TV Shows"
            } wizard`}</Text>
          </View>
          {/* Header Buttons */}
          <View className="flex-row justify-between w-[20%]">
            <View className="rounded-full overflow-hidden">
              <Pressable
                disabled={selectedPlaylists.length > 0 ? false : true}
                className="p-2"
                onPress={onConfirmHandler}
                android_ripple={{ color: "#eee" }}
              >
                <MaterialIcons
                  name="done"
                  color={Colors.gray[100]}
                  size={18}
                  style={{ opacity: selectedPlaylists.length > 0 ? 1 : 0 }}
                />
              </Pressable>
            </View>

            <View className="rounded-full overflow-hidden">
              <Pressable
                onPress={onClose}
                className="p-2"
                android_ripple={{ color: "#eee" }}
              >
                <MaterialIcons
                  name="close"
                  color={Colors.gray[100]}
                  size={18}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View className="flex-1">
          {/* TABS */}
          <View className="flex-1 pt-2 py-1">
            <TopTabs.Navigator
              screenOptions={{
                tabBarLabelStyle: {
                  fontSize: 15,
                  fontWeight: "600",
                  letterSpacing: 0.8,
                  textTransform: "none",
                },
                tabBarScrollEnabled: true,
                tabBarStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  marginLeft: 20,
                  backgroundColor: Colors.neutral[800],
                },
                tabBarActiveTintColor: Colors.green[50],
                tabBarInactiveTintColor: Colors.text_dark,
                tabBarAndroidRipple: { borderless: false },
                tabBarGap: 10,
                tabBarPressColor: "#e9e9e9",
                tabBarItemStyle: {
                  width: TAB_WIDTH,
                  paddingHorizontal: 2,
                },
                tabBarIndicatorStyle: {
                  width: TAB_WIDTH,
                  height: 3,
                  borderRadius: 999,
                  backgroundColor: Colors.green[500],
                },
                // lazy: true,
              }}
            >
              {/* Laying out all the TopTabs components for tabs */}
              <TopTabs.Screen
                name={"featured_playlists"}
                options={{
                  title: "Playlists",
                }}
              >
                {(props) => {
                  return (
                    <View className="flex-1 pt-2 bg-neutral-800">
                      <ScrollView className="flex-1">
                        <FeaturedPlaylists
                          playlists={playlists[0]}
                          onConfirmPlaylist={onConfirmPlaylist}
                          {...props}
                        />
                      </ScrollView>
                    </View>
                  );
                }}
              </TopTabs.Screen>

              <TopTabs.Screen
                name={"genres_playlist"}
                options={{
                  title: "Genres",
                }}
              >
                {(props) => {
                  return (
                    <View className="flex-1 pt-3 bg-neutral-800">
                      <ScrollView className="flex-1">
                        <MediaGenresSelect
                          mediaListType={mediaListType}
                          genrePlaylists={playlists[1]}
                          selectedPlaylistHandlers={selectedPlaylistHandlers}
                          setCurrentLangHandler={setCurrentLangHandler}
                          setCurrentYearHandler={setCurrentYearHandler}
                          setCurrentGenreSortByHandler={
                            setCurrentGenreSortByHandler
                          }
                          setReleaseYearConstraintHandler={
                            setReleaseYearConstraintHandler
                          }
                          currentYear={currentYear}
                          {...props}
                        />
                      </ScrollView>
                    </View>
                  );
                }}
              </TopTabs.Screen>
            </TopTabs.Navigator>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MediaWizardModal;
