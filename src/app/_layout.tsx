import { useFonts, Birthstone_400Regular } from '@expo-google-fonts/birthstone';
import { Inter_300Light } from '@expo-google-fonts/inter'
import { Playfair_400Regular } from '@expo-google-fonts/playfair'
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { router } from 'expo-router';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { doc, getDoc } from 'firebase/firestore';

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

    async function handleRouting() {
      if (user === null) {
        router.replace("/(auth)/login");
      } 
      else {
       const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          if (docSnap.data().partnerId !== null) {
            router.replace("/(tabs)");
          }
          else {
            router.replace("/(pairing)/startPairing");
          }
        }
        
      }
    }

    if (!checkingAuth) {
      handleRouting();
    }
  }, [checkingAuth, user]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(pairing)" options={{ headerShown: false }} />
        <Stack.Screen name="read" options={{ headerShown: false }} />
      </Stack>
      {checkingAuth && (
        <View>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <StatusBar style='light' />
    </>
  );
}
