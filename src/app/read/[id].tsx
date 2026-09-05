import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Alert, Keyboard } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import Header from '@/components/header';
import Toolbar from "@/components/toolbar";
import { useEffect, useState } from 'react';
import { addDoc, collection, getDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import ToolbarButton from "@/components/ToolbarButton";

export default function Index() {

  const { id } = useLocalSearchParams<{ id: string }>();

  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchLetterContent = async () => {

      const docSnap = await getDoc(doc(db, "letters", id));

      if (docSnap.exists()) {
        setContent(docSnap.data().content);
        setReadLetter();
      }
    }
    fetchLetterContent();
  }, [])

  const setReadLetter = async () => {
    const docSnap = doc(db, "letters", id);

    await updateDoc(docSnap, {
      read: true
    });
  }


  return (

    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.content}>
          {content}
        </Text>
        <View style={{ justifyContent: "center", width: 75 }}>
          <View style={{ gap: 50 }} />
          <ToolbarButton text='Back' backgroundColor="#ce9ee8" onPress={() => router.back()} icon='arrow-left' iconLeft={true} />
        </View>
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

  content: {
    fontFamily: "Inter_300Light",
    fontSize: 20,
    color: "white"
  },

  letterField: {
    marginTop: 20,
    backgroundColor: "#443450",
    borderRadius: 20,
    flex: 1,
    padding: 20,
    textAlignVertical: "top",
    color: "white",

  }
})
