import { Stack } from "expo-router";
import { useFonts, Birthstone_400Regular } from '@expo-google-fonts/birthstone';
import { Inter_300Light } from '@expo-google-fonts/inter'
import { Playfair_400Regular } from '@expo-google-fonts/playfair'
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    Birthstone_400Regular,
    Playfair_400Regular,
    Inter_300Light,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null;
  }

  return <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    <Stack.Screen name="(auth)" options={{headerShown: false}} />
  </Stack>;
}
