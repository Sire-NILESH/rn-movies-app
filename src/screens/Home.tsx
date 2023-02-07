import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useLogging } from "../hooks/useLogging";
import { IStackScreenProps } from "../library/StackScreenProps";

const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging("Home Screen");
  const { navigation, route } = props;

  useEffect(() => {
    logging.info({ navigation, route });
  }, [logging]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="About" onPress={() => navigation.navigate("About")} />
      <Button title="Contact" onPress={() => navigation.navigate("Contact")} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
