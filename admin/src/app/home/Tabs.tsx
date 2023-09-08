"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Tabs, Tab, Typography, Slide } from "@mui/material";
import NewElection from "./NewElection";
import UpcomingElection from "./UpcomingElection";
import OngoingElection from "./OngoingElection";

interface StyledTabProps {
  label: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    color: "#40a9ff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#1890ff",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Slide
      in={value === index}
      direction={value < index ? "left" : "right"}
      timeout={500}
      unmountOnExit
    >
      <div role="tabpanel" hidden={value !== index}>
        {children}
      </div>
    </Slide>
  );
}

export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "#fff" }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Setup New Election" />
          <AntTab label="Upcoming Elections" />
          <AntTab label="Ongoing Elections" />
          <AntTab label="Past Elections" />
          <AntTab label="All" />
        </AntTabs>
      </Box>

      <TabPanel value={value} index={0}>
        <NewElection />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpcomingElection />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OngoingElection />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>
          No past elections found in the database at this time.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OngoingElection />
        <UpcomingElection />
      </TabPanel>
    </Box>
  );
}
