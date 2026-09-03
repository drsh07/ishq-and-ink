import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Alert, Keyboard } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import  Header  from '@/components/header';
import Toolbar from "@/components/toolbar";
import { useEffect, useState } from 'react';
import { addDoc, collection, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";

export default function Index() {

    const id = useLocalSearchParams();

  return (
    <View style={styles.container}>

    </View>
  )

};

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#281b33",
    flex: 1,
    padding: 25,
  },

    rules: {
      fontFamily: "Inter_300Light",
      fontSize: 12,
      color: "white"
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
