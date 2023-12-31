"use client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Stats from "./Stats";
import { auth, database } from "../../../firebase.config";
import Options from "./Options";
import { onValue, ref, set, update } from "firebase/database";

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
  voters?: string[];
}

interface OngoingElection extends ElectionData {
  id: string;
}

// Define an interface for candidate votes
export interface CandidateVotes {
  candidateName: string;
  votes: number;
}

// Define an interface for voter information
export interface VoterInfo {
  state: string;
  [prop: string]: string;
}

// Define an array of election types
const electionTypes = [
  "Presidential",
  "National/House of Senate",
  "House of Representatives",
  "Governorship",
  "State/House of Assembly",
  "Local Government",
];

// Define a function to generate a title based on election type and state
const getTitle = (id: string, state: string): string => {
  let title = "";

  // Determine the election title based on the provided ID
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

// Define the main component
export default function Vote() {
  // Initialize state variables
  const [electionType, setElectionType] = useState<string>("");
  const [ongoingElections, setOngoingElections] = useState<
    OngoingElection[]
  >([]);
  const [voterInfo, setVoterInfo] = useState<VoterInfo>();
  const [votes, setVotes] = useState<
    Record<string, Record<string, CandidateVotes>>
  >({});
  const [activeElectionIndex, setActiveElectionIndex] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState(false);
  const user = auth.currentUser;
  const activeElectionKey = ongoingElections[0]?.id; // Use the id of the active election as the election key

  // Handle election type selection
  const handleType = (e: SelectChangeEvent) => {
    setElectionType(e.target.value);
  };

  // To update elections from upcoming to ongoing
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in the format 'YYYY-MM-DD'

    const upcomingRef = ref(database, "elections/upcoming");

    const upcomingListener = onValue(upcomingRef, (snapshot) => {
      const upcomingElections: Record<string, ElectionData> = snapshot.val();

      // Filter elections based on the date field
      const filteredElections: Record<string, ElectionData> = {};

      for (const key in upcomingElections) {
        const election = upcomingElections[key];
        if (election.date === today) {
          // Set the 'voters' property to an empty array for the ongoing election
          election.voters = []; // Add this line to initialize the 'voters' property

          // Move this election to the ongoing elections
          set(ref(database, "elections/ongoing/" + key), election);
        } else {
          // Keep this election in the upcoming elections
          filteredElections[key] = election;
        }
      }

      // Update the upcoming elections in the database
      set(upcomingRef, filteredElections);
    });

    return () => {
      // Clean up the event listener when the component unmounts
      upcomingListener();
    };
  }, []);

  // To get the voter's bio data
  useEffect(() => {
    const userRef = ref(database, "voters/" + user?.uid);

    const voterInfoListener = onValue(userRef, (snapshot) => {
      setVoterInfo(snapshot.val());
    });

    return () => {
      // Clean up the event listener when the component unmounts
      voterInfoListener();
    };
  }, [user]);

  useEffect(() => {
    const ongoingRef = ref(database, "elections/ongoing");
    const resultsRef = ref(database, "results");

    const resultsListener = onValue(resultsRef, (snapshot) => {
      setVotes(snapshot.val());
    });

    const ongoingListener = onValue(ongoingRef, (snapshot) => {
      const ongoingElectionsData: Record<string, ElectionData> = snapshot.val();

      // Convert ongoingElectionsData to an array of ElectionData objects

      const ongoingElection: OngoingElection[] = Object.entries(
        ongoingElectionsData
      ).map(([key, value]) => ({
        ...value,
        id: key,
      }));

      // Filter the elections based on the selected election type and user's state
      const filteredElections: OngoingElection[] = ongoingElection.filter(
        (election) => {
          return (
            election.type === electionType &&
            (election.state.toLowerCase() === voterInfo?.state.toLowerCase() ||
              election.state === "All")
          );
        }
      );

      setOngoingElections(filteredElections);
      setActiveElectionIndex(0); // Set the first election as the active one

      // Check if the user has already voted in the active election
      if (filteredElections.length > 0) {
        const activeElection = filteredElections[0];
        if (
          activeElection.voters &&
          activeElection.voters.includes(user!.uid)
        ) {
          // User has already voted in the active election
          setHasVoted(true);
        }
      }

      // Initialize the votes state for each ongoing election
      const initialVotesState: Record<
        string,
        Record<string, CandidateVotes>
      > = {};
      filteredElections.forEach((election) => {
        const electionKey = election.id;
        if (!votes[electionKey]) {
          initialVotesState[electionKey] = {}; // Use the id of the election as the outer key
        }
      });

      // Merge the initialVotesState with the existing votes state
      setVotes((prevVotes) => ({ ...prevVotes, ...initialVotesState }));
    });

    return () => {
      // Clean up the event listeners when the component unmounts
      ongoingListener();
      resultsListener();
    };
  }, [electionType, voterInfo, user, votes]);

  if (!user) {
    // Redirect to the authentication page if the user is not logged in
    return redirect("/voting/authenticate-voter");
  }

  // Define a function to update the results in the Firebase database
  const updateResults = (
    electionKey: string,
    votesData: Record<string, Record<string, CandidateVotes>>
  ) => {
    // Get a reference to the 'results' node in your Firebase database
    const resultsRef = ref(database, `results/${electionKey}`);

    // Update the results data in the database
    update(resultsRef, votesData)
      .then(() => {
        console.log("Results updated successfully");
      })
      .catch((error) => {
        console.error("Error updating results:", error);
      });
  };

  // Define a function to update the ongoing election in the Firebase database
  const updateOngoingElection = (
    electionKey: string,
    updatedElection: OngoingElection
  ) => {
    // Get a reference to the 'elections/ongoing' node in your Firebase database
    const ongoingRef = ref(database, `elections/ongoing/${electionKey}`);

    // Create a copy of the updatedElection without the 'id' field
    const { id, ...updatedElectionWithoutId } = updatedElection;

    // Update the ongoing election data in the database
    update(ongoingRef, updatedElectionWithoutId)
      .then(() => {
        console.log("Ongoing election updated successfully");
      })
      .catch((error) => {
        console.error("Error updating ongoing election:", error);
      });
  };

  // Define a function to handle the votes with a default value for the election key.
  const handleVotes = (
    party: string,
    candidateName: string,
    electionKey: string = activeElectionKey
  ) => {
    // Create a copy of the current votes state
    const updatedVotes = { ...votes };

    // If the election key doesn't exist in the votes state, initialize it
    if (!updatedVotes[electionKey]) {
      updatedVotes[electionKey] = {};
    }

    // If the party doesn't exist in the election key, initialize the candidate name with 1 vote
    if (!updatedVotes[electionKey][party]) {
      updatedVotes[electionKey][party] = {
        candidateName: candidateName,
        votes: 1,
      };
    } else {
      // If the candidate name exists, increment the vote count
      updatedVotes[electionKey][party].votes++;
    }

    // console.log(updatedVotes);

    // Update the state with the new votes
    setVotes(updatedVotes);

    // Add the user's UID to the election's voters array
    const updatedElection = { ...ongoingElections[0] };
    if (!updatedElection.voters) {
      updatedElection.voters = []; // Initialize the voters array if it doesn't exist
    }
    updatedElection.voters.push(user!.uid); // Add the user's UID to the voters array

    // Update the ongoing election in the Firebase database
    updateOngoingElection(updatedElection.id, updatedElection);

    // Check if this is the first vote for this party in this election
    if (updatedVotes[electionKey][party].votes === 1) {
      // If it's the first vote, use set to create the entry in the Firebase database
      const votesData = {
        candidateName: candidateName,
        votes: 1,
      };

      // Get a reference to the 'results' node in your Firebase database
      const resultsRef = ref(database, `results/${electionKey}/${party}`);

      // Use set to create the entry
      set(resultsRef, votesData)
        .then(() => {
          console.log("Results added successfully");
        })
        .catch((error) => {
          console.error("Error adding results:", error);
        });
    } else {
      // If it's not the first vote, call the function to update the results in the Firebase database
      updateResults(electionKey, updatedVotes);
    }
  };

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
            onChange={handleType}
          >
            {electionTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {electionType && ongoingElections.length === 0 && (
          <Box>
            No Ongoing Election for your residential region at this time.
          </Box>
        )}

        {electionType && ongoingElections.length > 0 && (
          <Box>
            <Stats
              title={getTitle(
                activeElectionKey,
                ongoingElections[0].state
              )}
              electionKey={activeElectionKey}
            />

            {hasVoted ? (
              <Typography>
                Your vote has been counted. Thank you for fulfilling your
                patrotic duty and human right to vote.
              </Typography>
            ) : (
              <Options
                candidates={ongoingElections[0].candidates}
                onVote={handleVotes}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
