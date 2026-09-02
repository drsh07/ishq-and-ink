import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
    return (
        <NativeTabs
            tintColor="#ce9ee8"
            backgroundColor="#34254c"
            indicatorColor="#684b96"
        >
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Mail</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    sf={{ default: 'pencil.circle', selected: 'pencil.circle.fill' }}
                    md={{ default: 'edit', selected: 'edit' }} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="inbox">
                <NativeTabs.Trigger.Label>Mail</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    sf={{ default: 'tray', selected: 'tray.fill' }}
                    md={{ default: 'mail', selected: 'mail' }} />
            </NativeTabs.Trigger>
        </NativeTabs>
    )

}