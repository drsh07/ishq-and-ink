import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import { router, useRouter, Link } from "expo-router";
import ToolbarButton from "@/components/ToolbarButton";

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
        <KeyboardAvoidingView
        style={{width: "100%", flex: 1, alignItems: "center"}}
        behavior="padding"
         >
            <View style={{flexGrow: 0.4}} />
            <Text style={styles.appHeader}>Ishq & Ink</Text>
            <TextInput
                value={email}
                placeholder="Email"
                onChangeText={setEmail}
                placeholderTextColor={"#797575"}
                style={styles.textField}
                autoCapitalize="none"
            />
            <TextInput
                value={passwordText}
                placeholder="Password"
                onChangeText={setPasswordText}
                placeholderTextColor={"#797575"}
                style={styles.textField}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <View style={{
                marginTop: 50,
                marginBottom: 10,
            }}>
                <ToolbarButton text="Log in" backgroundColor="#ce9ee8" onPress={handelLogin} />
            </View>
            <Link href={"/(auth)/createAccount"} style={{ color: "white" }}>Create Account</Link>
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

