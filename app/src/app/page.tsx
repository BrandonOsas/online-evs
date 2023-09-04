"use client";
import { Box, Button, Typography } from "@mui/material";
import { NextLinkComposed } from "@/components/Link";
import CountryPicker from "./portal/CountryPicker";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/LoadingButton";
import { ArrowForwardIos } from "@mui/icons-material";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    void router.push("/portal");
    setIsLoading(false);
  };
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
            <LoadingButton
              variant="contained"
              label="Go to Portal"
              isLoading={isLoading}
              isLoadingText="Loading Portal"
              onClick={() => {
                setIsLoading(true);
                handleClick()
              }}
              icon={<ArrowForwardIos/>}
            />
          </CountryPicker>
        </Box>
      </Box>
    </main>
  );
}
