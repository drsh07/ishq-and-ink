import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, FlatList } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import Header from '@/components/header';
import LetterCard from "@/components/LetterCard";
import { useEffect, useState } from 'react';
import { doc, getDocs, collection, query, where, orderBy, onSnapshot, DocumentData } from "firebase/firestore";

export default function Index() {

  const [letters, setLetters] = useState<DocumentData[]>([]);

  useEffect(() => {

    if (!auth.currentUser) return;

    const letterQuery = query(collection(db, "letters"), orderBy("timestamp", "desc"), where("to", "==", auth.currentUser!.uid));
    const unsubsribe = onSnapshot(letterQuery, (lettersSnapshot) => {
      const newLetters = lettersSnapshot.docs.map((letter) => ({ id: letter.id, ...letter.data() }));
      setLetters(newLetters);
      
      const unreadCount = letters.filter((letter) => letter.read === false).length

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
      <Header />
      <Text style={{ fontFamily: "Playfair_400Regular", color: "white", fontSize: 30 }}>Read</Text>
      <Text style={styles.rules}>Read your partner's letters</Text>
      {letters.length === 0 ? (
        <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
          <Text style={{fontFamily: "Inter_300Light", color: "#919191"}}>No letters unfortunately :( </Text>
        </View>
      ) : (
        <FlatList
          data={letters}
          keyExtractor={(letter) => letter.id}
          renderItem={({ item }) => <LetterCard
            text={item.timestamp ? item.timestamp.toDate().toDateString() + " at " + item.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : "Receiving..."}
            read={item.read}
            id={item.id}
          />}
        />
      )}
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
    color: "white",
    marginBottom: 20,
  },
})
