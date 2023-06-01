import { BaseToast, ErrorToast } from "react-native-toast-message";
import { Colors } from "../utils/Colors";

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.green[500],
        // borderLeftWidth: 0,
        backgroundColor: Colors.tertiary,
        height: 65,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        lineHeight: 20,
        color: Colors.text_primary,
        fontWeight: "600",
      }}
      text2Style={{
        fontSize: 12,
        lineHeight: 14,
        color: Colors.text_dark,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: Colors.red[500],
        backgroundColor: Colors.tertiary,
        height: 60,
        width: "80%",
      }}
      text1Style={{
        fontSize: 16,
        lineHeight: 20,
        color: Colors.text_primary,
        fontWeight: "600",
      }}
      text2Style={{
        fontSize: 12,
        lineHeight: 14,
        color: Colors.text_dark,
      }}
    />
  ),
};

export default toastConfig;
