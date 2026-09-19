import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.appHeader}>Ishq & Ink</Text>
            <Text style={{ fontFamily: "Playfair_400Regular", color: "white", fontSize: 25 }}>Love, Forever Inked</Text>
            <View style={{flexGrow: 0.4}} />
            <Text style={{ fontFamily: "Inter_300Light", color: "grey", fontSize: 20 }}>Version 0.9</Text>
            <View style={{flexGrow: 0.4}} />
            <Text style={{ fontFamily: "Inter_300Light", color: "white", fontSize: 20 }}>Created by Darsh Sood</Text>
            <Text style={{ fontFamily: "Playfair_400Regular", color: "white", fontSize: 20 }}>Dedicated to Prisha {"<3"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        padding: 25,
        backgroundColor: "#281b33"
    },

    appHeader: {
        fontSize: 80,
        fontFamily: "Birthstone_400Regular",
        color: "white"
    },
});