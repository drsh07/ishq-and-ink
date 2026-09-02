import { Text, View, StyleSheet, Pressable, ActivityIndicatorBase } from 'react-native';
import { Playfair_400Regular } from '@expo-google-fonts/playfair';
import { auth } from '../../../firebaseConfig';
import { router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { ActivityIndicator } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

export default function ScannerScreen() {

    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <>
                <Pressable onPress={() => router.back()} style={{ position: 'absolute', top: 700, left: 20 }}>
                    <Text style={styles.button}>Log Out</Text>
                </Pressable>
                <View style={styles.container}>
                    <Text style={styles.mainText}>We need access to your camera</Text>
                    <Text style={styles.subText}>This is only to scan your partner's QR code</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={requestPermission}>
                            <Text style={styles.button}>Allow access</Text>
                        </Pressable>
                    </View>
                </View>
            </>
        )
    }

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
