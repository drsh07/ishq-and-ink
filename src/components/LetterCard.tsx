import { router } from 'expo-router';
import { View, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    text: string,
    read: boolean,
    id: string
}

export default function LetterCard({ text, read, id }: Props) {

    return (
        <Pressable onPress={() => {router.push(`/read/${id}`)}}>
            <View style={[styles.container, {opacity: read ? 0.4 : 1 }]}>
                <Text style={{
                    fontFamily: "Inter_300Light",
                    color: "white"
                }}>{text}</Text>
                {!read && (<View style={styles.dot} />)}
            </View>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#443450",
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        color: "white",
        marginBottom: 10,
    },

    dot: {
        backgroundColor: "#ce9ee8",
        width: 10,
        height: 10,
        borderRadius: 10,
    }
})