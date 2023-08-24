import { Box, Button, Typography } from "@mui/material";
import { NextLinkComposed } from "../../components/Link";

export default function PortalAction({
  title,
  desc,
  btnText,
  href,
}: {
  title: string;
  desc: string;
  btnText: string;
  href: string;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow={3}
      py={4}
      sx={{ backgroundColor: "#fafafa" }}
    >
      <Typography variant="h5" mb={5}>
        {title}
      </Typography>
      <Typography variant="body1" textAlign="center" px={7} mb={1}>
        {desc}
      </Typography>
      <Button component={NextLinkComposed} type="secondary" to={href}>
        {btnText}
      </Button>
    </Box>
  );
}
