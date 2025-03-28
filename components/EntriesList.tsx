import { Screen } from "./Screen";
import { FlatList, View } from "react-native";
import { EntryCard } from "./EntryCard";
import { testEntries } from "@/assets/testEntries";

export function EntriesList() {
  const entries = testEntries;
  return (
    <Screen>
      <View className="my-1">
        <FlatList
          className="px-4 mb-3"
          data={entries}
          keyExtractor={(entry) => entry.id.toString()}
          renderItem={({ item }) => <EntryCard entry={item} />}
        />
      </View>
    </Screen>
  );
}
