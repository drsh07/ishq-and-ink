import { router } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth, db } from '../../../firebaseConfig';
import { CameraView, Camera } from 'expo-camera';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect, } from 'react'

export default function PairScreen() {

    const [statusText, setStatusText] = useState("Waiting for Partner...");
    const [scannedId, setScannedId] = useState("");

    useEffect(() => {

        const unsubscribe = onSnapshot(doc(db, "users", auth.currentUser!.uid), (snap) => {
            if (snap.data()!.partnerId !== null) {
                setStatusText("Successfully paired!");
            }
        });
        return unsubscribe;
    }, []);

    const handleScanner = async () => {
        try {
            CameraView.onModernBarcodeScanned((result) => {
                setScannedId(result.data);
                CameraView.dismissScanner();
            });
            await CameraView.launchScanner({ barcodeTypes: ['qr'] });
        }
        catch (error) {
            console.log(error)
        }

    }

    const attemptPairing = (scannedId) => {

        

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
                    <Text>   {statusText}</Text>
                </View>
                <Text style={styles.subText}>Or scan your partner's</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={handleScanner}>
                        <Text style={styles.button}>Scan QR Code</Text>
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
