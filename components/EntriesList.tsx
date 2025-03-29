import { Screen } from "./Screen";
import { FlatList, View, Text } from "react-native";
import { EntryCard } from "./EntryCard";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { getEntries } from "@/lib/entries";
import { HappyIcon } from "./Icons";

export function EntriesList() {
  const db = useSQLiteContext();
  const entriesDb = drizzle(db);
  const [entries, setEntries] = useState<schema.Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getEntries(entriesDb);
        setEntries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEntries();
  }, [entries, entriesDb]);

  return (
    <Screen>
      <View>
        {entries.length === 0 ? (
          <View className="flex-col gap-2 p-4">
            <Text
              className="text-primary text-2xl"
              style={{ fontFamily: "SourGummy-Bold" }}
            >
              No entries found. What are you grateful for today?
            </Text>
            <HappyIcon name="emoticon-happy" size={56} color={"#583b2d"} />
          </View>
        ) : (
          <FlatList
            className="px-4 my-3"
            data={entries}
            keyExtractor={(entry) => entry.id.toString()}
            renderItem={({ item }) => <EntryCard entry={item} />}
          />
        )}
      </View>
    </Screen>
  );
}
