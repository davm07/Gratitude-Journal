import { EntryInput } from "@/components/EntryInput";
import { Screen } from "@/components/Screen";
import { useState } from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { formatDate } from "@/lib/date";
import { addEntry } from "@/lib/entries";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { isInputEmpty } from "@/db/basicValidation";

export default function AddEntry() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const plainDate = new Date().toISOString();
  const date = formatDate(plainDate);
  const db = useSQLiteContext();
  const entriesDb = drizzle(db);
  const opacity = useSharedValue(1);

  const isSaveDisabled = !title.trim() && !description.trim();

  const handlePressIn = () => {
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    opacity.value = withTiming(1, { duration: 150 });
  };

  const saveEntry = async () => {
    try {
      const newEntry = {
        title: isInputEmpty(title) ? "Entry without title" : title,
        description: isInputEmpty(description)
          ? "Entry without description"
          : description,
        date: plainDate,
      };
      const result = await addEntry(entriesDb, newEntry);
      if (result.success) {
        console.log("Entry added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTitle: `Entry: ${title}`,
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
          onChangeText={(newDescription) => setDescription(newDescription)}
          placeholder="Entry Description"
          multiline={true}
          height={180}
        />
        <EntryInput value={date} placeholder="Entry Date" editable={false} />
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => saveEntry()}
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
