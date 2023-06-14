import React, { useState, useLayoutEffect } from "react";
import { IStackScreenProps } from "../library/NavigatorScreenProps/StackScreenProps";
import TopTabsPersonMediasNavigator from "../navigators/TopTabs/TopTabsPersonMediasNavigator";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import PersonDetailModal from "../components/ui/PersonDetailModal";

const PersonMediasStackScreen: React.FunctionComponent<IStackScreenProps> = (
  props
) => {
  const { navigation, route } = props;

  // @ts-ignore
  const urlObjectReceived = route.params.urlObject as IUrlObject;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function toggleModalHandler() {
    setIsModalOpen((prev) => (prev === true ? false : true));
  }

  // Header settings
  useLayoutEffect(() => {
    navigation.setOptions({
      title: urlObjectReceived.name,

      headerRight: (props) => (
        <View className="flex-row items-center space-x-1 mr-2">
          {/* Person Detail Modal button */}
          <View className="overflow-hidden rounded-full ">
            <Pressable
              className="p-2 items-center justify-center"
              android_ripple={{ color: "#eee" }}
              onPress={toggleModalHandler}
            >
              <Ionicons name="person" size={18} color={Colors.gray[50]} />
            </Pressable>
          </View>
        </View>
      ),
    });
  }, []);

  return (
    <>
      <TopTabsPersonMediasNavigator urlObject={urlObjectReceived} />

      <PersonDetailModal
        isVisible={isModalOpen}
        toggleModalHandler={toggleModalHandler}
        personUrlObject={urlObjectReceived}
      />
    </>
  );
};

export default PersonMediasStackScreen;
