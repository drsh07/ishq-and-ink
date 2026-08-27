import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Playfair_400Regular } from '@expo-google-fonts/playfair';
import { auth } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';
import {  }

export default function StartPairingScreen() {

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
            <Text style={styles.mainText}>You aren't linked to your partner yet</Text>
            <Text style={styles.subText}>Let's get you together</Text>
            <View style={{flexDirection: 'row'}}>
            <Pressable onPress={handleSignOut}>
                <Text style={styles.button}>Log out</Text>
            </Pressable>
            <Pressable onPress={handleSignOut}>
                <Text style={styles.button}>Continue</Text>
            </Pressable>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 25,
    },

    mainText: {
        fontSize: 40,
        fontFamily: "Playfair_400Regular",
        textAlign: "center",
    },

    subText: {
        fontSize: 20,
        fontFamily: "Playfair_400Regular",
        textAlign: "center",
        marginTop: 20,
    },

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