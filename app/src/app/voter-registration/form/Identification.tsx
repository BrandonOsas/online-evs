"use client"
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import FormStructure from "./FormStructure";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleNext, setFormValidity } from "@/redux/features/stepper";
import { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { auth, database } from "../../../../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { saveToken } from "@/redux/features/account";

type ids = "bvn" | "nin";

interface BasicInfo {
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: string;
}

interface CheckingState {
  bvn: boolean;
  nin: boolean;
}

const initialValues = {
  id: "",
  password: "",
};

const validationSchema = yup.object({
  id: yup
    .string()
    .min(11, "BVN/NIN must be 11 numbers  long")
    .required(
      "Please enter either your BVN or NIN to validate your voter eligibility status"
    ),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("You must set a password to continue"),
});

export default function Identification() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.account.data);
  const [identityInfo, setIdentityInfo] = useState<BasicInfo>();
  const [idType, setIdType] = useState<ids | string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState<CheckingState>({
    bvn: false,
    nin: false,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, showVerificationStatus] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (values) {
        dispatch(setFormValidity(true));
      }
      // save bvn/nin and password
      dispatch(
        saveToken({
          code: +formik.values.id,
          password: formik.values.password,
          type: idType,
        })
      );
      console.log(values)
      dispatch(handleNext());
    },
  });

  useEffect(() => {
    onValue(ref(database, "/tokens"), (snapshot) => {
      let token: BasicInfo;
      const data = snapshot.val();

      if (formik.values.id) {
        if (idType === "bvn") {
          token = data.find(
            (item: any) => item.bvn.toString() === formik.values.id
          );
        } else {
          token = data.find(
            (item: any) => item.nin.toString() === formik.values.id
          );
        }

        setIdentityInfo(token);
      }
    });
  }, [formik.values.id, idType]);

  const handleVerification = (type: ids) => {
    if (identityInfo) {
      if (
        identityInfo.firstname === data.firstname &&
        identityInfo.lastname === data.lastname &&
        identityInfo.gender.toLowerCase() === data.gender
      ) {
        setIsVerified(true);
      }
    }
    setIsChecking({ bvn: false, nin: false });
    showVerificationStatus(true);
  };

  return (
    <FormStructure handleSubmit={formik.handleSubmit}>
      <Box px={10}>
        <Box
          component="fieldset"
          border={0.2}
          borderColor="lightgray"
          padding={3}
        >
          <Typography
            component="legend"
            variant="overline"
            fontSize={14}
            fontWeight="bold"
            color="GrayText"
          >
            Select Identification Method
          </Typography>

          <Box display="flex" gap={2} justifyContent="center">
            <FormControl>
              <TextField
                label="Enter 10 digits BVN"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                name="id"
                onChange={(e) => {
                  if (e.target.value) {
                    setIdType("bvn");
                  } else {
                    setIdType("");

                    setIsVerified(false);
                    showVerificationStatus(false);
                  }
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                disabled={idType === "nin"}
              />
            </FormControl>

            <Button
              variant="contained"
              color="success"
              size="small"
              disabled={idType === "nin"}
              onClick={() => {
                setIsChecking({ bvn: true, nin: false });
                handleVerification("bvn");
                console.log(identityInfo);
              }}
              startIcon={
                isChecking.bvn ? (
                  <CircularProgress
                    sx={{ color: "white" }}
                    size={20}
                    thickness={5}
                  />
                ) : null
              }
            >
              {isChecking.bvn ? "Checking" : "Verify BVN"}
            </Button>
          </Box>

          <Divider sx={{ mt: 3, mb: 2 }}>
            <Chip label="OR" />
          </Divider>

          <Box display="flex" gap={2} justifyContent="center">
            <FormControl>
              <TextField
                label="Enter 10 digits NIN"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                name="id"
                onChange={(e) => {
                  if (e.target.value) {
                    setIdType("nin");
                  } else {
                    setIdType("");
                    setIsVerified(false);
                    showVerificationStatus(false);
                  }
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                disabled={idType === "bvn"}
              />
            </FormControl>

            <Button
              variant="contained"
              color="success"
              size="small"
              disabled={idType === "bvn"}
              onClick={() => {
                setIsChecking({ bvn: false, nin: true });
                handleVerification("nin");
                console.log(identityInfo);
              }}
            >
              Verify NIN
            </Button>
          </Box>
        </Box>
        {formik.touched.id && formik.errors.id && (
          <FormHelperText error>{formik.errors.id}</FormHelperText>
        )}

        {verificationStatus && (
          <Box>
            <Alert severity={isVerified ? "success" : "error"}>
              <AlertTitle>
                {isVerified
                  ? "Identification Match Completed"
                  : "No Record Found"}
              </AlertTitle>
              {isVerified ? (
                <p>
                  Congratulations —{" "}
                  <strong>
                    {`${identityInfo?.lastname} with ${idType?.toUpperCase()} ${
                      formik.values.id
                    }. `}{" "}
                  </strong>{" "}
                  You&apos;re eligible to proceed. Please continue to choose
                  password.
                </p>
              ) : (
                <p>
                  Oops! We couldn&apos;t find any record for the <strong>{idType?.toUpperCase()} number provided.</strong> Check and try again.
                </p>
              )}
            </Alert>
          </Box>
        )}

        {/* Show Password only when user is verified */}
        {isVerified && (
          <Box py={5} width="70%">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="passwordEl">Choose Password</InputLabel>
              <OutlinedInput
                id="passwordEl"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label=" Choose Password"
              />
            </FormControl>
            {formik.touched.password && formik.errors.password && (
              <FormHelperText error>{formik.errors.password}</FormHelperText>
            )}
          </Box>
        )}
      </Box>
    </FormStructure>
  );
}
