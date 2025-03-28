import { Screen } from "@/components/Screen";
import { useLocalSearchParams, Stack } from "expo-router";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { EntryInput } from "@/components/EntryInput";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { getEntry, updateEntry } from "@/lib/entries";
import { formatDate } from "@/lib/date";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { isInputEmpty } from "@/db/basicValidation";

export default function EditEntry() {
  const db = useSQLiteContext();
  const entriesDb = drizzle(db);
  const [entry, setEntry] = useState<schema.Entry>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { entryId } = useLocalSearchParams();
  const opacity = useSharedValue(1);

  const isSaveDisabled = !title.trim() && !description.trim();

  const handlePressIn = () => {
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    opacity.value = withTiming(1, { duration: 150 });
  };

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const data = await getEntry(entriesDb, Number(entryId));
        setEntry(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEntry();
  }, []);

  const editEntry = async () => {
    try {
      const updatedEntry = {
        id: entry?.id,
        title: isInputEmpty(title) ? "Entry without title" : title,
        description: isInputEmpty(description)
          ? "Entry without description"
          : description,
        date: new Date().toISOString(),
      };
      const { success } = await updateEntry(entriesDb, updatedEntry);
      if (success) {
        console.log("Entry updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTitle: `Edit: ${title}`,
          headerRight: () => <View />,
        }}
      />
      <View className="flex-col px-4 flex-1 gap-7 mt-6">
        <EntryInput
          value={title}
          placeholder="Entry Title"
          onChangeText={(newTitle) => setTitle(newTitle)}
        />
        <EntryInput
          value={description}
          placeholder="Entry Description"
          multiline={true}
          height={180}
          onChangeText={(newDescription) => setDescription(newDescription)}
        />
        <EntryInput
          value={formatDate(entry?.date ?? "")}
          placeholder="Entry Date"
          editable={false}
        />
        <Pressable
          onPress={() => {
            editEntry();
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isSaveDisabled}
        >
          <Animated.View
            style={{ opacity }}
            className={`p-4 rounded-2xl items-center
              ${isSaveDisabled ? "bg-tertiaryColor" : "bg-primary"}`}
          >
            <Text
              style={TextStyle.title}
              className="text-secondaryColor text-2xl"
            >
              Save
            </Text>
          </Animated.View>
        </Pressable>
      </View>
    </Screen>
  );
}

const TextStyle = StyleSheet.create({
  title: {
    fontFamily: "SourGummy-Medium",
  },
});
