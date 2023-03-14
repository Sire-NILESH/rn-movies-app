import { View, Text } from "react-native";
import React, { memo } from "react";
import Thumbnail, { IThumbnailProps } from "./Thumbnail";

const ThumbnailMemoised: React.FC<IThumbnailProps> = (props) => {
  return <Thumbnail {...props} />;
};

export default memo(ThumbnailMemoised);
