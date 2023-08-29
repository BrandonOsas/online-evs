import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepperState {
  activeStep: number;
  steps: string[];
  formIsValid: boolean;
}

const initialState: StepperState = {
  activeStep: 0,
  steps: ["Voter Information", "Biometrics Identification", "Review"],
  formIsValid: false,
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    handleBack(state) {
      state.activeStep = state.activeStep - 1;
    },
    handleNext(state) {
      if (state.formIsValid) {
        state.activeStep = state.activeStep + 1;
      }
    },
    handleReset(state) {
      state.activeStep = 0;
    },
    setFormValidity(state, action: PayloadAction<boolean>) {
      state.formIsValid = action.payload;
    },
  },
});

export const { handleBack, handleNext, handleReset, setFormValidity } =
  stepperSlice.actions;

export default stepperSlice.reducer;
