import { useAppSelector } from "@/redux/hooks";
import { Box, Typography } from "@mui/material";
import Performance from "./Performance";

const liveResults = [
  { name: "Obaseki Godwin", votes: 234500 },
  { name: "Queen Idia", votes: 945678 },
  { name: "Festus Alenkhe", votes: 192838 },
  { name: "Sydney Shocker", votes: 590432 },
];

const liveNumbers = liveResults.map((candidate) => candidate.votes);

const totalVotes = liveNumbers.reduce((total, candidate) => {
  return total + candidate;
});

const calcPercentages = (votes: number, totalVotes: number) => {
  return (votes / totalVotes) * 100;
};

interface StatsProps {
  title: string;
}

export default function Stats({ title }: StatsProps) {
  const data = useAppSelector((state) => state.account.data);
  const { state } = data;
  let electionTitle: string;

  switch (title) {
    case "presidential":
      electionTitle = "Nigeria Presidential Election";
      break;
    case "governorship":
      electionTitle = `${state} State Gubernatorial Election`;
      break;
    default:
      electionTitle = `${title} Elections`;
      break;
  }

  return (
    <Box>
      <Typography variant="h6">{electionTitle.toUpperCase()}</Typography>

      <Typography variant="subtitle2">Total votes casted: {totalVotes.toLocaleString()}</Typography>

      <Box display="flex" justifyContent="center" gap={6} py={3}>
        {liveResults.map((candidate, index) => {
          const candidateVotePercentage = calcPercentages(
            candidate.votes,
            totalVotes
          );

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
