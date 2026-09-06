import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import { router, useRouter, Link } from "expo-router";
import ToolbarButton from "@/components/ToolbarButton";

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [checkingAuth, setCheckingAuth] = useState(false);
    const [errorText, setErrorText] = useState("")

    const handelLogin = async () => {
        try {
            setCheckingAuth(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, passwordText);
            const user = userCredential.user;
        }
        catch (error) {
            console.log(error);
            setCheckingAuth(false);

            
            switch ((error as any).code  ) {
                case "auth/invalid-email":
                    setErrorText("Please check your email address");
                    break;
                
                case "auth/wrong-password":
                case "auth/user-not-found":
                case "auth/invalid-credential":
                    setErrorText("Invalid email and/or password");
                    break;
                
                case "auth/user-disabled":
                    setErrorText("This user has been disabled")
                
                case "auth/too-many-requests":
                    setErrorText("Too many login attempts. Please try again in a few minutes")
            }
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ width: "100%", flex: 1, alignItems: "center" }}
                behavior="padding"
            >
                <View style={{ flexGrow: 0.4 }} />
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
                <Text style={{
                    color: "red",
                    fontFamily: "Inter_300Light",
                    marginTop: 20,
                    textAlign: "center"
                }}>{errorText}</Text>
                <View style={{
                    marginTop: 20,
                    marginBottom: 30,
                }}>
                    {checkingAuth ? (<>
                        <ActivityIndicator size={30} />
                    <Text style={{
                    color: "white",
                    fontFamily: "Inter_300Light",
                    marginTop: 5,
                    textAlign: "center"
                }}>Logging in...</Text>
                </>) :
                     (
                     <ToolbarButton text="Log in" backgroundColor="#ce9ee8" onPress={handelLogin} />
                        )}
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

