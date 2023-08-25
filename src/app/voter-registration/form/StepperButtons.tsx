import { resetData } from "@/redux/features/account";
import { handleBack, handleNext, handleReset } from "@/redux/features/stepper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Button } from "@mui/material";
import { ref, set } from "firebase/database";
import { auth, database } from "../../../../firebase.config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const actionCodeSettings = {
  url: "https://online-evs.vercel.app/2FA-authentication/verify-phone",
  handleCodeInApp: false,
};

export default function StepperButtons() {
  const activeStep = useAppSelector((state) => state.stepper.activeStep);
  const steps = useAppSelector((state) => state.stepper.steps);
  const { data, token } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
      <Button
        color="inherit"
        onClick={async () => {
          dispatch(handleReset());
          await dispatch(resetData());
        }}
        sx={{ mr: 1 }}
      >
        Clear Form Data
      </Button>

      <Box sx={{ flex: "1 1 auto" }} />
      <Button
        variant="contained"
        type={activeStep === steps.length - 1 ? "button" : "submit"}
        onClick={() => {
          if (activeStep === steps.length - 1) dispatch(handleNext());

          // Save and create user credentials and send email verification link
          if (activeStep === 2) {
            // Save user to firebase database
            set(ref(database, "voters/" + token.code), {
              idType: token.type,
              ...data,
            });
            // Create user auth credentials
            createUserWithEmailAndPassword(
              auth,
              data.email,
              token.password
            ).then(async (credential) => {
              console.log(credential.user);

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
