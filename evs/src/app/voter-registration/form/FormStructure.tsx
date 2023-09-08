import { Box } from "@mui/material";
import { ReactNode } from "react";
import StepperButtons from "./StepperButtons";

interface FormStructureProps {
  handleSubmit: (args: any) => void;
  children: ReactNode;
}

export default function FormStructure({
  handleSubmit,
  children,
}: FormStructureProps) {
  return (
    <Box component="form" onSubmit={handleSubmit} padding={3}>
      {children}
      <StepperButtons />
    </Box>
  );
}
