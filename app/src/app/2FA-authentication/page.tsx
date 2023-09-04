"use client"
import { useEffect, useState } from "react";
import CreateMultiFactorAuth from "./CreateMultiFactorAuth";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase.config";

export default function RegisterTwoFactorAuthentication() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );

    return () => unsubscribe();
  }, []);

  if (currentUser) {
    return <CreateMultiFactorAuth currentUser={currentUser} />;
  }
}
