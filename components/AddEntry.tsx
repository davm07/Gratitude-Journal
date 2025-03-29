import { Text, Pressable } from "react-native";
import { AddIcon } from "./Icons";
import { Link } from "expo-router";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

export function AddEntry() {
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    opacity.value = withTiming(1, { duration: 150 });
  };

  return (
    <Link href="/add-entry" asChild>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={{ opacity }}
          className="flex p-3 w-fit flex-row items-center gap-2 bg-primary rounded-2xl "
        >
          <Text
            className="text-xl text-secondaryColor"
            style={{ fontFamily: "SourGummy-Medium" }}
          >
            Add Entry
          </Text>
          <AddIcon name="plus" size={20} color={"#FFF8E8"} />
        </Animated.View>
      </Pressable>
    </Link>
  );
}
