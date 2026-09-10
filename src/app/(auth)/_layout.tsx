import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
    <Stack>
    <Stack.Screen name="login" options={{title: "Log in", headerShown: false}}/>
    <Stack.Screen name="createAccount" options={{title: "Create Account", headerStyle: {backgroundColor: "#443450"},
    headerTitleStyle: {color: "white"}, headerTintColor: "white"}}/>
    </Stack>
    )
}