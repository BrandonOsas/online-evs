import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

export default function Biometrics() {
  return (
    <Box py={3} px={10}>
      <Box
        component="form"
        // onSubmit={formik.handleSubmit}
      >
        <Box component="fieldset" border={0.2} borderColor="lightgray" padding={3}>
          <Typography
            component="legend"
            variant="overline"
            fontSize={14}
            fontWeight="bold"
            color="GrayText"
          >
            Use BVN
          </Typography>

          <Box display="flex" gap={2} justifyContent="center">
            <FormControl>
              <TextField
                label="Enter 10 digits BVN"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <Button variant="contained">Verify BVN</Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mt:3, mb: 2 }}>
        <Chip label="OR" />
      </Divider>

      <Box
        component="form"
        // onSubmit={formik.handleSubmit}
      >
        <Box component="fieldset" border={0.2} borderColor="lightgray" padding={3}>
          <Typography
            component="legend"
            variant="overline"
            fontSize={14}
            fontWeight="bold"
            color="GrayText"
          >
            Use NIN
          </Typography>

          <Box display="flex" gap={2} justifyContent="center">
            <FormControl>
              <TextField
                label="Enter 10 digits NIN"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <Button variant="contained">Verify NIN</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
