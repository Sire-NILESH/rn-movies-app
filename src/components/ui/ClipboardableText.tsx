import * as Clipboard from "expo-clipboard";
import React from "react";
import { Pressable, Text } from "react-native";
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
