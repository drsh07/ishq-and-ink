import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.appHeader}>Ishq & Ink</Text>
            <Text style={{ fontFamily: "Playfair_400Regular", color: "white", fontSize: 30 }}>Dedicated to Prisha {"<3"}</Text>
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