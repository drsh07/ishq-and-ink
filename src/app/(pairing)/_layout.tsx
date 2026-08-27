import { Stack } from 'expo-router';

export default function PairingLayout() {

    return (
        <Stack>
            <Stack.Screen name='startPairing' options={{headerShown: false}} />
        </Stack>
    )

}