import { router } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth, db } from '../../../firebaseConfig';
import { CameraView, Camera } from 'expo-camera';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useState, useEffect, } from 'react';
import ToolbarButton from '@/components/ToolbarButton';

export default function PairScreen() {

    const [statusText, setStatusText] = useState("Waiting for Partner...");
    const [scannedId, setScannedId] = useState("");

    useEffect(() => {

        const unsubscribe = onSnapshot(doc(db, "users", auth.currentUser!.uid), (snap) => {
            if (snap.data()!.partnerId !== null) {

                fetchPartnerName(snap.data()!.partnerId).then((partnerName) => {
                    setStatusText("Linked to " + partnerName);
                    setTimeout(() => { }, 2000);
                    router.replace("/complete");
                });
            }
        });
        return unsubscribe;
    }, []);

    const handleScanner = async () => {
        try {
            CameraView.onModernBarcodeScanned((result) => {
                attemptPairing(result.data);
                setScannedId(result.data)
                CameraView.dismissScanner();
            });
            await CameraView.launchScanner({ barcodeTypes: ['qr'] });
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchPartnerName = async (partner: string) => {
        const docSnap = await getDoc(doc(db, "users", partner));

        if (docSnap.exists()) {
            return docSnap.data().name;
        }
    }

    const attemptPairing = async (scannedId: string) => {

        setStatusText("Validating pairing...");

        const ownDocSnap = await getDoc(doc(db, "users", auth.currentUser!.uid));
        const scannedDocSnap = await getDoc(doc(db, "users", scannedId));

        if (ownDocSnap.exists()) {
            if (ownDocSnap.data().partnerId !== null) {
                alert("You are already paired to someone. How did you get here?");
                return;
            }
        }
        else {
            alert("Somehow you dont exist.")
            return;
        }

        if (scannedDocSnap.exists()) {
            if (scannedDocSnap.data().partnerId !== null) {
                alert("You are already paired to someone. How did you get here?");
                return;
            }
        }
        else {
            alert("Invalid QR code: User not found")
            return;
        }

        setStatusText("Linking...");

        await updateDoc(doc(db, "users", auth.currentUser!.uid), {
            partnerId: scannedId,
        })

        await updateDoc(doc(db, "users", scannedId), {
            partnerId: auth.currentUser!.uid,
        })

        setStatusText("Linked to " + scannedDocSnap.data().name);
        setTimeout(() => { }, 2000);
        router.replace("/complete");


    }


    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 670, left: 20 }}>
                <ToolbarButton text='Back' backgroundColor="#ce9ee8" onPress={() => router.back()} icon='arrow-left' />
            </View>
            <Text style={[styles.mainText, { marginBottom: 20 }]}>Your QR code:</Text>
            <QRCode
                value={auth.currentUser?.uid}
                size={200}
            />
            <View style={{ flexDirection: 'row', marginTop: 40 }}>
                <ActivityIndicator></ActivityIndicator>
                <Text style={{ color: "white" }}>   {statusText}</Text>
            </View>
            <Text style={styles.subText}>Or scan your partner's</Text>
            <View style={{ marginTop: 30 }}>
                <ToolbarButton text='Scan QR Code' backgroundColor="#ce9ee8" onPress={handleScanner} icon='camera' />
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
        backgroundColor: "#281b33",
    },

    mainText: {
        fontSize: 40,
        fontFamily: "Playfair_400Regular",
        textAlign: "center",
        color: "white"
    },

    subText: {
        fontSize: 20,
        fontFamily: "Playfair_400Regular",
        textAlign: "center",
        marginTop: 20,
        color: "white"
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
