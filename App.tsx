import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { persistor, store } from "./src/store/store";
import { Provider } from "react-redux";
// import * as SplashScreen from "expo-splash-screen";
import Loader from "./src/components/ui/Loader";
import NothingToShow from "./src/components/NothingToShow";
import useDBInitialize from "./src/hooks/useDBInitialize";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigator from "./src/navigators/RootNavigator";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

export default function App() {
  // DB setup hook
  const { dbInitialized, dbInitError, dbInitLoading } = useDBInitialize();
  const [queryCacheHyderated, setQueryCacheHyderated] = useState(false);

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 24,
        // cacheTime: 1000 * 60 * 60 * 24,
        refetchOnMount: false,
      },
    },
  });

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        {/* REDUX persistor */}
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {/* REACT TAN STACK QUERY persistor */}
            <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{ persister: asyncStoragePersister }}
              onSuccess={() => {
                setQueryCacheHyderated(true);
              }}
            >
              <SafeAreaView className="flex-1 bg-tertiary">
                <Loader loading={dbInitLoading} />

                {!dbInitLoading && dbInitError ? (
                  // when reached here, the db initialization hsa failed and the app is in unclean state, show nothing/error
                  <NothingToShow
                    title={"Something went wrong while loading content"}
                    problemType="error"
                  />
                ) : null}

                {dbInitialized && queryCacheHyderated ? (
                  // RootNavigation
                  <RootNavigator />
                ) : null}
              </SafeAreaView>
            </PersistQueryClientProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
