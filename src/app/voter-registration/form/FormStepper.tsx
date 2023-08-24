import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Biometrics from "./Biometrics";
import Review from "./Review";
import VoterInformation from "./VoterInformation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { NextLinkComposed } from "../../../components/Link";

export default function FormStepper() {
  const activeStep = useAppSelector((state) => state.stepper.activeStep);
  const steps = useAppSelector((state) => state.stepper.steps);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const subtitles = [
            "Give us some information about yourself",
            "Secure your vote",
            "Time to finish up!",
          ];
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {
            optional: (
              <Typography variant="caption">{subtitles[index]}</Typography>
            ),
          };
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button component={NextLinkComposed} to="/portal">
              Return to Portal
            </Button>
          </Box>
        </React.Fragment>
      )}

      {activeStep !== steps.length && (
        <React.Fragment>
          {activeStep === 0 && <VoterInformation />}
          {activeStep === 1 && <Biometrics />}
          {activeStep === 2 && <Review />}
        </React.Fragment>
      )}
    </Box>
  );
}
