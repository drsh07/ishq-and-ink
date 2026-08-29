import { signOut } from 'firebase/auth';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../../firebaseConfig';
import { router } from 'expo-router';

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
        <>
            <Pressable onPress={handleSignOut} style={{ position: 'absolute', top: 700, left: 20 }}>
                <Text style={styles.button}>Log Out</Text>
            </Pressable>
            <View style={styles.container}>
                <Text style={styles.mainText}>You aren't linked to your partner yet</Text>
                <Text style={styles.subText}>Let's get you together</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => router.push("/pair")}>
                        <Text style={styles.button}>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </>
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
    },

})