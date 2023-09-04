import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { ReactNode } from "react";

interface ButtonProps extends MuiButtonProps {
  label: string;
  icon?: ReactNode;
  isLoading?: boolean;
  isLoadingText?: string;
}

export default function LoadingButton({
  label,
  icon,
  isLoading,
  isLoadingText = "Loading...",
  ...rest
}: ButtonProps) {
  return (
    <MuiButton
      startIcon={
        isLoading ? (
          <CircularProgress sx={{ color: "white" }} size={20} thickness={2} />
        ) : (
          icon
        )
      }
      {...rest}
    >
      {isLoading ? isLoadingText : label}
    </MuiButton>
  );
}
