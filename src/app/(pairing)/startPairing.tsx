import ToolbarButton from '@/components/ToolbarButton';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../../../firebaseConfig';

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
                <View style={{ position: 'absolute', top: 670, left: 20 }}>
                <ToolbarButton text='Log out' backgroundColor="#ce9ee8" onPress={handleSignOut} icon='logout' />
            </View>
                <Text style={styles.mainText}>You aren't linked to your partner yet</Text>
                <Text style={styles.subText}>Let's get you together</Text>
                <View style={{ marginTop: 50}}>
                    <ToolbarButton text='Continue' backgroundColor="#ce9ee8" onPress={() => {router.push("/pair")}} icon='arrow-right' />
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
        color: "white",
    },

    subText: {
        fontSize: 20,
        fontFamily: "Playfair_400Regular",
        textAlign: "center",
        marginTop: 20,
        color: "white",
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