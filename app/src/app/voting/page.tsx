"use client";
import { useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { redirect } from "next/navigation";
import { useState } from "react";
import Stats from "./Stats";

export default function Vote() {
  const [election, setElection] = useState<string>("");
  const [candidate, setCandidate] = useState<string>("");
  const user = useAppSelector((state) => state.account.user);

  console.log(user)

  const handleElection = (e: SelectChangeEvent) => {
    setElection(e.target.value);
  }

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
          <InputLabel id="select-election-label">Choose election</InputLabel>
          <Select
            labelId="select-election-label"
            id="select-election"
            value={election}
            label="Choose election"
            onChange={handleElection}
          >
            <MenuItem value="presidential">Presidential</MenuItem>
            <MenuItem value="senate">House of Senate</MenuItem>
            <MenuItem value="governorship">Governorship</MenuItem>
            <MenuItem value="reps">House of Reps</MenuItem>
            <MenuItem value="assembly">House of Assembly</MenuItem>
          </Select>
        </FormControl>

        {election && (
          <Box>
            <Stats title={election} />

            <Box component="form">
              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel id="select-candidate">Candidates</FormLabel>
                <RadioGroup
                  aria-labelledby="select-candidate"
                  name="candidates"
                  // value={value}
                  // onChange={handleChange}
                >
                  <FormControlLabel
                    value="Obaseki Godwin"
                    control={<Radio />}
                    label="Obaseki Godwin"
                  />
                  <FormControlLabel
                    value="Festus Alenkhe"
                    control={<Radio />}
                    label="Festus Alenkhe"
                  />
                  <FormControlLabel
                    value="Sydney Shocker"
                    control={<Radio />}
                    label="Sydney Shocker"
                  />
                  <FormControlLabel
                    value="Queen Idia"
                    control={<Radio />}
                    label="Queen Idia"
                  />
                </RadioGroup>
              </FormControl>

              <Button type="submit" variant="contained">
                Cast vote
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
