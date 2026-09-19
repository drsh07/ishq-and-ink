import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    text?: string,
    backgroundColor?: string,
    icon?: string,
    iconLeft?: boolean
    iconColor?: string,
    iconSize?: number,
    onPress: () => void
    disabled?: boolean
}

export default function ToolbarButton({ text, backgroundColor = "#ce9ee8", icon, iconColor = "#000000", iconSize = 15, onPress, disabled = false, iconLeft = false }: Props) {

    return (
        iconLeft ? (
            <Pressable style={[styles.container, { backgroundColor, opacity: disabled ? 0.4 : 1 }]} onPress={onPress} android_ripple={{}} disabled={disabled}>
                {icon && (
                    <MaterialDesignIcons name={icon as any} size={iconSize} color={iconColor} />
                )}
                <Text>{text}</Text>
            </Pressable>
        ) : (
            <Pressable style={[styles.container, { backgroundColor, opacity: disabled ? 0.4 : 1 }]} onPress={onPress} android_ripple={{}} disabled={disabled}>
                <Text>{text}</Text>
                {icon && (
                    <MaterialDesignIcons name={icon as any} size={iconSize} color={iconColor} />
                )}
            </Pressable>
        )

    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        height: 40,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
})