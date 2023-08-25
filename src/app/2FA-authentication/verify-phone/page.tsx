"use client"
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import {
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../../../../firebase.config";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { NextLinkComposed } from "@/components/Link";

export default function PhoneVerification() {
  const { phone: phoneNumber } = useAppSelector((state) => state.account.data);
  const [verificationCode, setVerificationCode] = useState("");
  const user = auth.currentUser!;

  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container-id",
    { size: "invisible" }
  );

  multiFactor(user)
    .getSession()
    .then(function (multiFactorSession) {
      // Specify the phone number and pass the MFA session.
      const phoneInfoOptions = {
        phoneNumber: phoneNumber,
        session: multiFactorSession,
      };

      const phoneAuthProvider = new PhoneAuthProvider(auth);

      // Send SMS verification code.
      return phoneAuthProvider.verifyPhoneNumber(
        phoneInfoOptions,
        recaptchaVerifier
      );
    })
    .then(function (verificationId) {
      // Ask user for the verification code. Then:
      const cred = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      // Complete enrollment.
      return multiFactor(user).enroll(
        multiFactorAssertion,
        "Primary phone number"
      );
    });

  return (
    <Box px={3} py={15}>
      <Typography variant="h6">Two Factor Authentication</Typography>

      <Box py={15}>
        <Typography>
          A one time password has been sent to your registered phone number via
          SMS (standard rates apply). Please enter it below to be eligible to
          vote.
        </Typography>

        <Box id="recaptcha-container-id"></Box>

        <Box
          py={3}
          component="form"
          display="flex"
          gap={2}
          onSubmit={(e) => {
            e.preventDefault();
            // setVerificationCode(e.target.value);
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

          <Button component={NextLinkComposed} type="button" to="/portal" variant="contained" color="inherit"  >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
