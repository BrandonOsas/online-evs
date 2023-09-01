"use client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Stats from "./Stats";
import { auth, database } from "../../../firebase.config";
import Options from "./Options";
import { onValue, ref } from "firebase/database";

// Define an interface for a candidate
export interface Candidate {
  name: string;
  party: string;
}

// Define an interface for the upcoming election object
export interface ElectionData {
  candidates: Candidate[];
  date: string;
  lga: string;
  state: string;
  time: { from: string; to: string };
  type: string;
}

export interface VoterInfo {
  state: string;
  [prop: string]: string;
}

const electionTypes = [
  "Presidential",
  "National/House of Senate",
  "House of Representatives",
  "Governorship",
  "State/House of Assembly",
  "Local Government",
];

const getTitle = (id: string, state: string): string => {
  let title = "";

  if (id.includes("npe")) {
    title = "Nigeria Presidential Election";
  } else if (id.includes("nhs")) {
    title = "National House of Assembly Elections";
  } else if (id.includes("nhr")) {
    title = "National House of Representatives Elections";
  } else if (id.includes("gov")) {
    title = state + " State Gubernatorial Election";
  } else if (id.includes("ha")) {
    title = state + " State House of Assembly Election";
  } else if (id.includes("lga")) {
    title = state + " State Local Govt Elections";
  }

  return title;
};

export default function Vote() {
  const [electionType, setElectionType] = useState<string>("");
  const [election, setElection] = useState<Record<string, ElectionData>>();
  const [voterInfo, setVoterInfo] = useState<VoterInfo>();
  const user = auth.currentUser;

  const handleElection = (e: SelectChangeEvent) => {
    setElectionType(e.target.value);
  };

  useEffect(() => {
    onValue(
      ref(database, "voters" + user?.uid),
      (snapshot) => {
        setVoterInfo(snapshot.val());
      },
      { onlyOnce: true }
    );
  }, [user]);

  useEffect(() => {
    onValue(ref(database, "elections/ongoing"), (snapshot) => {
      // store all ongoing elections
      const values: Record<string, ElectionData> = snapshot.val();
      // initialize a variable to hold all elections with the selectedElectionTypes
      const selectedElectionTypes: Record<string, ElectionData> = {};

      for (const key in values) {
        if (values[key].type === electionType) {
          if (
            values[key].state === voterInfo?.state ||
            values[key].state === "All"
          ) {
            selectedElectionTypes[key] = values[key];
          }
        }
      }

      setElection(selectedElectionTypes);
    });
  }, [electionType, voterInfo]);

  if (!user) {
    return redirect("/voting/authenticate-voter");
  }

  return (
    <Box>
      <Box
        mt={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
      >
        <FormControl variant="outlined" sx={{ minWidth: 300 }}>
          <InputLabel id="choose-label">Choose election</InputLabel>
          <Select
            labelId="choose-label"
            id="choose-election"
            value={electionType}
            label="Choose election"
            onChange={handleElection}
          >
            {electionTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {!election ? (
          <Box>No Ongoing Election for your residential region at this time.</Box>
        ) : (
          <Box>
            <Stats
              title={getTitle(
                Object.keys(election)[0],
                election[Object.keys(election)[0]]?.state
              )}
            />
            <Options
              candidates={election[Object.keys(election)[0]]?.candidates}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
