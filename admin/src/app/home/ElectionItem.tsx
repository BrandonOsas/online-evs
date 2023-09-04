"use client"
import DeleteIcon from "@mui/icons-material/Delete";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import BlockIcon from "@mui/icons-material/Block";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Typography, Box, Divider } from "@mui/material";
import { ref, remove } from "firebase/database";
import { database } from "../../../firebase.config";

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

// Define an interface for a candidate
interface Candidate {
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

interface ElectionProps {
  elections: Record<string, ElectionData>;
  path: string;
}

export default function ElectionItem({ elections, path }: ElectionProps) {
  const removeElectionItemHandler = (id: string): void => {
    const electionItemRef = ref(database, path + id);
    remove(electionItemRef);
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      {elections &&
        Object.entries(elections).map(([id, election], index) => (
          <Box key={index}>
            <Box pb={3}>
              <Box display="flex" gap={1}>
                <UpcomingIcon fontSize="small" color="primary" />
                <Typography color="primary">{election.date}</Typography>
              </Box>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                {getTitle(id, election.state)}{" "}
                {/* Call getTitle function here */}
              </Typography>
              <Typography>
                Candidates:{" "}
                {election.candidates.map((candidate, idx) => (
                  <span key={idx}>
                    {candidate.name} ({candidate.party})
                    {idx !== election.candidates.length - 1 && ", "}
                  </span>
                ))}
              </Typography>
              <Typography variant="body2">
                Election portal opens at {election.time.from} in the morning and
                closes at {election.time.to} in the evening.
              </Typography>
            </Box>
            <Box display="flex" gap={0}>
              <Button
                variant="contained"
                color="inherit"
                sx={{ borderRadius: 0 }}
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 0 }}
              >
                <TaskAltIcon />
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: 0 }}
              >
                <BlockIcon />
              </Button>
              <Button
                variant="text"
                color="error"
                sx={{ borderRadius: 0 }}
                onClick={() => {
                  removeElectionItemHandler(id)
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
            <Divider sx={{my:5}} />
          </Box>
        ))}
    </Box>
  );
}
