import { View, Text, Modal, Pressable, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect, useLayoutEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "./../utils/Colors";
import { fetchGenres, movieGenres, tvGenres } from "./../utils/requests";
import { MediaTypes } from "../typings";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  mediaListType: MediaTypes;
  closeWithConfirm: (genresIdList: number[]) => void;
}

const GenereModal: React.FC<IProps> = ({
  isVisible,
  onClose,
  mediaListType,
  closeWithConfirm,
}) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  function selectedGenresHandlers(genreId: number, remove?: boolean): void {
    if (remove !== undefined && remove === true) {
      setSelectedGenres((prev) => {
        const i = prev.findIndex((genre) => genre === genreId);
        prev.splice(i, 1);
        // console.log(prev.filter((genre) => genre !== genreId));
        return [...prev];
      });
    } else setSelectedGenres((prev) => [...prev, genreId]);
  }

  function onConfirmHandler() {
    // Lift the Genre state up
    // if (selectedGenres.length > 0) setUserSelectedGenresHandler(selectedGenres);
    // onClose();

    closeWithConfirm(selectedGenres);
  }

  //   const [movieGenres, setMovieGenres] = useState<IGenre[] | null>(null);

  //   useEffect(() => {
  //     async function fetchMovieGenres() {
  //       try {
  //         const data = await fetchGenres("tv");
  //         if (data?.props) setMovieGenres(data.props);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     fetchMovieGenres();
  //   }, []);

  const mediaGenreList = mediaListType === "movie" ? movieGenres : tvGenres;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      // style={{ flex: , backgroundColor: Colors.gray[400] }}
    >
      <View className="absolute my-[20%] mx-[10%] h-[80%] w-[80%] bg-stone-800 rounded-xl pb-2  [elevation:10]">
        <View className="flex-row items-center justify-between h-[42] bg-stone-900 rounded-t-xl px-[20]">
          {/* Header Title */}
          <Text className="text-gray-50 text-base">Choose Genres</Text>
          {/* Header Buttons */}
          <View className="flex-row w-[20%] justify-between">
            <Pressable
              disabled={selectedGenres.length > 0 ? false : true}
              onPress={onConfirmHandler}
            >
              <MaterialIcons
                name="done"
                color={Colors.gray[100]}
                size={18}
                style={{ opacity: selectedGenres.length > 0 ? 1 : 0 }}
              />
            </Pressable>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color={Colors.gray[100]} size={18} />
            </Pressable>
          </View>
        </View>
        <View className="flex-1">
          {movieGenres ? (
            <View className="flex-1">
              <FlatList
                data={mediaGenreList}
                keyExtractor={(item) => String(item.id)}
                renderItem={(itemObj) => (
                  <View
                    className="flex-row px-4"
                    style={
                      itemObj.index % 2 === 0
                        ? { backgroundColor: Colors.stone[800] }
                        : { backgroundColor: Colors.stone[900] }
                    }
                  >
                    <BouncyCheckbox
                      size={20}
                      fillColor={Colors.stone[500]}
                      unfillColor={Colors.stone[800]}
                      innerIconStyle={{ borderWidth: 1 }}
                      onPress={(isChecked: boolean) => {
                        isChecked === true
                          ? selectedGenresHandlers(itemObj.item.id)
                          : selectedGenresHandlers(itemObj.item.id, true);
                      }}
                    />
                    <Text className="px-2 py-2 text-left text-gray-300">
                      {itemObj.item.name}
                    </Text>
                  </View>
                )}
              />
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default GenereModal;
