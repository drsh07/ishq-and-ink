import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import  Header  from '@/components/header';
import Toolbar from "@/components/toolbar";

export default function Index() {

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
     <Text style={{fontFamily: "Playfair_400Regular", color: "white", fontSize: 30}}>Write</Text>
     <Text style={styles.rules}>Minimum 200 words</Text>
     <Text style={styles.rules}>Once you send, you cannot view, edit, or delete your letter.</Text>
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
      />
      </ScrollView>
      <Toolbar />
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

  button: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        backgroundColor: "#ce9ee8",
        marginTop: 50,
        marginBottom: 10,
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
      textAlignVertical: "top"

    }
})
