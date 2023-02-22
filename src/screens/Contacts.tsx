import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useLogging } from "../hooks/useLogging";
import { IStackScreenProps } from "../library/StackScreenProps";

const ContactScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging("Contact Screen");
  const { navigation, route } = props;

  useEffect(() => {
    logging.info({ navigation, route });
  }, [logging]);

  return (
    <View style={styles.container}>
      <Text>Contact Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button title="About" onPress={() => navigation.navigate("About")} />
      <Button title="Pop to Top" onPress={() => navigation.popToTop()} />
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

export default ContactScreen;
