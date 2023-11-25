import React, { useState } from 'react';
import {
  Grid, Paper, TextField, FormControlLabel, FormGroup, Checkbox, Button, Typography
} from '@mui/material';
import UserPool from "./UserPool.js";

export default function Signup() {
  const [isStylist, setIsStylist] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+"); // Default country code is set to +1
  const [phoneNumber, setPhoneNumber] = useState("");
  const paperStyle = { padding: 20, height: '620px', width: 350, margin: "10px auto" };

  const handleCountryCodeChange = (event) => {
    let newCountryCode = event.target.value;
  
    // Ensure the country code is always a plus sign followed by 1 to 3 digits
    if (/^\+\d{0,3}$/.test(newCountryCode)) {
      setCountryCode(newCountryCode);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\D/g, '')}`;
    const attributes = [
      {
        Name: "given_name",
        Value: firstName,
      },
      {
        Name: "family_name",
        Value: lastName,
      },
      {
        Name: "phone_number",
        Value: fullPhoneNumber,
      },
      {
        Name: "custom:user_role",
        Value: isStylist ? "Stylist" : "Customer",
      },
    ];

    UserPool.signUp(email, password, attributes, null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
      alert("Please check your email to verify your account.");
    });
  };

  return (
    <>
      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <Button variant='outlined' style={{
          color: "#000000",
          borderColor: "#000000",
          borderWidth: "2px",
          borderRadius: 0,
          padding: "12px 48px",
          margin: "20px 20px 20px 20px"
        }}>
          Sign In
        </Button>
      </Grid>

      <div>
        <form onSubmit={onSubmit}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Paper elevation={2} style={paperStyle}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <h2>Sign Up</h2>

                <TextField
                  required id="first-name-signup"
                  label="First Name"
                  margin="normal"
                  fullWidth
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />

                <TextField
                  required id="last-name-signup"
                  label="Last Name"
                  margin="normal"
                  fullWidth
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />

                <TextField
                    required id="country-code"
                    label="Country Code"
                    margin="normal"
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    fullWidth
                    inputProps={{ maxLength: 4 }}
                />
                <TextField
                  required id="phone-number-signup"
                  label="Phone Number"
                  margin="normal"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  fullWidth
                />

                <TextField
                  required id="email-address-signup"
                  label="Email Address"
                  margin="normal"
                  fullWidth
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <TextField
                  id="password-signup"
                  margin="normal"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  fullWidth required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked color='default' size='small' />}
                    label={<Typography variant='caption'>I agree to the Terms of Service and Privacy Policy.</Typography>} />

                  <FormControlLabel control={<Checkbox type="checkbox" checked={isStylist}
                    onChange={(event) => setIsStylist(event.target.checked)}
                    defaultChecked color='default' size='small' />}
                    label={<Typography variant='caption'>I am a stylist.</Typography>} />
                </FormGroup>

                <Button variant='contained'
                  type='submit'
                  style={{
                    backgroundColor: "#e95252",
                    padding: "12px 24px",
                    marginTop: "10px"
                  }}
                  fullWidth required>
                  <Typography color='white'>Create an Account</Typography>
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </form>
      </div>
    </>
  );
};