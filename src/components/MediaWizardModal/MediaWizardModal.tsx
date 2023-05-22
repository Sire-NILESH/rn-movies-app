import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../../utils/Colors";
import { IUrlObject, MediaTypes } from "../../../types/typings";
import { moviePlaylist, tvPlaylist } from "../../config/genresWithRoutes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useDefaultLanguageHooks,
  useDefaultYearHooks,
} from "../../hooks/reduxHooks";
import FeaturedPlaylists from "./FeaturedPlaylists";
import MediaGenresSelect from "./MediaGenresSelect";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  mediaListType: MediaTypes;
  closeWithConfirm: (playlists: IUrlObject[]) => void;
}

type TViews = "featured_playlists" | "genres_playlist";

const MediaWizardModal: React.FC<IProps> = ({
  isVisible,
  onClose,
  mediaListType,
  closeWithConfirm,
}) => {
  const { defaultYear } = useDefaultYearHooks();
  const { defaultLanguage } = useDefaultLanguageHooks();
  const [selectedPlaylists, setSelectedPlaylists] = useState<IUrlObject[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(defaultYear.year);
  const [currentView, setCurrentView] = useState<TViews>("featured_playlists");
  const [currentLang, setCurrentLang] = useState<string>(
    defaultLanguage.iso_639_1
  );

  const setCurrentYearHandler = (year: number) => {
    setCurrentYear(year);
  };

  const setCurrentLangHandler = (language: string) => {
    setCurrentLang(language);
  };

  const setCurrentViewHandler = (view: TViews) => {
    setCurrentView(view);
  };

  const filters = {
    primary_release_year: String(currentYear),
    with_original_language: currentLang,
  };

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
    const selectedGenresNames: string[] = [];
    const selectedGenresList: string[] = [];

    selectedPlaylists.forEach((p) => {
      if (p.queryParams.with_genres) {
        selectedGenresList.push(p.queryParams.with_genres);
        selectedGenresNames.push(p.name);
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
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="absolute my-[25%] mx-[5%] h-[85%] w-[90%] bg-secondary rounded-xl pb-2 border-[1px] border-stone-900 [elevation:10]">
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
          {/* HEADER */}
          <View className="flex-row items-center space-x-2 mx-4 py-2">
            <View className="w-20 rounded-md overflow-hidden">
              <Pressable
                onPress={() => {
                  setCurrentViewHandler("featured_playlists");
                }}
                className="p-2"
                android_ripple={{ color: "#eee" }}
              >
                <View className="space-y-2 h-8">
                  <Text
                    className="mx-auto font-bold"
                    style={{
                      color:
                        currentView === "featured_playlists"
                          ? Colors.text_primary
                          : Colors.text_dark,
                    }}
                  >
                    Playlists
                  </Text>
                  {currentView === "featured_playlists" ? (
                    <View className="rounded-full bg-green-500 h-1 w-full" />
                  ) : null}
                </View>
              </Pressable>
            </View>
            <View className="w-20 rounded-md overflow-hidden">
              <Pressable
                onPress={() => {
                  setCurrentViewHandler("genres_playlist");
                }}
                className="p-2"
                android_ripple={{ color: "#eee" }}
              >
                <View className="space-y-2 h-8">
                  <Text
                    className="mx-auto font-bold"
                    style={{
                      color:
                        currentView === "genres_playlist"
                          ? Colors.text_primary
                          : Colors.text_dark,
                    }}
                  >
                    Genres
                  </Text>
                  {currentView === "genres_playlist" ? (
                    <View className="rounded-full bg-green-500 h-1 w-full" />
                  ) : null}
                </View>
              </Pressable>
            </View>
          </View>

          <ScrollView className="flex-1">
            {/* CUSTOM PLAYLIST */}
            {currentView === "featured_playlists" ? (
              <FeaturedPlaylists
                playlists={playlists[0]}
                onConfirmPlaylist={onConfirmPlaylist}
              />
            ) : null}

            {/* FILTER AND CUSTOM GENRES SELECTS*/}
            {currentView === "genres_playlist" ? (
              <MediaGenresSelect
                genrePlaylists={playlists[1]}
                selectedPlaylistHandlers={selectedPlaylistHandlers}
                setCurrentLangHandler={setCurrentLangHandler}
                setCurrentYearHandler={setCurrentYearHandler}
              />
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MediaWizardModal;
