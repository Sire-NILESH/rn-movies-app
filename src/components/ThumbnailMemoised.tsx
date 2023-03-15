import React, { memo } from "react";
import Thumbnail, { IThumbnailProps } from "./Thumbnail";

const ThumbnailMemoised: React.FC<IThumbnailProps> = (props) => {
  return <Thumbnail {...props} />;
};

// Custom memoise check fucntion that only checks the id of MovieMedia | TvMedia and not the object.
function mediaPropsAreEqual(
  prevMedia: Readonly<IThumbnailProps>,
  nextMedia: Readonly<IThumbnailProps>
) {
  return prevMedia.media.id === nextMedia.media.id;
}
export default memo(ThumbnailMemoised, mediaPropsAreEqual);
