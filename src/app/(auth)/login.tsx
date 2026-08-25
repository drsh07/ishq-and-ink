import { View, StyleSheet, Text, TextInput } from "react-native";
import { useState } from "react";

export default function LoginScreen() {

    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.appHeader}>Ishq & Ink</Text>
            <TextInput 
            value={emailText}
            placeholder="Email"
            onChangeText={setEmailText}
            />
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

})

