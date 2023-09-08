import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { FormEvent, useRef } from "react";

interface CodeProps {
  getCode: (code: string) => void;
}

export default function Code({ getCode }: CodeProps) {
  const enteredCode = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (enteredCode.current) {
      getCode(enteredCode.current.value);
    }
  };

  return (
    <Box py={3}>
      <Typography>
        A one-time password has been sent to your registered phone number via
        SMS (standard rates apply). Please enter it below to be eligible to
        vote.
      </Typography>

      <Box
        py={3}
        component="form"
        display="flex"
        gap={2}
        onSubmit={handleSubmit}
      >
        <FormControl>
          <TextField
            ref={enteredCode}
            label="Enter Code"
            size="small"
            id="otp"
          />
        </FormControl>

        <Button type="submit" variant="contained" color="inherit">
          Continue
        </Button>
      </Box>
    </Box>
  );
}
