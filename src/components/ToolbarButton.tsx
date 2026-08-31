import { Text, View, Pressable, StyleSheet } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

type Props = {
    text?: string,
    backgroundColor?: string,
    icon?: string,
    iconColor?: string,
    iconSize?: number

}

export default function ToolbarButton({text, backgroundColor = "#281b33", icon, iconColor = "#000000", iconSize = 15} : Props) {

    return (
        <Pressable style={[styles.container, { backgroundColor } ]}>
            <Text>{text}</Text>
            {icon && (
                <MaterialDesignIcons name={icon as any} size={iconSize} color={iconColor} />
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        height: 40,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
})