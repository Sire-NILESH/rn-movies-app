import React, { useState } from "react";
import {
  IGenreSortBy,
  IQueryParams,
  IUrlObject,
  MediaTypes,
  TReleaseYearConstraint,
} from "../../types/typings";
import { useDefaultLanguageHooks, useDefaultYearHooks } from "./reduxHooks";
import { addReleaseAndAirDateFilters } from "../utils/helpers/helper";

interface IProps {
  mediaListType: MediaTypes;
}

const useFilterSectionHooks = (props: IProps) => {
  const { defaultYear } = useDefaultYearHooks();
  const { defaultLanguage } = useDefaultLanguageHooks();
  const [currentYear, setCurrentYear] = useState<number>(defaultYear.year);
  const [releaseYearConstraint, setReleaseYearConstraint] =
    useState<TReleaseYearConstraint>();
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

  const filters: IQueryParams = {
    with_original_language: currentLang,
  };

  addReleaseAndAirDateFilters(
    filters,
    props.mediaListType,
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

  return {
    setCurrentLangHandler,
    setCurrentYearHandler,
    setCurrentGenreSortByHandler,
    setReleaseYearConstraintHandler,
    currentYear,
    //  currentLang,
    //  releaseYearConstraint,
    //  currentGenreSortBy,
    filters,
  };
};

export default useFilterSectionHooks;
