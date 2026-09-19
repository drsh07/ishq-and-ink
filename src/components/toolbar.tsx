import { StyleSheet, Text, View } from 'react-native';
import ToolbarButton from './ToolbarButton';

type Props = {
    count : number,
    deleteFunc: () => void,
    insertTabFunc: () => void,
    sendFunc: () => void,
}

export default function Toolbar({count, deleteFunc, insertTabFunc, sendFunc} : Props) {

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", gap: 8}}>
            <ToolbarButton
                text='Tab'
                backgroundColor='#ce9ee8'
                icon='format-indent-increase'
                onPress={insertTabFunc}
                iconLeft={true}
            />
            <ToolbarButton
                text='Clear'
                icon='trash-can'
                backgroundColor='#ce9ee8'
                onPress={deleteFunc}
                iconLeft={true}
            />
            </View>
            <Text style={styles.count}>{count} / 250</Text>
            <ToolbarButton
                text='Send'
                backgroundColor='#ce9ee8'
                icon='send'
                onPress={sendFunc}
                disabled={count >= 250 ? false : true }
                iconLeft={false}
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