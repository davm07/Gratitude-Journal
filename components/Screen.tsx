import { View } from "react-native";

export function Screen({ children }: { children: React.ReactNode }) {
  return <View className="flex-1 bg-cyan-200/70">{children}</View>;
}
