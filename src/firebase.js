import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVAhjK4uhkXZjC5v8KrANNK-TLbWJke5k",
  authDomain: "todo-c1bc5.firebaseapp.com",
  projectId: "todo-c1bc5",
  storageBucket: "todo-c1bc5.appspot.com",
  messagingSenderId: "785679978648",
  appId: "1:785679978648:web:b8823ce93c462b0bd740ed"
};

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);

export default firebase;