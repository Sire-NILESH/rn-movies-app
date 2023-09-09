import {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const useFlashlistScroll = () => {
  const listRef = useAnimatedRef();

  const scrollY = useSharedValue(0);
  const scrollDirection = useSharedValue<number>(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    scrollDirection.value = event.velocity === undefined ? 0 : event.velocity.y;
  });

  return { listRef, scrollY, scrollDirection, scrollHandler };
};

export default useFlashlistScroll;
