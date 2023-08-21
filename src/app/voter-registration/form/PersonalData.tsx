import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function PersonalData({ formik }: any) {
  return (
    <Box
      component="fieldset"
      border={0.2}
      borderColor="lightgray"
      py={4}
      px={2}
    >
      <Box component="legend" color="GrayText" fontSize={14}>
        Personal Data
      </Box>

      {/* Firstname and lastname */}
      <Box px={2}>
        <Box display="flex" gap={1} pb={2}>
          <FormControl fullWidth>
            <TextField
              label="First name"
              name="firstname"
              variant="outlined"
              placeholder="Asiwaju"
              size="small"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <FormHelperText error>{formik.errors.firstname}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Last name"
              name="lastname"
              variant="outlined"
              placeholder="Tinubu"
              size="small"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <FormHelperText error>{formik.errors.lastname}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Email, birthdate, phone number */}
        <Box display="flex" gap={1} pb={2}>
          <FormControl>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              placeholder="asiwajutinubu@nigeria.gov"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phone"
              type="phone"
              placeholder="08020333000"
              size="small"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <FormHelperText error>{formik.errors.phone}</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <TextField
              label="Date of birth"
              variant="outlined"
              name="birthdate"
              size="small"
              value={formik.values.birthdate}
              onChange={(e) =>
                formik.setFieldValue("birthdate", e.target.value)
              }
              onBlur={formik.handleBlur}
            />
            {formik.touched.birthdate && formik.errors.birthdate && (
              <FormHelperText error>{formik.errors.birthdate}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Street, city, state */}
        <Box display="flex" gap={1} pb={2}>
          <FormControl fullWidth>
            <TextField
              label="Street"
              name="street"
              variant="outlined"
              placeholder="242 Murtala Mohammed Way"
              size="small"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.street && formik.errors.street && (
              <FormHelperText error>{formik.errors.street}</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <TextField
              label="City"
              name="city"
              variant="outlined"
              placeholder="Abuja"
              size="small"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <FormHelperText error>{formik.errors.city}</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <TextField
              label="State"
              name="state"
              variant="outlined"
              placeholder="FCT"
              size="small"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state && (
              <FormHelperText error>{formik.errors.state}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* LGA of residence and origin, hometown */}
        <Box display="flex" gap={1} pb={2}>
          <FormControl>
            <TextField
              label="L.G.A of Residence"
              variant="outlined"
              name="lgar"
              size="small"
              value={formik.values.lgar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lgar && formik.errors.lgar && (
              <FormHelperText error>{formik.errors.lgar}</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <TextField
              label="Hometown (Village)"
              variant="outlined"
              name="hometown"
              size="small"
              value={formik.values.hometown}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.hometown && formik.errors.hometown && (
              <FormHelperText error>{formik.errors.hometown}</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <TextField
              label="L.G.A of Origin"
              variant="outlined"
              name="lgao"
              size="small"
              value={formik.values.lgao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lgao && formik.errors.lgao && (
              <FormHelperText error>{formik.errors.lgao}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <FormControl fullWidth sx={{pb:2}}>
          <TextField
            label="Occupation"
            variant="outlined"
            name="occupation"
            size="small"
            value={formik.values.occupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.occupation && formik.errors.occupation && (
            <FormHelperText error>{formik.errors.occupation}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel id="gender-radio-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-radio-label"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <FormControlLabel value="male" control={<Radio color="default" />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          {formik.touched.gender && formik.errors.gender && (
            <FormHelperText error>{formik.errors.gender}</FormHelperText>
          )}
        </FormControl>
      </Box>
    </Box>
  );
}
