import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Alert, Keyboard } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import Header from '@/components/header';
import Toolbar from "@/components/toolbar";
import { useEffect, useState } from 'react';
import { doc, getDocs, collection, query, where, orderBy, onSnapshot, DocumentData } from "firebase/firestore";


export default function Index() {

  const [letters, setLetters] = useState<DocumentData[]>([]);

  useEffect(() => {

    const letterQuery = query(collection(db, "letters"), orderBy("timestamp", "desc"), where("from", "==", auth.currentUser!.uid));
    const unsubsribe = onSnapshot(letterQuery, (lettersSnapshot) => {
      const newLetters = lettersSnapshot.docs.map((letter) => ({id: letter.id, ...letter.data()}));
      setLetters(newLetters);
    })
    return unsubsribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{}}>
        <Header profilePress={handleSignOut} />
        <Text style={{ fontFamily: "Playfair_400Regular", color: "white", fontSize: 30 }}>Read</Text>
        <Text style={styles.rules}>Read your partner's letters</Text>
      </ScrollView>
    </View>
  )

};

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#281b33",
    flex: 1,
    padding: 25,
  },

  rules: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    color: "white"
  },

  letterField: {
    marginTop: 20,
    backgroundColor: "#443450",
    borderRadius: 10,
    flex: 1,
    padding: 20,
    textAlignVertical: "top",
    color: "white",

  }
})
