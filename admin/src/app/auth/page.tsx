"use client";
// import { useAppDispatch } from "@/redux/hooks";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { auth, database } from "../../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, child, get } from "firebase/database";


const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function SignIn() {
  // const dispatch = useAppDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);

        // Sign in as regular user
        await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        ).then((userCredential) => {
          const user = userCredential.user;
          // if user exists, check if user has an admin email
          get(child(ref(database), "admins/"))
            .then((snapshot) => {
              if (snapshot.exists()) {
                console.log(snapshot.val());

                const admins: { email: string; }[] = snapshot.val();

                if (admins.filter(admin => admin.email === user.email)) {
                  router.push("/");
                }

              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });

        });
      } catch (error) {
        // Handle the error here, e.g., show an error message
        console.error("Error during redirection:", error);
      }
    },
  });
  return (
    <Box
      px={2}
      my="25%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
        <Typography variant="h4">Sign In</Typography>
        <Typography fontSize={13}>
          Please use the identification registered during account setup
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        width="50%"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <FormControl fullWidth>
          <TextField
            label="Email"
            size="small"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormHelperText>
            {formik.errors.email && formik.errors.email}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Password"
            size="small"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <Button type="submit" variant="contained" sx={{ my: 3 }}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
}
