"use client";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { saveCountry } from "@/redux/features/account";

export default function CountryPicker({children}: any) {

   const { country } = useAppSelector((state) => state.account.data);
   const dispatch = useAppDispatch();

   const handleChange = (event: SelectChangeEvent) => {
     // setCountry(event.target.value);
     dispatch(saveCountry(event.target.value));
   };
  return (
    <Box
      mt={10}
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignContent="center"
      gap={2}
    >
      <FormControl variant="outlined" sx={{ minWidth: 300 }}>
        <InputLabel id="select-country-label">
          Please choose a country
        </InputLabel>
        <Select
          labelId="select-country-label"
          id="select-country"
          value={country}
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

      {children}
    </Box>
  );
}
