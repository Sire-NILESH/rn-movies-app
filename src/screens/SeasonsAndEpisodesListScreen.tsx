import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { IStackScreenProps } from "../library/StackScreenProps";
import { useLogging } from "../hooks/useLogging";

const SeasonsAndEpisodesListScreen: React.FunctionComponent<
  IStackScreenProps
> = (props) => {
  const [logging] = useLogging("Contact Screen");
  const { navigation, route } = props;

  useEffect(() => {
    logging.info({ navigation, route });
  }, [logging]);

  return (
    <View>
      <Text>SeasonsAndEpisodesListScreen</Text>
    </View>
  );
};

export default SeasonsAndEpisodesListScreen;
