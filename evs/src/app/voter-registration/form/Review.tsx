import { useAppSelector } from "@/redux/hooks";
import { Box, Divider, Typography } from "@mui/material";
import StepperButtons from "./StepperButtons";

export default function Review() {
  const { data, token } = useAppSelector((state) => state.account);

  return (
    <Box px={5} py={5}>
      <Typography variant="h4">Voter Information Summary</Typography>
      <Typography variant="subtitle2" color="error">
        Please review carefully before you submit. You cannot edit the form
        beyond this point.
      </Typography>

      <Box py={3} px={1}>
        <Typography variant="h6" color="GrayText">
          Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
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
        <Typography variant="h6" color="GrayText">
          Polling Unit
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography>Registration Area: {data.regarea}</Typography>
        <Typography>Polling Unit: {data.pu}</Typography>
      </Box>

      <StepperButtons />
    </Box>
  );
}
