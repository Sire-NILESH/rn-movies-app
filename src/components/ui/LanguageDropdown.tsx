import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { by639_1 } from "iso-language-codes";
import { useDefaultLanguageHooks } from "../../hooks/reduxHooks";
import { ISOLang } from "../../../types/typings";

interface IProps {
  saveMode: "local" | "applicationWide";
}

/**
 * A React component that displays a dropdown for selecting Languages with search.
 * @param saveMode - Can be `applicationWide`(A default setter for application wide) or `local`(a local state)
 * @returns A Dropdown instance for selecting Languages
 */
const LanguageDropdown: React.FC<IProps> = (props) => {
  const { setDefaultLanguageHandler, defaultLanguage } =
    useDefaultLanguageHooks();
  const [localLanguage, setLocalLanguage] = useState<ISOLang>(defaultLanguage);

  const setLocalLanguageHandler = (language: ISOLang) => {
    setLocalLanguage(language);
  };

  return (
    <Dropdown
      borderRadius="full"
      currentSelected={
        props.saveMode === "applicationWide" ? defaultLanguage : localLanguage
      }
      // currentSelected={{
      //   name: "English",
      //   nativeName: "English",
      //   iso639_1: "en",
      //   iso639_2T: "eng",
      //   iso639_2B: "eng",
      // }}
      listData={Object.values(by639_1)}
      setSelected={
        props.saveMode === "applicationWide"
          ? setDefaultLanguageHandler
          : setLocalLanguageHandler
      }
    />
  );
};

export default LanguageDropdown;
