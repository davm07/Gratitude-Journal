import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ComponentProps } from "react";

type IconProps = ComponentProps<typeof MaterialCommunityIcons>;

export const PenIcon = ({ name, ...props }: IconProps) => {
  return <MaterialCommunityIcons name={name} {...props} />;
};

export const NoteEditIcon = ({ name, ...props }: IconProps) => {
  return <MaterialCommunityIcons name={name} {...props} />;
};

export const DeleteIcon = ({ name, ...props }: IconProps) => {
  return <MaterialCommunityIcons name={name} {...props} />;
};

export const AddIcon = ({ name, ...props }: IconProps) => {
  return <MaterialCommunityIcons name={name} {...props} />;
};

export const HappyIcon = ({ name, ...props }: IconProps) => {
  return <MaterialCommunityIcons name={name} {...props} />;
};
