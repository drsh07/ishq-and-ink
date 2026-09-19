import ToolbarButton from '@/components/ToolbarButton';
import { router } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../../firebaseConfig';

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
                <View style={{ marginTop: 50 }}>
                    <ToolbarButton text='Continue' backgroundColor="#ce9ee8" onPress={() => { router.replace("/(tabs)") }} icon='arrow-right' />
                </View>
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

})