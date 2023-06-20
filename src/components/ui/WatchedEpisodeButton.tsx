import { Text } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { Colors } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Episode } from "../../../types/typings";
import {
  showErrorToast,
  showSuccessToast,
  watchedEpisodeObjBuilder,
} from "../../utils/helpers/helper";
import { insertEpisode, removeEpisode } from "../../storage/database";

interface IProps {
  episode: Episode;
  seasonId: number;
  isWatched: boolean;
  // isWatched: (episodeId: number) => boolean;
}

const WatchedEpisodeButton: React.FC<IProps> = ({
  episode,
  seasonId,
  isWatched,
}) => {
  const [isWatchedLocal, setIsWatchedLocal] = useState<Boolean>(
    // isWatched(episode.id)
    isWatched
  );

  const setIsWatchedLocalHandler = () => {
    setIsWatchedLocal((prev) => !prev);
  };

  const addToDBHandler = async () => {
    try {
      await insertEpisode(watchedEpisodeObjBuilder(episode, seasonId));

      showSuccessToast(
        "Added !",
        `${
          episode.season_number === 0
            ? "Extras"
            : "Season " + episode.season_number
        } Episode ${episode.episode_number} was added to Watched`
      );
    } catch (err) {
      showErrorToast();
    }
  };

  const removeFromDBHandler = async () => {
    try {
      await removeEpisode(episode.id);

      showSuccessToast(
        "Removed !",
        `${
          episode.season_number === 0
            ? "Extras"
            : "Season" + episode.season_number
        } Episode ${episode.episode_number} was removed from Watched`
      );
    } catch (err) {
      showErrorToast();
    }
  };

  return (
    <CustomButton
      color={isWatchedLocal ? Colors.stone[50] : Colors.stone[900]}
      height={32}
      width={"100%"}
      radius={8}
      styledClassName="border border-stone-800/90"
      method={() => {
        if (isWatchedLocal) {
          setIsWatchedLocalHandler();
          removeFromDBHandler();
        } else {
          addToDBHandler();
          setIsWatchedLocalHandler();
        }
      }}
    >
      <Ionicons size={18} name={"eye"} color={Colors.stone[500]}></Ionicons>
      <Text
        className="ml-1"
        style={{
          color: isWatchedLocal ? Colors.stone[800] : Colors.text_primary,
        }}
      >
        {" "}
        Watched
      </Text>
    </CustomButton>
  );
};

export default WatchedEpisodeButton;
