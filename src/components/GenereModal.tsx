import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "./../utils/Colors";
import { MediaTypes } from "../typings";
import { movieGenres, tvGenres } from "../utils/helpers/helper";

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
        return [...prev];
      });
    } else setSelectedGenres((prev) => [...prev, genreId]);
  }

  function onConfirmHandler() {
    closeWithConfirm(selectedGenres);
  }

  function onConfirmCustomGenres(genreId: number) {
    closeWithConfirm([genreId]);
  }

  const mediaGenreList = mediaListType === "movie" ? movieGenres : tvGenres;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="absolute my-[20%] mx-[10%] h-[80%] w-[80%] bg-stone-800 rounded-xl pb-2  [elevation:10]">
        <View className="flex-row items-center justify-between h-[42] bg-black rounded-t-xl px-[20]">
          {/* Header Title */}
          <View>
            <Text className="text-gray-50 text-base">Choose Genres</Text>
          </View>
          {/* Header Buttons */}
          <View className="flex-row justify-between w-[20%]">
            <View className="rounded-full overflow-hidden">
              <Pressable
                disabled={selectedGenres.length > 0 ? false : true}
                onPress={onConfirmHandler}
                android_ripple={{ color: "#eee" }}
                // className="flex-1"
              >
                <MaterialIcons
                  name="done"
                  color={Colors.gray[100]}
                  size={18}
                  style={{ opacity: selectedGenres.length > 0 ? 1 : 0 }}
                />
              </Pressable>
            </View>

            <View className="rounded-full overflow-hidden">
              <Pressable
                onPress={onClose}
                // className="flex-1"
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
          {movieGenres ? (
            <ScrollView className="flex-1">
              {/* Custom/Unsupported Genres */}
              {mediaGenreList[0].map((mediaGenre, index) => (
                <Pressable
                  onPress={() => {
                    // Directly add single genre to the list of selections and confirm modal too
                    onConfirmCustomGenres(mediaGenre.id);
                  }}
                  android_ripple={{ color: "#eee" }}
                  key={mediaGenre.id}
                  className="flex-row px-4"
                  style={
                    index % 2 === 0
                      ? { backgroundColor: Colors.stone[800] }
                      : { backgroundColor: Colors.stone[900] }
                  }
                >
                  <Text className="px-2 py-2 text-left text-gray-300">
                    {mediaGenre.name}
                  </Text>
                </Pressable>
              ))}

              {/* Actual/Default_supported Genres */}
              <View className="flex-row items-center justify-between h-[42] bg-black px-[20]">
                {/* Header Title */}
                <View>
                  <Text className="text-gray-50 text-base">
                    {" "}
                    Choose multiple Genres
                  </Text>
                </View>
              </View>

              {mediaGenreList[1].map((mediaGenre, index) => (
                <View
                  key={mediaGenre.id}
                  className="flex-row px-4"
                  style={
                    index % 2 === 0
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
                        ? selectedGenresHandlers(mediaGenre.id)
                        : selectedGenresHandlers(mediaGenre.id, true);
                    }}
                  />
                  <Text className="px-2 py-2 text-left text-gray-300">
                    {mediaGenre.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default GenereModal;
