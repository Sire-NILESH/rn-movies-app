import { Text, Pressable } from "react-native";
import React from "react";
import * as Clipboard from "expo-clipboard";
import { showSuccessToast } from "../../utils/helpers/helper";

interface IProps {
  content: string;
  clipboardText?: string;
  styleClassName?: string;
  numberOfLines?: number;
}

const ClipboardableText = ({
  styleClassName,
  content,
  clipboardText,
  numberOfLines,
}: IProps) => {
  const copyToClipboard = async (content: string) => {
    await Clipboard.setStringAsync(clipboardText ? clipboardText : content);
    showSuccessToast("Copied !", "Title was copied to clipboard");
  };

  return (
    <Pressable
      onLongPress={() => {
        console.log(content);
        copyToClipboard(content);
      }}
    >
      <Text className={styleClassName} numberOfLines={numberOfLines}>
        {content}
      </Text>
    </Pressable>
  );
};

export default ClipboardableText;
