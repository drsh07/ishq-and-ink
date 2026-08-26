import { View, Text, Pressable, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

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
    <View>
      <Pressable onPress={handleSignOut}>
        <Text style={styles.button}>Log out</Text>
      </Pressable>
    </View>
  )

};

const styles = StyleSheet.create({
  button: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        backgroundColor: "#ce9ee8",
        marginTop: 50,
        marginBottom: 10,
    }
})
