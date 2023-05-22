import { IImageQuality, ImageItemTypes } from "../../types/typings";

const imgQualities: IImageQuality[] = [
  { quality: "Very high", value: "500" },
  { quality: "High", value: "400" },
  { quality: "Medium", value: "300" },
  { quality: "Low", value: "200" },
];

type DefaultImgQualityConfig = {
  [key in ImageItemTypes]: IImageQuality;
};

export const defaultImgQualitiesconfig: DefaultImgQualityConfig = {
  thumbnail: { quality: "Default", value: "300" },
  banner: { quality: "Default", value: "500" },
  watchProviders: { quality: "Default", value: "200" },
  companies: { quality: "Default", value: "200" },
};

export const getAllImageConfigForImageType = (imageType: ImageItemTypes) => {
  return [defaultImgQualitiesconfig[imageType], ...imgQualities];
};

// thumbnail : medium
// banner : very high
// watch providers : low
// tv networks/producers : low
