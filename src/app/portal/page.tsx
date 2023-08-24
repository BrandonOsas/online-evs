"use client";
import PortalAction from "@/app/portal/PortalAction";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Divider, Typography } from "@mui/material";
import CountryPicker from "./CountryPicker";

export default function Portal() {
  const { country } = useAppSelector((state) => state.account.data);
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxWidth={{ xs: "100%", sm: "85%", md: "55%" }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          py={0.3}
        >
          <Typography>Selected country: {country}</Typography>
          <Button variant="contained" size="small">Change</Button>
        </Box>

        <Box py={3}>
          <Typography variant="h4" textTransform="uppercase">
            online evs portal
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            Please choose an action below to continue.
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={5} px={3} py={5}>
          <PortalAction
            title="Voter Registration"
            desc="To be eligible to vote, create an account to fully register as a voter."
            btnText="Register"
            href="/voter-registration"
          />
          <PortalAction
            title="Voting"
            desc="During any election in your unit, follow the link to cast your vote."
            btnText="Vote for a candidate"
            href="/voting"
          />
          <PortalAction
            title="Election Results"
            desc="Click the button below to view Election results"
            btnText="View"
            href="/election-results"
          />
          <PortalAction
            title="Information Center"
            desc="Read FAQs and get answers to questions about election procedures on election day. Stay informed because each of us is responsible for the governace of the country."
            btnText="Read Articles"
            href="/information-center"
          />
        </Box>
      </Box>
    </Box>
  );
}
