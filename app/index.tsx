import { Screen } from "@/components/Screen";
import { EntriesList } from "@/components/EntriesList";
import { AddEntry } from "@/components/AddEntry";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <Screen>
      <View className="flex-row items-center justify-between px-4">
        <Text
          className=" text-primary text-2xl"
          style={{ fontFamily: "SourGummy-SemiBold" }}
        >
          Your entries:
        </Text>
        <AddEntry />
      </View>
      <EntriesList />
    </Screen>
  );
}
