import { TextInput, StyleSheet, TextInputProps } from "react-native";

type EntryInputProp = TextInputProps & {
  height?: number;
};

export function EntryInput({
  value,
  placeholder,
  multiline,
  numberOfLines,
  editable = true,
  height,
  onChangeText,
}: EntryInputProp) {
  return (
    <TextInput
      style={[
        styles.text,
        multiline && { height: height, textAlignVertical: "top" },
      ]}
      value={value}
      placeholder={placeholder}
      multiline={multiline}
      numberOfLines={numberOfLines || 7}
      editable={editable}
      onChangeText={onChangeText}
      className="bg-secondaryColor text-primary text-xl p-4 rounded-md  border-2 border-primary"
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "SourGummy-Regular",
  },
});
