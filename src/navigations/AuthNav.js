import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "../utils/store";
import HomeNav from "./HomeNav";
import SignNav from "./SignNav";
import { auth, db } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AutoLoginLoadingScreen from "../screens/AutoLoginLoadingScreen";
import { doc, getDoc } from "firebase/firestore";
const AuthNav = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const myauth = useSelector((state) => state.auth);

  const getUserFromLocal = async () => {
    const value = await AsyncStorage.getItem("@user");
    if (value !== null) {
      let myval = JSON.parse(value);
      const { email, password } = myval;

      signInWithEmailAndPassword(auth, email, password).then(
        async (response) => {
          const userDoc = doc(db, "users", response.user.uid);
          const userRef = await getDoc(userDoc);
          if (userRef.exists()) {
            setloading(false);
            dispatch(signIn(userRef.data()));
          }
        }
      );
    } else {
      setloading(false);
    }
  };

  useEffect(() => {
    setloading(true);
    getUserFromLocal();
  }, []);

  return (
    <>
      {myauth.user ? (
        <HomeNav />
      ) : loading ? (
        <AutoLoginLoadingScreen />
      ) : (
        <SignNav />
      )}
    </>
  );
};

export default AuthNav;
