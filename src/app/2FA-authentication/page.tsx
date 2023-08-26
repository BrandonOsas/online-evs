"use client";
import { Box, Button, Typography } from "@mui/material";
import {
  signInWithEmailAndPassword,
  multiFactor,
  PhoneAuthProvider,
  RecaptchaVerifier,
  User,
} from "firebase/auth";
import { auth } from "../../../firebase.config";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { NextLinkComposed } from "@/components/Link";

export default function PhoneVerification() {
  const { phone: phoneNumber, email } = useAppSelector((state) => state.account.data);
  const { password } = useAppSelector(
    (state) => state.account.token
  );
  const [verificationId, setVerificationId] = useState("");
  let user: User;
  const phoneAuthProvider = new PhoneAuthProvider(auth);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });

  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container-id",
    {
      size: "invisible",
    }
  );

  // Request SMS verification code and complete enrollment
  const handleVerification = async () => {
    try {
      const multiFactorSession = await multiFactor(user).getSession();

      const phoneInfoOptions = {
        phoneNumber: phoneNumber,
        session: multiFactorSession,
      };

      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        phoneInfoOptions,
        recaptchaVerifier
      );

      setVerificationId(verificationId);
    } catch (error) {
      // Handle any errors that occur during this process
      console.error("Error:", error);
    }
  };

  return (
    <Box px={3} py={15}>
      <Typography variant="h6">Finish Account Setup</Typography>
      <Typography variant="subtitle1">
        Enable two factor authentication
      </Typography>

      <Box py={15}>
        <Box id="recaptcha-container-id"></Box>

        <Box py={3} gap={2}>
          <Typography>
            Click on the button below to enable and register two factor
            authentication with your registered phone number. Please note that
            standard charges may apply for the cost of SMS.
          </Typography>

          <Button
            component={NextLinkComposed}
            to={`/2FA-authentication/verify-phone?verificationId=${verificationId}`}
            type="button"
            variant="contained"
            color="inherit"
            onClick={handleVerification}
          >
            Enable
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
