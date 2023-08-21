import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import FormStructure from "./FormStructure";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "@/redux/hooks";
import { handleNext, setFormValidity } from "@/redux/features/stepper";
import { saveToken } from "@/redux/features/account";

const initialValues = {
  bvn: "",
  nin: "",
};

const validationSchema = yup.object({
  bvn: yup.number().min(11),
  nin: yup.number().min(11),
});

export default function Biometrics() {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (values) {
        dispatch(setFormValidity(true));
      }
      console.log({ personalDetails: values });
      // save bvn/nin and password
      if (values.bvn) {
        dispatch(saveToken({code: +values.bvn, password: "123456", type: "bvn"}))
      } else {
        dispatch(
          saveToken({ code: +values.nin, password: "123456", type: "nin" })
        );
      }
      dispatch(handleNext());
    },
  });

  return (
    <FormStructure handleSubmit={formik.handleSubmit}>
      <Box px={10}>
        <Box
          component="fieldset"
          border={0.2}
          borderColor="lightgray"
          padding={3}
        >
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
                name="bvn"
            value={formik.values.bvn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bvn && formik.errors.bvn && (
            <FormHelperText error>{formik.errors.bvn}</FormHelperText>
          )}
            </FormControl>

            <Button variant="contained">Verify BVN</Button>
          </Box>
        </Box>

        <Divider sx={{ mt: 3, mb: 2 }}>
          <Chip label="OR" />
        </Divider>

        <Box
          component="fieldset"
          border={0.2}
          borderColor="lightgray"
          padding={3}
        >
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
                name="nin"
                value={formik.values.nin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nin && formik.errors.nin && (
                <FormHelperText error>
                  {formik.errors.nin}
                </FormHelperText>
              )}
            </FormControl>

            <Button variant="contained">Verify NIN</Button>
          </Box>
        </Box>
      </Box>
    </FormStructure>
  );
}
