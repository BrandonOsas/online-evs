"use client";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { NextLinkComposed } from "@/components/Link";
import CountryPicker from "./portal/CountryPicker";

export default function Home() {
  return (
    <main>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={5}
        sx={{
          marginY: "25vh",
        }}
      >
        <Box>
          <Typography variant="overline" fontWeight="bold" color="GrayText">
            Welcome to
          </Typography>
          <Typography
            variant="h4"
            textTransform="uppercase"
            fontWeight="bold"
            color="primary"
          >
            Online Electoral Voting System (evs)
          </Typography>

          <CountryPicker>
            <Button
              component={NextLinkComposed}
              variant="contained"
              to="/portal"
            >
              Go to Portal
            </Button>
          </CountryPicker>
        </Box>
      </Box>
    </main>
  );
}
