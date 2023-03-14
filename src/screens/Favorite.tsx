import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { IDrawerScreenProps } from "../library/DrawerScreenProps";

const FavoritesScreen: React.FC<IDrawerScreenProps> = (props) => {
  const { navigation, route } = props;

  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
      <Button title="Home" onPress={(e) => navigation.navigate("Home")} />
      <Button title="TV" onPress={(e) => navigation.navigate("TV Shows")} />
      <Button title="Movie" onPress={(e) => navigation.navigate("Movies")} />
      <StatusBar style="auto" />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "center",
  },
});
