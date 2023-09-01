import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";

export default function TopBar() {
  return (
    <Box mb={0} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online EVS Admin Portal
          </Typography>
          <Button color="inherit" onClick={() => {
            signOut(auth)
          }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
