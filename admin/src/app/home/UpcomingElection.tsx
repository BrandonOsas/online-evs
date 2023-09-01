import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Typography, Box } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebase.config";
import ElectionItem, { ElectionData } from "./ElectionItem";


export default function UpcomingElection() {
  const [upcomingElections, setUpcomingElections] =
    useState<Record<string, ElectionData>>();

  useEffect(() => {
    const upcomingRef = ref(database, "elections/upcoming");
    onValue(upcomingRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setUpcomingElections(data);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <ElectionItem elections={upcomingElections!} path="elections/upcoming/" />
    </Box>
  );
}
