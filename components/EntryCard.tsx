import { View, Text, StyleSheet, Pressable } from "react-native";
import { NoteEditIcon, DeleteIcon } from "./Icons";
import { Link } from "expo-router";

type Entry = {
  id: number;
  title: string;
  description: string;
  date: string;
};

export function EntryCard({ entry }: { entry: Entry }) {
  return (
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
          {entry.date}
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Link href={`/edit/${entry.id}`} asChild>
          <Pressable className="flex-col items-center">
            <NoteEditIcon
              name="note-edit-outline"
              size={32}
              color={"#583B2D"}
            />
            <Text className="text-primary" style={TextStyle.text}>
              Edit
            </Text>
          </Pressable>
        </Link>
        <Pressable className="flex-col items-center">
          <DeleteIcon name="delete-outline" size={32} color={"#583B2D"} />
          <Text style={TextStyle.text} className="text-primary">
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
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
