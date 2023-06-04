import { useNavigation } from "@react-navigation/native";

const useNavigateTo = () => {
  const navigation = useNavigation();

  // So every one of them wont have to calculate them separately.
  const navigateTo = (screen: string, paramOption: Object) => {
    // @ts-ignore
    navigation.push(screen, paramOption);
  };

  return { navigateTo };
};

export default useNavigateTo;
