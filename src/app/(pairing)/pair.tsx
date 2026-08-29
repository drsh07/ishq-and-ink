import { Text, View, StyleSheet, Pressable, ActivityIndicatorBase } from 'react-native';
import { Playfair_400Regular } from '@expo-google-fonts/playfair';
import { auth } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { ActivityIndicator } from 'react-native';

export default function PairScreen() {

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
            <Pressable onPress={() => router.back()} style={{ position: 'absolute', top: 700, left: 20 }}>
                <Text style={styles.button}>Back</Text>
            </Pressable>
            <View style={styles.container}>
                <Text style={[styles.mainText, { marginBottom: 20 }]}>Your QR code:</Text>
                <QRCode
                    value={auth.currentUser?.uid}
                    size={200}
                />
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <ActivityIndicator></ActivityIndicator>
                    <Text>   Waiting for partner...</Text>
                </View>
                <Text style={styles.subText}>Or scan your partner's</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => router.replace("/pair")}>
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

    backButton: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        backgroundColor: "#ce9ee8",
        marginTop: 50,
        marginBottom: 10,
        position: "absolute",
        top: 675,
        left: 15,

    }



})
