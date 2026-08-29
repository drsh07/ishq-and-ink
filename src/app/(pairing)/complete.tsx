import { signOut } from 'firebase/auth';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore'
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

export default function StartPairingScreen() {

    const [name, setName] = useState("partner");

    useEffect(() => {
        fetchPartnerName().then((name) => {
            setName(name);
        })
    }, [])

    const fetchPartnerName = async () => {
        const ownDocSnap = await getDoc(doc(db, "users", auth.currentUser!.uid));

        if (ownDocSnap.exists()) {
            const partnerDocSnap = await getDoc(doc(db, "users", ownDocSnap.data().partnerId));
            if (partnerDocSnap.exists()) {
                return partnerDocSnap.data().name;
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>You're now linked!</Text>
            <Text style={styles.subText}>You are linked to {name} forever. No running away.</Text>
            <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={() => router.replace("/(tabs)")}>
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
    },

})