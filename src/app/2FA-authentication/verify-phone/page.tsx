"use client";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import {
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
} from "firebase/auth";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { NextLinkComposed } from "@/components/Link";
import { useSearchParams } from "next/navigation";

export default function PhoneVerification() {
  const searchParams = useSearchParams();
  const verificationId = searchParams.get("verificationId");
  const [verificationCode, setVerificationCode] = useState("");
  const user = useAppSelector(state => state.account.user)!;

  // Request SMS verification code and complete enrollment
  const handleVerification = async () => {
    try {
      // You should check if `verificationCode` is not empty before proceeding
      if (verificationId && verificationCode) {
        const cred = PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );

        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

        await multiFactor(user).enroll(
          multiFactorAssertion,
          "Primary phone number"
        );
      }

      // After successful enrollment, you can navigate to the desired page
    } catch (error) {
      // Handle any errors that occur during this process
      console.error("Error:", error);
    }
  };

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

          <Button
            component={NextLinkComposed}
            type="button"
            to="/portal"
            variant="contained"
            color="inherit"
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
