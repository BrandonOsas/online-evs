"use client"
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { stateData } from "@/data/statesData";
import { electionTypes } from "@/data/types";
import * as yup from "yup";
import { useFormik } from "formik";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { set, ref } from "firebase/database";
import { database } from "../../../firebase.config";

interface CandidateProps {
  name: string;
  party: string;
}

interface TimeProps {
  from: string;
  to: string;
}

export interface ValuesProps {
  type: string;
  state: string;
  lga: string;
  candidates: CandidateProps[];
  date: string;
  time: TimeProps;
}

const initialValues: ValuesProps = {
  type: "",
  state: "",
  lga: "All",
  candidates: [],
  date: "",
  time: { from: "", to: "" },
};

const validationSchema = yup.object({
  type: yup.string().required(),
  state: yup.string().required(),
  lga: yup.string(),
  candidates: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Candidate name is required"),
        party: yup.string().required("Party name is required"),
      })
    )
    .required("At least two candidate is required"),
  date: yup.string().required("Date is required"),
  time: yup.object().shape({
    from: yup.string().required("Start time is required"),
    to: yup.string().required("End time is required"),
  }),
});

const getElectionId = (type: string, state: string, date: string): string => {
  const stateCode = stateData.find((value) => value.name === state)?.code;
  let id = "";

  switch (type) {
    case "Presidential":
      id = `npe${new Date(date).getFullYear()}`;
      break;
    case "National/House of Senate":
      id = `nhs${new Date(date).getFullYear()}`;
      break;
    case "House of Representatives":
      id = `nhr${new Date(date).getFullYear()}`;
      break;
    case "Governorship":
      id = `${stateCode?.toLowerCase()}gov${new Date(date).getFullYear()}`;
      break;
    case "State/House of Assembly":
      id = `${stateCode?.toLowerCase()}ha${new Date(date).getFullYear()}`;
      break;
    case "Local Government":
      id = `${stateCode?.toLowerCase()}lga${new Date(date).getFullYear()}`;
      break;
    default:
      id = Math.random().toString();
  }

  return id;
};

export default function NewElection() {
  const lgRef = useRef<{ lga: string[] }>({ lga: [] });
  const [numCandidates, setNumCandidates] = useState(2);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      const id = getElectionId(values.type, values.state, values.date);

      set(ref(database, `elections/upcoming/${id}`), values);
    },
  });

  useEffect(() => {
    lgRef.current.lga = stateData.find(
      (state) => state.name === formik.values.state
    )?.lgas!;
  }, [formik.values.state]);

  return (
    <Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ maxWidth: { sm: "50%", md: "30%" } }}
      >
        <Typography variant="h6">Election</Typography>

        <Box py={2}>
          <FormControl fullWidth>
            <InputLabel id="election-type-label">Election Type</InputLabel>
            <Select
              labelId="election-type-label"
              name="type"
              value={formik.values.type}
              label="Election Type"
              onChange={formik.handleChange}
            >
              {electionTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box py={2}>
          <FormControl fullWidth>
            <InputLabel id="state-label">Choose State</InputLabel>
            <Select
              labelId="state-label"
              name="state"
              value={formik.values.state}
              label="Choose State"
              onChange={formik.handleChange}
            >
              {stateData.map((state, index) => (
                <MenuItem key={index} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box py={2}>
          <FormControl fullWidth>
            <InputLabel id="lga-label">Choose LGA</InputLabel>
            <Select
              labelId="lga-label"
              name="lga"
              value={formik.values.lga}
              label="Choose LGA"
              onChange={formik.handleChange}
              disabled={formik.values.type !== "Local Government"}
            >
              {lgRef.current.lga?.map((lga, index) => (
                <MenuItem key={index} value={lga}>
                  {lga}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box py={4}>
          <Typography variant="h6">Candidates</Typography>

          {[...Array(numCandidates)].map((_, index) => (
            <Box
              key={index}
              py={2}
              display="flex"
              gap={2}
              id={`candidate${index + 1}`}
            >
              <FormControl>
                <TextField
                  name={`candidates[${index}].name`}
                  label={`Candidate ${index + 1}`}
                  value={formik.values.candidates[index]?.name || ""}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  name={`candidates[${index}].party`}
                  label="Party"
                  value={formik.values.candidates[index]?.party || ""}
                  onChange={formik.handleChange}
                />
              </FormControl>
              {index > 1 && (
                <IconButton
                  aria-label="Remove"
                  onClick={() => setNumCandidates(numCandidates - 1)}
                >
                  <RemoveCircleIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button
            variant="contained"
            color="inherit"
            name="add-candidate"
            onClick={() => setNumCandidates(numCandidates + 1)}
          >
            Add Field
          </Button>
        </Box>

        <Box py={4}>
          <Typography variant="h6">Date &amp; Time</Typography>

          <Box py={2}>
            <FormControl fullWidth>
              <TextField
                type="date"
                name="date"
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.date}
                onChange={formik.handleChange}
              />
            </FormControl>
          </Box>

          <Box py={2} display="flex" gap={2}>
            <FormControl fullWidth>
              <TextField
                label="From"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                name="time.from"
                value={formik.values.time.from}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="To"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                name="time.to"
                value={formik.values.time.to}
                onChange={formik.handleChange}
              />
            </FormControl>
          </Box>
        </Box>

        <Button type="submit" variant="contained" fullWidth>
          submit election schedule
        </Button>
      </Box>
    </Box>
  );
}
