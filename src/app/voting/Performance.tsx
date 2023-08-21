import CircularPercentage from "@/components/CircularPercentage";
import { Box, Typography } from "@mui/material";

interface PerformanceProps {
  candidateStats: {
    name: string;
    votes: number;
  };
  votePercentage: number;
}

export default function Performance({candidateStats, votePercentage}: PerformanceProps) {
  return (
    <Box display="flex" flexDirection="column" gap={1} alignItems="center">
      <Typography variant="overline" color="primary">{candidateStats.name}</Typography>
      <Typography variant="h6">{candidateStats.votes.toLocaleString()}</Typography>
      <CircularPercentage value={votePercentage} />
    </Box>
  );
}
