import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { useFonts } from "expo-font";
import { MyLogo } from "@/components/MyLogo";
import { View } from "react-native";
import {
  SourGummy_300Light,
  SourGummy_400Regular,
  SourGummy_500Medium,
  SourGummy_600SemiBold,
  SourGummy_900Black,
} from "expo-google-fonts-sour-gummy";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "SourGummy-Light": SourGummy_300Light,
    "SourGummy-Regular": SourGummy_400Regular,
    "SourGummy-Medium": SourGummy_500Medium,
    "SourGummy-SemiBold": SourGummy_600SemiBold,
    "SourGummy-Bold": SourGummy_900Black,
  });

  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F7EED3",
          },
          headerShadowVisible: false,
          headerTintColor: "#583B2D",
          headerTitle: "Gratitude Journal",
          headerTitleStyle: {
            fontFamily: "SourGummy-Bold",
            fontSize: 32,
          },
          headerRight: () => (
            <View>
              <MyLogo width={30} height={30} />
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
