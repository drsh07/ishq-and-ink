import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import { router, useRouter } from "expo-router";

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const handelLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, passwordText);
            const user = userCredential.user;
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.appHeader}>Ishq & Ink</Text>
            <TextInput 
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            placeholderTextColor={"#797575"}
            style={styles.textField}
            />
            <TextInput 
            value={passwordText}
            placeholder="Password"
            onChangeText={setPasswordText}
            placeholderTextColor={"#797575"}
            style={styles.textField}
            secureTextEntry={true}
            />
            <Pressable onPress={handelLogin}>
                <Text style={styles.button}>Log in</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/createAccount')}>
                <Text style={styles.button}>Create Account</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        padding: 25,
    },

    appHeader: {
        fontSize: 80,
        fontFamily: "Birthstone_400Regular",
        marginTop: 125,
    },

    textField: {
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        borderRadius: 15,
        padding: 10,
        marginTop: 7,
        color: "black",
    },

    button: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        backgroundColor: "#ce9ee8",
        marginTop: 50
    }

})

