import { Box, Button, Typography } from "@mui/material";

export default function PortalAction({ title, desc, btnText }: { title: string; desc: string; btnText: string; }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius={2}
      py={4}
      sx={{ backgroundColor: "#f8f8f8" }}
    >
      <Typography variant="h5" mb={5}>
        {title}
      </Typography>
      <Typography variant="body1" textAlign="center" px={7} mb={1}>
        {desc}
      </Typography>
      <Button type="secondary" href="/">
        {btnText}
      </Button>
    </Box>
  );
}
