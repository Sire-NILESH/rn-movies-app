import { View, Pressable } from "react-native";

interface IProps {
  method?: () => void;
  width?: number | string;
  height?: number | string;
  radius?: number;
  border?: number;
  color?: string;
  shadow?: boolean;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const CustomButton: React.FC<IProps> = (props) => {
  return (
    <View
      className="overflow-hidden border-gray-400 bg-purple-300"
      style={[
        props.border ? { borderWidth: props.border } : null,
        props.radius ? { borderRadius: props.radius } : null,
        props.color ? { backgroundColor: props.color } : null,
        props.shadow === true ? { elevation: 2 } : null,
      ]}
    >
      <Pressable
        onPress={props.method}
        className="w-40 h-20  items-center justify-center flex-row"
        android_ripple={{ color: "#eee" }}
        style={[
          props.width ? { width: props.width } : null,
          props.height ? { height: props.height } : null,
        ]}
      >
        {props.children}
      </Pressable>
    </View>
  );
};

export default CustomButton;
