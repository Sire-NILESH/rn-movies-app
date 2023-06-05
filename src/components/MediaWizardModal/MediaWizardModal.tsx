import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../../utils/Colors";
import {
  IGenreSortBy,
  IQueryParams,
  IUrlObject,
  MediaTypes,
  TReleaseYearConstraint,
} from "../../../types/typings";
import {
  moviePlaylist,
  tvPlaylist,
} from "../../config/customPlaylistsAndGenresList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useDefaultLanguageHooks,
  useDefaultYearHooks,
} from "../../hooks/reduxHooks";
import FeaturedPlaylists from "./FeaturedPlaylists";
import MediaGenresSelect from "./MediaGenresSelect";
import { addReleaseAndAirDateFilters } from "../../utils/helpers/helper";

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
  const [releaseYearConstraint, setReleaseYearConstraint] =
    useState<TReleaseYearConstraint>();
  const [currentView, setCurrentView] = useState<TViews>("featured_playlists");
  const [currentLang, setCurrentLang] = useState<string>(
    defaultLanguage.iso_639_1
  );
  const [currentGenreSortBy, setCurrentGenreSortBy] = useState<IGenreSortBy>();

  const setCurrentYearHandler = (year: number) => {
    setCurrentYear(year);
  };

  const setReleaseYearConstraintHandler = (
    constraint: TReleaseYearConstraint
  ) => {
    setReleaseYearConstraint(constraint);
  };

  const setCurrentLangHandler = (language: string) => {
    setCurrentLang(language);
  };

  const setCurrentGenreSortByHandler = (sortByFilter: IGenreSortBy) => {
    setCurrentGenreSortBy(sortByFilter);
  };

  const setCurrentViewHandler = (view: TViews) => {
    setCurrentView(view);
  };

  const resetHandler = () => {
    setReleaseYearConstraint(undefined);
  };

  const filters: IQueryParams = {
    with_original_language: currentLang,
  };

  addReleaseAndAirDateFilters(
    filters,
    mediaListType,
    currentYear,
    releaseYearConstraint
  );

  if (currentGenreSortBy !== undefined) {
    if (currentGenreSortBy.value === undefined) {
      delete filters.sort_by;
    } else {
      filters.sort_by = currentGenreSortBy.value;
    }
  } else if (currentGenreSortBy === undefined) {
    delete filters.sort_by;
  }

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
      <View className="absolute my-[25%] mx-[5%] h-[85%] w-[90%] bg-neutral-800 rounded-xl pb-2 border border-neutral-700/60 [elevation:10]">
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
          {/* HEADER TABS */}
          <View className="flex-row items-center space-x-2 mx-4 py-2">
            <ViewTab
              title="Playlists"
              currentView={currentView}
              tabView="featured_playlists"
              setCurrentViewHandler={setCurrentViewHandler}
            />

            <ViewTab
              title="Genres"
              currentView={currentView}
              tabView="genres_playlist"
              setCurrentViewHandler={setCurrentViewHandler}
            />
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
                mediaListType={mediaListType}
                genrePlaylists={playlists[1]}
                selectedPlaylistHandlers={selectedPlaylistHandlers}
                setCurrentLangHandler={setCurrentLangHandler}
                setCurrentYearHandler={setCurrentYearHandler}
                setCurrentGenreSortByHandler={setCurrentGenreSortByHandler}
                setReleaseYearConstraintHandler={
                  setReleaseYearConstraintHandler
                }
                currentYear={currentYear}
              />
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MediaWizardModal;

interface ITab {
  currentView: TViews;
  tabView: TViews;
  title: "Playlists" | "Genres";
  setCurrentViewHandler: (view: TViews) => void;
}

function ViewTab({ title, currentView, tabView, setCurrentViewHandler }: ITab) {
  return (
    <View className="w-20 rounded-md overflow-hidden">
      <Pressable
        onPress={() => {
          setCurrentViewHandler(tabView);
        }}
        className="p-2"
        android_ripple={{ color: "#eee" }}
      >
        <View className="space-y-2 h-8">
          <Text
            className="mx-auto font-bold"
            style={{
              color:
                currentView === tabView
                  ? Colors.text_primary
                  : Colors.text_dark,
            }}
          >
            {title}
          </Text>
          {currentView === tabView ? (
            <View className="rounded-full bg-green-500 h-1 w-full" />
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}
