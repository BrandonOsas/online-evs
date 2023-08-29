"use client";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import {
  signInWithEmailAndPassword,
  multiFactor,
  PhoneAuthProvider,
  RecaptchaVerifier,
  PhoneMultiFactorGenerator,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "../../../firebase.config";
import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";

export default function PhoneVerification() {
  const { phone: phoneNumber, email } = useAppSelector(
    (state) => state.account.data
  );
  const { password } = useAppSelector((state) => state.account.token);
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Initialize user state

  useEffect(() => {
    // Sign in when component mounts
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }, [email, password]);

  const handleStartVerification = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container-id",
        {
          size: "invisible",
        }
      );

      const multiFactorSession = await multiFactor(user!).getSession();

      try {
        const phoneInfoOptions = {
          phoneNumber: phoneNumber,
          session: multiFactorSession,
        };

        const verificationId = await new PhoneAuthProvider(
          auth
        ).verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
      } catch (error) {
        console.log(error);
      }


      setVerificationId(verificationId);
      setIsFinished(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFinishVerification = async () => {
    try {
      const userCred = await reauthenticateWithCredential(
        user!,
        EmailAuthProvider.credential(email, password)
      );

      if (verificationId && verificationCode) {
        const cred = PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );

        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

        await multiFactor(userCred.user).enroll(
          multiFactorAssertion,
          "Primary phone number"
        );

        // After successful enrollment, you can navigate to the desired page
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box px={3} py={15}>
      <Typography variant="h6">Finish Account Setup</Typography>
      <Typography variant="subtitle1">
        Enable Two Factor authentication
      </Typography>

      <Box py={15}>
        <Box id="recaptcha-container-id"></Box>

        {!isFinished && (
          <Box py={3} gap={2}>
            <Typography>
              Click on the button below to enable and register two-factor
              authentication with your registered phone number. Please note that
              standard charges may apply for the cost of SMS.
            </Typography>

            <Button
              type="button"
              variant="contained"
              color="inherit"
              onClick={handleStartVerification}
            >
              Enable
            </Button>
          </Box>
        )}

        {isFinished && (
          <Box py={3}>
            <Typography>
              A one-time password has been sent to your registered phone number
              via SMS (standard rates apply). Please enter it below to be
              eligible to vote.
            </Typography>

            <Box
              py={3}
              component="form"
              display="flex"
              gap={2}
              onSubmit={(e) => {
                e.preventDefault();
                handleFinishVerification();
                console.log("this function runs");
              }}
            >
              <FormControl>
                <TextField
                  label="Enter OTP"
                  size="small"
                  id="otp"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                  }}
                />
              </FormControl>

              <Button type="submit" variant="contained" color="inherit">
                Continue
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
