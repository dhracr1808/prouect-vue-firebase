import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyAWRvXwGxL1kxsqMSPh6xbOygxQObwjCk0",
  authDomain: "vue3-auth-95f2a.firebaseapp.com",
  projectId: "vue3-auth-95f2a",
  storageBucket: "vue3-auth-95f2a.appspot.com",
  messagingSenderId: "1061124446628",
  appId: "1:1061124446628:web:538a34a651e217d9560931",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();
export { auth, db };
