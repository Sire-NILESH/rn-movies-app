import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { useDefaultLanguageHooks } from "../../hooks/reduxHooks";
import { ISupportedLang } from "../../../types/typings";
import { supportedLangs } from "../../utils/helpers/langs";

interface IProps {
  saveMode: "local" | "applicationWide";
  localLangSetter?: (language: string) => void;
  bgColor?: string;
}

/**
 * A React component that displays a dropdown for selecting Languages with search.
 * @param saveMode - Can be `applicationWide`(A default setter for application wide) or `local`(a local state)
 * @returns A Dropdown instance for selecting Languages
 */
const LanguageDropdown: React.FC<IProps> = (props) => {
  const { setDefaultLanguageHandler, defaultLanguage } =
    useDefaultLanguageHooks();
  const [localLanguage, setLocalLanguage] =
    useState<ISupportedLang>(defaultLanguage);

  const setLocalLanguageHandler = (language: ISupportedLang) => {
    setLocalLanguage(language);
    if (props.localLangSetter) {
      props.localLangSetter(language.iso_639_1);
    }
  };

  return (
    <Dropdown
      borderRadius="full"
      currentSelected={
        props.saveMode === "applicationWide" ? defaultLanguage : localLanguage
      }
      listData={[
        {
          name: "All Languages",
          english_name: "All Languages",
          iso_639_1: "",
        },
        ...supportedLangs,
      ]}
      setSelected={
        props.saveMode === "applicationWide"
          ? setDefaultLanguageHandler
          : setLocalLanguageHandler
      }
      bgColor={props.bgColor && props.bgColor}
    />
  );
};

export default LanguageDropdown;
