import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useLogging } from "../hooks/useLogging";
import { IStackScreenProps } from "../library/StackScreenProps";

const AboutScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging("About Screen");
  const { navigation, route } = props;

  useEffect(() => {
    logging.info({ navigation, route });
  }, [logging]);

  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
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

export default AboutScreen;
