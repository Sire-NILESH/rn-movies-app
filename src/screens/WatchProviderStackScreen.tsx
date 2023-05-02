import React, { useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import TopTabsWatchProvidersNavigator from "../navigators/TopTabs/TopTabsWatchProvidersNavigator";

const WatchProviderStackScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;

  // @ts-ignore
  const urlObjectReceived = route.params.urlObject;

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      title: urlObjectReceived.name,
    });
  }, []);

  return <TopTabsWatchProvidersNavigator urlObject={urlObjectReceived} />;
};

export default WatchProviderStackScreen;
