import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJ4n7nHBpGFUlQH_084NKG6NeATzx6Des",

  authDomain: "ishq-and-ink.firebaseapp.com",

  projectId: "ishq-and-ink",

  storageBucket: "ishq-and-ink.firebasestorage.app",

  messagingSenderId: "1090917241741",

  appId: "1:1090917241741:web:21224f8e672f87e06663c4"

};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);