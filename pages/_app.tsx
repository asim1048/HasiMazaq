import "../styles/globals.css";
import type { AppProps } from "next/app";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import { CircularProgress } from "@mui/material";
import React from "react";
import { updateDoc, doc } from "@firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  React.useEffect(() => {
    (async () => {
      if (user) {
        // db.collection('users').doc(user.uid).set({
        //   email: user.email,
        //   lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        //   photoURL: user.photoURL,
        // }, { merge: true })

        await updateDoc(doc(db, "users", user.uid), {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        });
      }
    })();
  }, [user]);

  if (loading) return <Loader />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
