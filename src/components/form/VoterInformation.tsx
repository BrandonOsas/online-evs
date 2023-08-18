"use client";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import PersonalData from "./PersonalData";
import PollingUnit from "./PollingUnit";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  birthdate: "",
  street: "",
  city: "",
  state: "",
  gender: "",
  occupation: "",
  lgao: "",
  lgar: "",
  phone: "",
  hometown: "",
  regarea: "",
  pu: "",
};

const validationSchema = yup.object({
  firstname: yup.string().required("First name cannot be empty!"),
  lastname: yup.string().required("Last name cannot be empty!"),
  street: yup.string().required("Street cannot be empty!"),
  city: yup.string().required("City cannot be empty!"),
  state: yup.string().required("State cannot be empty!"),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Email cannot be empty!"),
  phone: yup.string().max(15).required("Phone number cannot be empty!"),
  birthdate: yup.date().required("Date of birth cannot be empty!"),
  gender: yup.string().required("Please select a gender option"),
  occupation: yup.string().required("Occupation cannot be empty."),
  lgao: yup.string().required("LGA of Origin cannot be empty."),
  lgar: yup.string().required("LGA of Residence cannot be empty."),
  hometown: yup.string(),
  regarea: yup.string().required("RA cannot be empty."),
  pu: yup.string().required("PU cannot be empty."),
});

export default function VoterInformation() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log({ personalDetails: values });
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} padding={3}>
      <PersonalData formik={formik} />
      <PollingUnit formik={formik} />
    </Box>
  );
}
