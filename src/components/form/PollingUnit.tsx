import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";

export default function PollingUnit({ formik }: any) {
  return (
    <Box
      component="fieldset"
      border={0.2}
      borderColor="lightgray"
      mt={5}
      py={4}
      px={2}
    >
      <Box component="legend" color="GrayText" fontSize={14}>
        Polling Unit
      </Box>

      <Box px={2}>
        <Box display="flex" gap={1} pb={2}>
          <FormControl fullWidth>
            <TextField
              label="State"
              size="small"
              defaultValue={formik.values.state}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="LGA"
              variant="outlined"
              size="small"
              defaultValue={formik.values.lgar}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Registration Area"
              name="regarea"
              variant="outlined"
              size="small"
              value={formik.values.regarea}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.regarea && formik.errors.regarea && (
              <FormHelperText>{formik.errors.regarea}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <FormControl fullWidth>
          <TextField
            label="Polling Unit"
            name="pu"
            variant="outlined"
            size="small"
            value={formik.values.pu}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.pu && formik.errors.pu && (
            <FormHelperText>{formik.errors.pu}</FormHelperText>
          )}
        </FormControl>
      </Box>
    </Box>
  );
}
