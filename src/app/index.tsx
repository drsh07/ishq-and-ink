import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig.js"

export default function Index() {

  const [text, setText] = useState("")

  return (
    <View style={styles.container}>
      <Text style={{width: "100%"}}>Enter text here:</Text>
      <TextInput 
        value={text}
        placeholder="Type here brooo"
        onChangeText={setText}
        style={{width: "100%"}}
      />
      <Button title="Submit" onPress={() => {setDoc(doc(db, "test", "test1"), {content: text});}} />

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
