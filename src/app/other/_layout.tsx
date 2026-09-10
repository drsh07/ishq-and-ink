import { Stack } from "expo-router";

export default function otherLayout() {
  return (
  <Stack>
     <Stack.Screen name="editName" options={{ headerTintColor: "white", title: "Edit Name", headerStyle: {backgroundColor: "#443450"} }} />
     <Stack.Screen name="about" options={{ headerTintColor: "white", title: "About", headerStyle: {backgroundColor: "#443450"} }} />
     </Stack>
  )
}