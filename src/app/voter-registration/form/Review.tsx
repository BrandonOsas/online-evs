import { useAppSelector } from "@/redux/hooks";
import { Box, Divider, Typography } from "@mui/material";
import StepperButtons from "./StepperButtons";

export default function Review() {
  const { data, token } = useAppSelector((state) => state.account);

  return (
    <Box px={5} py={5}>
      <Typography variant="h5">Voter Information Summary</Typography>

      <Box py={2} px={1}>
        <Typography variant="subtitle1">Bio-data</Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography>Firstname: {data.firstname}</Typography>
        <Typography>Surname: {data.lastname}</Typography>
        <Typography>Email: {data.email}</Typography>
        <Typography>Date of birth: {data.birthdate}</Typography>
        <Typography>Gender: {data.gender}</Typography>
        <Typography>Street: {data.street}</Typography>
        <Typography>City: {data.city}</Typography>
        <Typography>State: {data.state}</Typography>
        <Typography>L.G.A of Residence: {data.lgar}</Typography>
        <Typography>Occupation: {data.occupation}</Typography>
        <Typography>Hometown: {data.hometown}</Typography>
        <Typography>L.G.A of Origin: {data.lgao}</Typography>
        <Typography>Mobile Number: {data.phone}</Typography>
      </Box>

      <Box py={2} px={1}>
        <Typography variant="subtitle1">Polling Unit</Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography>Registration Area: {data.regarea}</Typography>
        <Typography>Polling Unit: {data.pu}</Typography>
      </Box>

      <StepperButtons />
    </Box>
  );
}
