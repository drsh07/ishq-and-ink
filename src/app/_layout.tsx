import { useFonts, Birthstone_400Regular } from '@expo-google-fonts/birthstone';
import { Inter_300Light } from '@expo-google-fonts/inter'
import { Playfair_400Regular } from '@expo-google-fonts/playfair'
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { View, ActivityIndicator, Text } from "react-native";
import { router } from 'expo-router';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  console.log("RootLayout rendering")

  const [loaded, error] = useFonts({
    Birthstone_400Regular,
    Playfair_400Regular,
    Inter_300Light,
  })

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
  if (!checkingAuth) {
    if (user === null) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)");
    }
  }
}, [checkingAuth, user]);

  if (!loaded && !error) {
    return null;
  }

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "blue" }}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
  </Stack>
);
}
