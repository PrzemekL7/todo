import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVAhjK4uhkXZjC5v8KrANNK-TLbWJke5k",
  authDomain: "todo-c1bc5.firebaseapp.com",
  projectId: "todo-c1bc5",
  storageBucket: "todo-c1bc5.appspot.com",
  messagingSenderId: "785679978648",
  appId: "1:785679978648:web:b8823ce93c462b0bd740ed"
};

const app = initializeApp(firebaseConfig);

export default app;