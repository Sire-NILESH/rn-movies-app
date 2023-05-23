import {
  IImageQuality,
  ImageItemTypes,
  TImgQualities,
  TImgQualityValues,
} from "../../types/typings";

export const allImgItemsType: ImageItemTypes[] = [
  "banner",
  "thumbnail",
  "companies",
  "watchProviders",
];

export const allImageItemsQualities: TImgQualities[] = [
  "Default",
  "Low",
  "Medium",
  "High",
  "Very high",
];

export const allImgItemsValues: TImgQualityValues[] = [
  "200",
  "300",
  "400",
  "500",
  "780",
];

type AllImgQualityConfig = {
  [key in ImageItemTypes]: IImageQuality[];
};

const imgQualities: AllImgQualityConfig = {
  banner: [
    { quality: "Very high", value: "780" },
    { quality: "High", value: "500" },
    { quality: "Medium", value: "400" },
    { quality: "Low", value: "300" },
  ],
  thumbnail: [
    { quality: "Very high", value: "500" },
    { quality: "High", value: "400" },
    { quality: "Medium", value: "300" },
    { quality: "Low", value: "200" },
  ],
  companies: [
    { quality: "Very high", value: "500" },
    { quality: "High", value: "400" },
    { quality: "Medium", value: "300" },
    { quality: "Low", value: "200" },
  ],
  watchProviders: [
    { quality: "Very high", value: "500" },
    { quality: "High", value: "400" },
    { quality: "Medium", value: "300" },
    { quality: "Low", value: "200" },
  ],
};

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
  return [defaultImgQualitiesconfig[imageType], ...imgQualities[imageType]];
};

// thumbnail : medium
// banner : high
// watch providers : low
// tv networks/producers : low
