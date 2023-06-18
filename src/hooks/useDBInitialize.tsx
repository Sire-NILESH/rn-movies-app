import { useState, useEffect, useCallback } from "react";
import { initCollectionDB, initSettingsDB } from "../storage/database";

/**
 * A custom hook to initialize the database for the application
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
    initSettingsDB()
      .then(() => {
        return initCollectionDB();
      })
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
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
