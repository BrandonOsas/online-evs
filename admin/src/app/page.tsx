"use client";
import { User, onAuthStateChanged } from "firebase/auth";
import Tabs from "./home/Tabs";
import { auth } from "../../firebase.config";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "./home/TopBar";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        // User is signed out
        // redirect("/auth");
        router.push("/auth");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]);

  if (user) {
    return (
      <Fragment>
        <TopBar />
        <Tabs />
      </Fragment>
    );
  }

  // You can return a loading indicator or anything else while waiting for authentication
  return <div>Loading...</div>;
}
