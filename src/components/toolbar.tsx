import { Text, View, Pressable, StyleSheet } from 'react-native';
import ToolbarButton from './ToolbarButton';
import { useState } from 'react';

export default function Toolbar() {

    const [count, setCount] = useState(0)

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", gap: 8}}>
            <ToolbarButton
                text='Tab'
                backgroundColor='#ce9ee8'
                icon='format-indent-increase'
            />
            <ToolbarButton
                text='Clear'
                icon='trash-can'
                backgroundColor='#ce9ee8'
            />
            </View>
            <Text style={styles.count}>{count} / 250</Text>
            <ToolbarButton
                text='Send'
                backgroundColor='#ce9ee8'
                icon='send'
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#443450",
        borderRadius: 40,
        marginTop: 20,
        height: 50,
        padding: 5
    },

    count: {
        fontFamily: "Inter_300Light",
        color: "white",

    }

})