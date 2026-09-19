import { router } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../../../firebaseConfig';
import ToolbarButton from '../../components/ToolbarButton';

export default function EditNameScreen() {

    const [name, setName] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchName = async () => {
            const docSnap = await getDoc(doc(db, "users", auth.currentUser!.uid));

            if (docSnap.exists()) {
                setName(docSnap.data().name);
            }

        }
        fetchName();
    }, []);


    const changeName = async () => {

        setUpdating(true);

        const nameRef = doc(db, "users", auth.currentUser!.uid);

        await updateDoc(nameRef, {
            name: name,
        });

        setUpdating(false);

        Alert.alert('Success', 'Your name has been successfully changed!', [
            {
                text: "OK",
                style: "default",
                onPress: () => { router.back() }
            }
        ])

    };

    return (
        <View style={styles.container}>
            <TextInput
                value={name}
                placeholder="Edit name"
                onChangeText={setName}
                placeholderTextColor={"#797575"}
                style={styles.textField}
            />

            {updating ? (<>
                <ActivityIndicator size={30} />
                <Text style={{
                    color: "white",
                    fontFamily: "Inter_300Light",
                    marginTop: 5,
                    textAlign: "center"
                }}>Updating...</Text>
            </>) :
                (
                    <ToolbarButton icon='pencil' text="Change" backgroundColor="#ce9ee8" onPress={changeName} />

                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        padding: 25,
        backgroundColor: "#281b33"
    },

    textField: {
        marginTop: 7,
        backgroundColor: "#443450",
        borderRadius: 40,
        padding: 20,
        color: "white",
        width: '100%',
        marginBottom: 20
    },
});