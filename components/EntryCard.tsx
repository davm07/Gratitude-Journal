import { View, Text, StyleSheet, Pressable } from "react-native";
import { NoteEditIcon, DeleteIcon } from "./Icons";
import { Link } from "expo-router";
import { Entry } from "@/db/schema";
import { formatDate } from "@/lib/date";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { deleteEntry } from "@/lib/entries";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

export function EntryCard({ entry }: { entry: Entry }) {
  const db = useSQLiteContext();
  const entriesDb = drizzle(db);

  const editOpacity: SharedValue<number> = useSharedValue(1);
  const deleteOpacity: SharedValue<number> = useSharedValue(1);

  const handlePressIn = (shareValue: SharedValue<number>) => {
    shareValue.value = withTiming(0.6, { duration: 150 });
  };

  const handlePressOut = (shareValue: SharedValue<number>) => {
    shareValue.value = withTiming(1, { duration: 150 });
  };

  const editStyle = useAnimatedStyle(() => {
    return { opacity: editOpacity.value };
  });
  const deleteStyle = useAnimatedStyle(() => {
    return { opacity: deleteOpacity.value };
  });

  const handleDeleteEntry = async () => {
    try {
      const { success } = await deleteEntry(entriesDb, entry.id);
      if (success) {
        console.log("Entry deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        key={entry.id}
        className="flex-row items-center justify-between bg-secondaryColor py-2 px-3 rounded-md gap-4 my-2"
      >
        <View className="flex-col flex-1 gap-2">
          <Text
            className="text-xl text-primary"
            style={TextStyle.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {entry.title}
          </Text>
          <Text
            style={TextStyle.text}
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-primary text-base flex-1"
          >
            {entry.description}
          </Text>
          <Text style={TextStyle.text} className="text-primary text-base">
            {formatDate(entry?.date ?? "")}
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Link href={`/edit/${entry.id}`} asChild>
            <Pressable
              onPressIn={() => handlePressIn(editOpacity)}
              onPressOut={() => handlePressOut(editOpacity)}
            >
              <Animated.View
                style={[editStyle]}
                className="flex-col items-center"
              >
                <NoteEditIcon
                  name="note-edit-outline"
                  size={32}
                  color={"#583B2D"}
                />
                <Text className="text-primary" style={TextStyle.text}>
                  Edit
                </Text>
              </Animated.View>
            </Pressable>
          </Link>
          <Pressable
            onPressIn={() => handlePressIn(deleteOpacity)}
            onPressOut={() => handlePressOut(deleteOpacity)}
            onPress={() => handleDeleteEntry()}
          >
            <Animated.View
              style={[deleteStyle]}
              className="flex-col items-center"
            >
              <DeleteIcon name="delete-outline" size={32} color={"#583B2D"} />
              <Text style={TextStyle.text} className="text-primary">
                Delete
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const TextStyle = StyleSheet.create({
  text: {
    fontFamily: "SourGummy-Regular",
  },
  title: {
    fontFamily: "SourGummy-Medium",
  },
});
