import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, query, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCJmXhdAuOaKhcpZWuJxnCqvpzP21VdUO4",
  authDomain: "desny-plus.firebaseapp.com",
  databaseURL: "https://desny-plus-default-rtdb.firebaseio.com",
  projectId: "desny-plus",
  storageBucket: "desny-plus.appspot.com",
  messagingSenderId: "290351524558",
  appId: "1:290351524558:web:c700f70baa2eb46f2dbe9f",
  measurementId: "G-EVX46B5N44",
};

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const colRef = collection(db, "watchList");
const q = query(colRef);

export { app, Auth, provider, q, colRef, db };
