import { testEntries } from "@/assets/testEntries";
import { Screen } from "@/components/Screen";
import { useLocalSearchParams, Stack } from "expo-router";
import { TextInput, View, StyleSheet, Pressable, Text } from "react-native";

export default function EditEntry() {
  const { entryId } = useLocalSearchParams();
  const entry = testEntries.find((entry) => entry.id === Number(entryId));

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTitle: `Edit ${entry?.title}`,
          headerRight: () => <View />,
        }}
      />
      <View className="flex-col px-4 flex-1 gap-7 mt-6">
        <TextInput
          style={TextStyle.title}
          value={entry?.title}
          placeholder="Title"
          className="bg-secondaryColor text-primary text-xl p-4 rounded-md  border-2 border-primary"
        />
        <TextInput
          style={[TextStyle.text, { height: 180 }]}
          multiline={true}
          numberOfLines={7}
          value={entry?.description}
          placeholder="Description"
          className="bg-secondaryColor text-primary text-xl p-4 rounded-md  border-2 border-primary"
        />
        <TextInput
          style={TextStyle.text}
          value={entry?.date}
          placeholder="Date"
          editable={false}
          className="bg-secondaryColor text-primary text-xl p-4 rounded-md  border-2 border-primary"
        />
        <Pressable className="bg-primary p-4 rounded-2xl items-center">
          <Text
            style={TextStyle.title}
            className="text-secondaryColor text-2xl"
          >
            Save
          </Text>
        </Pressable>
      </View>
    </Screen>
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
