import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig.js"

export default function Index() {

  const [text, setText] = useState("");
  const [fetchedText, setFetchedText] = useState("");

  const handleFetch = async () => {

    const docSnap = await getDoc(doc(db, "test", "test1"));

    if (docSnap.exists()) {
      setFetchedText(docSnap.data().content)
    }
    else {
      setFetchedText("WARNING: Data not found")
    }

  }

  return (
    <View style={styles.container}>
      <Text style={{width: "100%"}}>Enter text here:</Text>
      <TextInput 
        value={text}
        placeholder="Type here brooo"
        onChangeText={setText}
        style={{width: "100%"}}
      />
      <Button title="Submit" onPress={() => {setDoc(doc(db, "test", "test1"), {content: text}); setText("");}} />
        <View style={{width: "100%"}}>
      <Button title="Press here to see the text" onPress={() => {handleFetch()}} />
        </View>
        <Text>{fetchedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
