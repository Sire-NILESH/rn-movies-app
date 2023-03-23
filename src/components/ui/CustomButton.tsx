import { View, Pressable } from "react-native";
//ctrl + alt + d
interface IProps {
  /**
   * Method to be executed on press of the button.
   */
  method?: (param: any) => void;
  /**
   *
   *
   * @type {(number | string)}
   * @memberof IProps
   */
  width?: number | string;
  height?: number | string;
  radius?: number;
  border?: number;
  /**
   * Background color for the button.
   * The default color is purple.
   */
  color?: string;
  shadow?: boolean;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  styledClassName?: string;
}

const CustomButton: React.FC<IProps> = (props) => {
  return (
    <View
      className={`overflow-hidden border-gray-400 bg-purple-300 ${props.styledClassName}`}
      style={[
        props.border ? { borderWidth: props.border } : null,
        props.radius ? { borderRadius: props.radius } : null,
        props.color ? { backgroundColor: props.color } : null,
        props.shadow === true ? { elevation: 2 } : null,
      ]}
    >
      <Pressable
        onPress={props.method}
        className="w-40 h-20 flex-row items-center justify-center"
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
