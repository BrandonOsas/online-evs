"use client";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

export default function Home() {
  const [age, setAge] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <main>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          marginY: "25vh",
        }}
      >
        <Box>
          <Typography variant="overline" fontWeight="bold" color="GrayText">Welcome to</Typography>
          <Typography variant="h4" textTransform="uppercase" fontWeight="bold" color="primary">
            Electoral Voting System (evs)
          </Typography>

          <Box mt={10} display="flex" alignContent="center" gap={2}>
            <FormControl variant="outlined" sx={{ minWidth: 300 }}>
              <InputLabel id="select-country-label">
                Please choose a country
              </InputLabel>
              <Select
                labelId="select-country-label"
                id="select-country"
                value={age}
                label="Please choose a country"
                onChange={handleChange}
              >
                <MenuItem value="Nigeria">Nigeria</MenuItem>
                <MenuItem value="Ghana">Ghana</MenuItem>
                <MenuItem value="Cote d'Ivoire">Cote d&apos;Ivoire</MenuItem>
                <MenuItem value="Gambia">Gambia</MenuItem>
                <MenuItem value="Mali">Mali</MenuItem>
                <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained">Go to Portal</Button>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
