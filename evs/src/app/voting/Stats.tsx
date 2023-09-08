import { useAppSelector } from "@/redux/hooks";
import { Box, Typography } from "@mui/material";
import Performance from "./Performance";
import { useEffect, useState } from "react";
import { CandidateVotes } from "./page";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebase.config";

interface StatsProps {
  title: string;
  electionKey: string;
}

export default function Stats({ title, electionKey }: StatsProps) {
  const { state } = useAppSelector((state) => state.account.data);
  const [results, setResults] = useState<Record<string, CandidateVotes>>({});

  const calcPercentages = (votes: number, totalVotes: number) => {
    return (votes / totalVotes) * 100;
  };

  // Calculate the total votes by reducing the 'votes' property of all parties
  const totalVotes = Object.values(results).reduce(
    (acc, party) => acc + party.votes,
    0
  );

  useEffect(() => {
    // Get a reference to the 'results' node in your Firebase database
    const resultsRef = ref(database, `results/${electionKey}`);

    // Set up a listener to fetch and update results data
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      const data = snapshot.val() || {}; // Handle null values

      // Update the state with the fetched results data
      setResults(data);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe(); // Unsubscribe to avoid memory leaks
    };
  }, [electionKey]);

  return (
    <Box>
      <Typography variant="h6">{title.toUpperCase()}</Typography>

      <Typography variant="subtitle2">
        Total votes casted: {totalVotes.toLocaleString()}
      </Typography>

      <Box display="flex" justifyContent="center" gap={6} py={3}>
        {Object.keys(results).map((party, index) => {
          const candidateVotePercentage = calcPercentages(
            results[party].votes,
            totalVotes
          );

          const candidate = {
            name: results[party].candidateName,
            votes: results[party].votes
          }

          return (
            <Performance
              key={index}
              candidateStats={candidate}
              votePercentage={candidateVotePercentage}
            />
          );
        })}
      </Box>
    </Box>
  );
}
