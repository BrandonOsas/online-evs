import PortalAction from "@/components/PortalAction";
import { Box, Divider, Typography } from "@mui/material";

export default function Portal() {
  return (
    <Box>
      <Box display="flex" justifyContent="right" gap={2} py={0.3}>
        <Typography fontSize={11}>
          <b>Region</b>: West Africa
        </Typography>
        <Typography fontSize={11}>
          <b>Country</b>: Nigeria
        </Typography>
      </Box>
      <Divider />

      <Box display="flex" flexDirection="column" gap={2} px={3} py={5}>
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
  );
}
