import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Candidate } from "./page";
import { ChangeEvent, useState } from "react";

// Define the props that this component expects
interface CandidateProps {
  candidates: Candidate[]; // An array of candidate objects
  onVote: (party: string, name: string) => void; // A callback function for casting a vote
}

// Define the Options component
export default function Options({ candidates, onVote }: CandidateProps) {
  // Initialize state to store the selected candidate's name
  const [value, setValue] = useState("");

  // Handle changes in the selected candidate
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use the `find` function to find the candidate with the matching name
    const selectedCandidate = candidates.find(
      (candidate) => candidate.name === value
    );

    if (selectedCandidate) {
      // Call the `onVote` function with the selected candidate's party and name
      onVote(selectedCandidate.party, selectedCandidate.name);
    } else {
      // Handle the case where no candidate with the selected name was found
      console.error("Candidate not found");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <FormLabel id="select-candidate">Candidates</FormLabel>
        <RadioGroup
          aria-labelledby="select-candidate"
          name="candidates"
          value={value}
          onChange={handleChange}
        >
          {candidates && candidates.map((candidate) => (
            <FormControlLabel
              key={candidate.party}
              value={candidate.name}
              control={<Radio />}
              label={`${candidate.name}(${candidate.party})`}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button type="submit" variant="contained">
        Cast vote
      </Button>
    </Box>
  );
}
