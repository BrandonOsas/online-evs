"use client";
import { User, onAuthStateChanged } from "firebase/auth";
import Tabs from "./home/Tabs";
import { auth } from "../../firebase.config";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "./home/TopBar";

export default function Home() {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      console.log(user);
    } else {
      // User is signed out
      // redirect("/auth");
      return router.push("/auth");
    }
  });

  if (user) {
    return (
      <Fragment>
        <TopBar />
        <Tabs />
      </Fragment>
    );
  }
}
