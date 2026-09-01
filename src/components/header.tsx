import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

type Props = {
    profilePress: () => void
}

export default function Header({profilePress} : Props) {
    return (
    <View style={styles.header} >
        <Text style={styles.headerText}>Ishq & Ink</Text>
        <Pressable onPress={profilePress}>
            <MaterialDesignIcons style={{ justifyContent: "center" }} name="account-circle" size={30} color="#ffffff" />
        </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#281b33",
    },

    headerText: {
        fontSize: 40,
        fontFamily: "Birthstone_400Regular",
        color: "white",
    },
})