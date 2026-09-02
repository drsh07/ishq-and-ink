import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Alert, Keyboard } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import  Header  from '@/components/header';
import Toolbar from "@/components/toolbar";
import { useEffect, useState } from 'react';
import { addDoc, collection, getDoc, doc, serverTimestamp } from "firebase/firestore";

export default function Index() {

  const [text, setText] = useState("");
  const wordCount = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
  const [keyboardShown, setKeyboardShown] = useState(false);

  const deleteText = () => {
    Alert.alert('Clear letter', 'Are you sure you want to delete your whole letter?', [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {setText("")},
      }
    ])
  }

  const confirmSend = () => {
    Alert.alert('Send letter', 'Are you sure you want to send your letter? You CANNOT read, edit, or delete it once sent.', [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Send",
        style: "default",
        onPress: () => {sendLetter()},
      }
    ])
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    }
    catch (error) {
      console.log(error);
    }
  }

  const sendLetter = async () => {
    const ownDocSnap = await getDoc(doc(db, "users", auth.currentUser!.uid));
    await addDoc(collection(db, "letters"), {
      content: text,
      from: auth.currentUser?.uid,
      to: ownDocSnap.data()?.partnerId,
      timestamp: serverTimestamp(),
      read: false
    });
    setText("");
     Alert.alert('Success', 'Your letter has successfully been sent!', [
      {
        text: "OK",
        style: "default"
      }
    ])
  }

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShown(true);
    });
     const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShown(false);
    });
    return () => {
      show.remove();
      hide.remove();
    }
  }, [])

  return (
    <View style={styles.container}>
      {!keyboardShown && (
        <>
       <Header profilePress={handleSignOut} />
     <Text style={{fontFamily: "Playfair_400Regular", color: "white", fontSize: 30}}>Write</Text>
     <Text style={styles.rules}>Minimum 200 words</Text>
     <Text style={styles.rules}>Once you send, you cannot view, edit, or delete your letter.</Text>
      </>)}
     <KeyboardAvoidingView
      behavior="padding"
      style={{flex: 1}}
      keyboardVerticalOffset={15}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
     <TextInput
      style={styles.letterField}
      multiline={true}
      submitBehavior="newline"
      placeholder="Start typing here..."
      value={text}
      onChangeText={setText}
      />
      </ScrollView>
      <Toolbar count={wordCount} deleteFunc={deleteText} insertTabFunc={() => setText(text + "    ")} sendFunc={confirmSend} />
      </KeyboardAvoidingView>
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
      borderRadius: 20,
      flex: 1,
      padding: 20,
      textAlignVertical: "top",
      color: "white",

    }
})
