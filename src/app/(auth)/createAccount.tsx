import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../firebaseConfig"
import { router, useRouter} from "expo-router";
import { doc, setDoc } from "firebase/firestore";

export default function CreateAccountScreen() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [confirmPasswordText, setConfirmPasswordText] = useState("");


    const handelAccountCreation = async () => {
        try {

            if (passwordText !== confirmPasswordText) {
                alert("Passwords do not match!");
                throw("Passwords do not match");
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, passwordText);
            const dataRef = doc(db, "users", userCredential.user.uid)
            await setDoc(dataRef, {partnerId: null, name: name});
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.appHeader}>Ishq & Ink</Text>
            <TextInput 
            value={name}
            placeholder="Full name"
            onChangeText={setName}
            placeholderTextColor={"#797575"}
            style={styles.textField}
            /><TextInput 
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
            <TextInput 
            value={confirmPasswordText}
            placeholder="Confirm password"
            onChangeText={setConfirmPasswordText}
            placeholderTextColor={"#797575"}
            style={styles.textField}
            secureTextEntry={true}
            />
            <Pressable onPress={handelAccountCreation}>
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

