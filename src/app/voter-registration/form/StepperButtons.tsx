import { handleBack, handleNext } from "@/redux/features/stepper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Button } from "@mui/material";

export default function StepperButtons() {
  const activeStep = useAppSelector((state) => state.stepper.activeStep);
  const steps = useAppSelector((state) => state.stepper.steps);
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
      <Box sx={{ flex: "1 1 auto" }} />
      <Button
        variant="contained"
        type={activeStep === steps.length - 1 ? "button" : "submit"}
        onClick={() => {
          if (activeStep === steps.length - 1) dispatch(handleNext())
        }}
      >
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </Box>
  );
}
