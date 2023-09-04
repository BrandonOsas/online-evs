"use client"
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebase.config";
import ElectionItem, { ElectionData } from "./ElectionItem";

export default function OngoingElection() {
  const [ongoingElections, setOngoingElections] =
    useState<Record<string, ElectionData>>();

  useEffect(() => {
    const ongoingRef = ref(database, "elections/ongoing");
    onValue(ongoingRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setOngoingElections(data);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <ElectionItem elections={ongoingElections!} path="elections/ongoing/" />
    </Box>
  );
}
