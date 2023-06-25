import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { persistor, store } from "./src/store/store";
import { Provider } from "react-redux";
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
import { Toast } from "react-native-toast-message/lib/src/Toast";
import toastConfig from "./src/config/toastMessageConfig";
import { Colors } from "./src/utils/Colors";
// import useLoadMyFonts from "./src/hooks/useLoadMyFonts";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24 * 7, //1 week
      refetchOnMount: false,
    },
  },
});

export default function App() {
  // load my custom fonts
  // useLoadMyFonts();

  // DB setup hook
  const { dbInitialized, dbInitError, dbInitLoading } = useDBInitialize();
  const [queryCacheHyderated, setQueryCacheHyderated] = useState(false);

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
    // if there are multiple updates within a 4000-millisecond interval, they will be batched together and written to AsyncStorage only once
    throttleTime: 4000, // Set the throttleTime to 4000 milliseconds
  });

  function enterApp() {
    if (dbInitLoading) {
      return <Loader loading={dbInitLoading} />;
    } else if (!dbInitLoading && dbInitError) {
      return (
        // when reached here, the db initialization hsa failed and the app is in unclean state, show nothing/error
        <NothingToShow
          title={"Something went wrong while loading content"}
          problemType="error"
        />
      );
    } else if (dbInitialized && queryCacheHyderated) {
      return (
        <>
          {/* RootNavigation */}
          <RootNavigator />
          {/* toast messages */}
          <Toast
            config={toastConfig}
            autoHide={true}
            position={"bottom"}
            bottomOffset={50}
            keyboardOffset={20}
          />
        </>
      );
    } else return null;
  }

  return (
    <>
      <StatusBar
        style="light"
        animated={true}
        backgroundColor={Colors.tertiary}
      />
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
              <SafeAreaView className="flex-1 bg-secondary">
                {enterApp()}
              </SafeAreaView>
            </PersistQueryClientProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
