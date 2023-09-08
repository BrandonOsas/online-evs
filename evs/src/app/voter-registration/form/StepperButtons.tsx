import { resetData, saveAuthUser } from "@/redux/features/account";
import { handleBack, handleNext, handleReset } from "@/redux/features/stepper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Button } from "@mui/material";
import { ref, set } from "firebase/database";
import { auth, database } from "../../../../firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { NextLinkComposed } from "@/components/Link";


export default function StepperButtons() {
  const activeStep = useAppSelector((state) => state.stepper.activeStep);
  const steps = useAppSelector((state) => state.stepper.steps);
  const { data, token } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const actionCodeSettings = {
    // url: "http://localhost:3000/2FA-authentication",
    url: "http://online-evs.vercel.app/portal",
    handleCodeInApp: false,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button
        component={NextLinkComposed}
        variant="contained"
        color="error"
        to="/portal"
        sx={{ mr: 1 }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={async () => {
          dispatch(handleReset());
          await dispatch(resetData());
        }}
        sx={{ mr: 1 }}
      >
        Reset
      </Button>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={() => {
          dispatch(handleBack());
        }}
        sx={{ mr: 1 }}
      >
        Back
      </Button>

      <Box sx={{ flex: "1 1 auto" }} />
      <Button
        variant="contained"
        type={activeStep === steps.length - 1 ? "button" : "submit"}
        onClick={() => {
          if (activeStep === steps.length - 1) dispatch(handleNext());

          // Save and create user credentials and send email verification link
          if (activeStep === 2) {
            // Create user auth credentials
            createUserWithEmailAndPassword(
              auth,
              data.email,
              token.password
            ).then(async (credential) => {
              updateProfile(credential.user, {
                displayName: data.lastname + " " + data.firstname,
              })
                .then(() => {
                  // Profile updated!
                  // ...
                })
                .catch((error) => {
                  // An error occurred
                  // ...
                });
              dispatch(saveAuthUser(credential.user));

              // Save user to firebase database
              set(ref(database, "voters/" + credential.user.uid), {
                idType: token.type,
                idToken: token.code,
                ...data,
              });

              await sendEmailVerification(credential.user, actionCodeSettings);
            });
            dispatch(handleNext());
          }
        }}
      >
        {activeStep === steps.length - 1 ? "submit" : "next"}
      </Button>
    </Box>
  );
}
