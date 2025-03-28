import { View, Text } from "react-native";
import { AddIcon } from "./Icons";

export function AddEntry() {
  return (
    <View className="flex p-3 w-fit flex-row items-center gap-2 bg-primary rounded-2xl">
      <Text
        className="text-xl text-secondaryColor"
        style={{ fontFamily: "SourGummy-Medium" }}
      >
        Add Entry
      </Text>
      <AddIcon name="plus" size={20} color={"#FFF8E8"} />
    </View>
  );
}
