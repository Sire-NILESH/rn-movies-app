import { View, Text } from "react-native";
import React from "react";
import ButtonGroup from "./ButtonGroup";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";

interface IProps {
  listRef: React.MutableRefObject<any>;
}

const FlashlistSCrollButtonGrp: React.FC<IProps> = ({ listRef }) => {
  function scrollToTop() {
    // @ts-ignore
    listRef.current?.scrollToOffset({ offset: 0 });
  }

  // function scrollToBottom() {
  //   // @ts-ignore
  //   listRef.current?.scrollToEnd();
  // }

  return (
    <ButtonGroup
      buttonsArray={[
        {
          iconChild: (
            <Ionicons name="arrow-up" size={20} color={Colors.green[100]} />
          ),
          onPressHandler: scrollToTop,
        },
        // {
        //   iconChild: (
        //     <Ionicons name="arrow-down" size={20} color={Colors.green[100]} />
        //   ),
        //   onPressHandler: scrollToBottom,
        // },
      ]}
    />
  );
};

export default FlashlistSCrollButtonGrp;
