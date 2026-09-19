import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <View style={styles.header} >
                <Text style={styles.headerText}>Ishq & Ink</Text>
                <Pressable onPress={() => { setIsOpen(!isOpen) }}>
                    <MaterialDesignIcons style={{ justifyContent: "center" }} name="account-circle" size={30} color="#ffffff" />
                </Pressable>
            </View>
            {isOpen && (<>
                <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsOpen(false)} />
                <ProfileMenu />
            </>
            )}
        </>
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