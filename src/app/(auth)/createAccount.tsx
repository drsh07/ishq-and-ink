import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../firebaseConfig"
import { router, useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import ToolbarButton from "@/components/ToolbarButton";

export default function CreateAccountScreen() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [confirmPasswordText, setConfirmPasswordText] = useState("");


    const handelAccountCreation = async () => {
        try {

            if (passwordText !== confirmPasswordText) {
                alert("Passwords do not match!");
                throw ("Passwords do not match");
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, passwordText);
            const dataRef = doc(db, "users", userCredential.user.uid)
            await setDoc(dataRef, { partnerId: null, name: name });
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ width: "100%", flex: 1 }}
                behavior="height"
                keyboardVerticalOffset={100}
            >
                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ paddingTop: 50, flexGrow: 1 }}>
                    <View style={{ alignItems: "center", width: "100%" }}>
                        <Text style={styles.appHeader}>Ishq & Ink</Text>
                        <Text style={{ fontFamily: "Playfair_400Regular", color: "white", fontSize: 25, marginBottom: 40 }}>Love, Forever Inked</Text>
                    </View>
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
                    <View style={{
                        marginTop: 50,
                        marginBottom: 50,
                    }}>
                        <ToolbarButton text="Create Account" backgroundColor="#ce9ee8" onPress={handelAccountCreation} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        padding: 25,
        backgroundColor: "#281b33"
    },

    appHeader: {
        fontSize: 80,
        fontFamily: "Birthstone_400Regular",
        color: "white"
    },

    textField: {
        marginTop: 7,
        backgroundColor: "#443450",
        borderRadius: 40,
        padding: 20,
        color: "white",
        width: '100%'
    },

})

