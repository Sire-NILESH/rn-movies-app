import React, { useState } from "react";
import { IGenreSortBy } from "../../../types/typings";
import Dropdown from "./Dropdown";

const sortBydropdownData: IGenreSortBy[] = [
  { key: "Default", value: undefined },
  { key: "Ratings desc", value: "vote_count.desc" },
  { key: "Ratings asc", value: "vote_count.asc" },
  { key: "Popularity desc", value: "popularity.desc" },
  { key: "Popularity asc", value: "popularity.asc" },
  { key: "Revenue desc", value: "revenue.desc" },
  { key: "Revenue asc", value: "revenue.asc" },
  { key: "Release desc", value: "primary_release_date.desc" },
  { key: "Release asc", value: "primary_release_date.asc" },
  { key: "Avg Ratings desc", value: "vote_average.desc" },
  { key: "Avg Ratings asc", value: "vote_average.asc" },
];

interface IProps {
  saveMode: "local";
  // saveMode: "local" | "applicationWide";
  localGenreSortBySetter?: (sortByFilter: IGenreSortBy) => void;
  bgColor?: string;
}

const GenresSortByDropDown: React.FC<IProps> = (props) => {
  const [localGenreSortBy, setLocalGenreSortBy] = useState<IGenreSortBy>({
    key: "Default",
    value: undefined,
  });

  const setLocalGenreSortByHandler = (sortByFilter: IGenreSortBy) => {
    setLocalGenreSortBy(sortByFilter);
    if (props.localGenreSortBySetter) {
      props.localGenreSortBySetter(sortByFilter);
    }
  };

  return (
    <Dropdown
      borderRadius="full"
      currentSelected={localGenreSortBy}
      listData={sortBydropdownData}
      setSelected={setLocalGenreSortByHandler}
      bgColor={props.bgColor && props.bgColor}
      dropdownWidth={160}
    />
  );
};

export default GenresSortByDropDown;
