import { View } from "react-native";

export function Screen({ children }: { children: React.ReactNode }) {
  return <View className="flex-1 bg-background px-0">{children}</View>;
}
