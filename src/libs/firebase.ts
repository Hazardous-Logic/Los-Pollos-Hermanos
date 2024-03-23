import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Firebase connection parameters
const firebaseConfig = {
  apiKey: "AIzaSyCF7Hu8IuRh-yh3wbRiVxfH0n0E7nOrPXY",
  authDomain: "los-pollos-hemanos.firebaseapp.com",
  projectId: "los-pollos-hemanos",
  storageBucket: "los-pollos-hemanos.appspot.com",
  messagingSenderId: "346173990369",
  appId: "1:346173990369:web:d6ebb5021adb23418e5ea0",
  measurementId: "G-RR3NCS6RHL"
};

//Initialization of the Authenticator and the database(firestore)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
