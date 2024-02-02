import { useState, useEffect, useCallback } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { initCollectionDB, initSettingsDB } from "../storage/database";
import useFontSettings from "./useFontSettings";

/**
 * A custom hook to initialize the database for the application and set other init settings like app nav theme to dark and font scaling settings.
 *
 * @returns `databaseSetupStatus` an object that has the following properties:
 *
 * `dbInitialized` - a boolean state that shows if the database is initialized,
 *`dbInitError` - a boolean state that shows if an error occured while setting-up/initialising the database,
 *  `dbInitLoading` - a boolean state that shows if the database initialization is in progress.
 */
const useDBInitialize = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [dbInitError, setDbInitError] = useState(false);
  const [dbInitLoading, setDbInitLoading] = useState(false);

  // Currently, it sets the 'allowFontScaling' property for Text globally according to the current font scaling settings
  const loadGlobalFontSettings = useFontSettings();

  const setup = useCallback(() => {
    loadGlobalFontSettings();

    // first force a dark color for the system navigation buttons
    NavigationBar.setBackgroundColorAsync("rgb(0, 0, 0)")
      .then(() => {
        return initSettingsDB();
      })
      .then(() => {
        return initCollectionDB();
      })
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        // console.log(err);
        setDbInitError(true);
      });
  }, []);

  // run db init on first app.tsx mount
  useEffect(() => {
    setDbInitLoading(true);
    setDbInitError(false);
    setup();
    setDbInitLoading(false);
  }, []);

  return { dbInitialized, dbInitError, dbInitLoading };
};

export default useDBInitialize;
