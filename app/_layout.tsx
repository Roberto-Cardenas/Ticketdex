import { Stack } from "expo-router";
import { setStatusBarStyle } from 'expo-status-bar';
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Database ORM imports
import { initDB } from "@/db/client";
import { initConfig } from "@/models/Config";
import { cleanupEvents } from "@/models/Event";


export default function RootLayout() {
  // Load fonts
  const [loaded, fontError] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  // Init db
  const { success, error } = initDB();
  
  // Set status bar mode
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle('light');
    }, 0);

    if (loaded || error) {
      SplashScreen.hideAsync();
    }

    if (!success) {
      return;
    }

    // Init config
    initConfig();
    cleanupEvents();
  }, [loaded, success, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen 
        name="show_event"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="edit_event"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="create_event"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
