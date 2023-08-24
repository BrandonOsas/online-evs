"use client";
import * as yup from "yup";
import { useFormik } from "formik";
import PersonalData from "./PersonalData";
import PollingUnit from "./PollingUnit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleNext, setFormValidity } from "@/redux/features/stepper";
import FormStructure from "./FormStructure";
import { saveData } from "@/redux/features/account";


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
  const data = useAppSelector(state => state.account.data)
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: data ? data : initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (values) {
        dispatch(setFormValidity(true));
      }
      console.log({ personalDetails: values });
      // save user data in redux store
      dispatch(saveData({...values, country: data.country}));
      // action button to next step
      dispatch(handleNext());
    },
  });

  return (
    <FormStructure handleSubmit={formik.handleSubmit}>
      <PersonalData formik={formik} />
      <PollingUnit formik={formik} />
    </FormStructure>
  );
}
