import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { useFonts } from "expo-font";
import { MyLogo } from "@/components/MyLogo";
import { View, ActivityIndicator } from "react-native";
import {
  SourGummy_300Light,
  SourGummy_400Regular,
  SourGummy_500Medium,
  SourGummy_600SemiBold,
  SourGummy_900Black,
} from "expo-google-fonts-sour-gummy";
import { Suspense } from "react";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

export const DATABASE_NAME = "entries_table";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "SourGummy-Light": SourGummy_300Light,
    "SourGummy-Regular": SourGummy_400Regular,
    "SourGummy-Medium": SourGummy_500Medium,
    "SourGummy-SemiBold": SourGummy_600SemiBold,
    "SourGummy-Bold": SourGummy_900Black,
  });

  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Suspense fallback={<ActivityIndicator />}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          options={{ enableChangeListener: true }}
          useSuspense
        >
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
        </SQLiteProvider>
      </Suspense>
    </SafeAreaProvider>
  );
}
