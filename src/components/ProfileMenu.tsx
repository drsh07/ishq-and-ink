import { View, Text, Pressable, StyleSheet } from 'react-native';
import ToolbarButton from './ToolbarButton';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function ProfileMenu() {

    const handleSignOut = async () => {
        try {
          await signOut(auth);
        }
        catch (error) {
          console.log(error);
        }
      }

    return (
        <View style={styles.container}>
            <ToolbarButton icon='pencil' text='Edit name' iconLeft={true} onPress={() => void} />
            <View style={{height: 5}} />
            <ToolbarButton icon='information' text='About' iconLeft={true} onPress={() => void} />
            <View style={{height: 5}} />
            <ToolbarButton icon='logout' text='Log out' iconLeft={true} onPress={handleSignOut} />
        </View>
    )

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#34254c",
    flex: 1,
    padding: 5,
    position: "absolute",
    top: 60,
    left: 200,
    width: 122,
    height: "auto",
    borderRadius: 20,
    zIndex: 999,
  },

    menuText: {
      fontFamily: "Inter_300Light",
      fontSize: 12,
      color: "grey",
      marginLeft: 5,
    },

    letterField: {
      marginTop: 20,
      backgroundColor: "#443450",
      borderRadius: 20,
      flex: 1,
      padding: 20,
      textAlignVertical: "top",
      color: "white",

    }
})