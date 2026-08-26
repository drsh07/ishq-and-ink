import { Stack } from "expo-router";

export default function TabsLayout() {
    return (
    <Stack>
    <Stack.Screen name="Home" options={{title: "Home", headerShown: false}}/>
    </Stack>
    )
}