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

interface CandidateProps {
  candidates: Candidate[];
}

export default function Options({ candidates }: CandidateProps) {
  return (
    <Box component="form">
      <FormControl fullWidth sx={{ mb: 3 }}>
        <FormLabel id="select-candidate">Candidates</FormLabel>
        <RadioGroup
          aria-labelledby="select-candidate"
          name="candidates"
          // value={value}
          // onChange={handleChange}
        >
          {candidates.map((candidate) => (
            <FormControlLabel
              key={candidate.party}
              value={candidate.name}
              control={<Radio />}
              label={`${candidate.name}(${candidate.party})`}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button type="button" variant="contained">
        Cast vote
      </Button>
    </Box>
  );
}
