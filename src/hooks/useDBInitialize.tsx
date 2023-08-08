import { useState, useEffect, useCallback } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { initCollectionDB, initSettingsDB } from "../storage/database";
import { Colors } from "./../utils/Colors";

/**
 * A custom hook to initialize the database for the application and set the system navigation buttons color to dark color.
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

  const setupDB = useCallback(() => {
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
    setupDB();
    setDbInitLoading(false);
  }, []);

  return { dbInitialized, dbInitError, dbInitLoading };
};

export default useDBInitialize;
