import {Text, View, Pressable, StyleSheet} from 'react-native';
import ToolbarButton from './ToolbarButton';

export default function Toolbar() {
    return (
        <View style={styles.container}>
            <ToolbarButton
             text='Tab' 
             backgroundColor='#ce9ee8'
             icon='format-indent-increase'
             />
            <Text style={styles.count}>0 / 200</Text>
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