import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Grid,
  Box,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';


function App() {
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, marginTop: 8, marginBottom: 8 }}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={async (event) => {
              event.preventDefault()
              let formData = new FormData(event.target)
              let identification = {}
              for (let field of formData.entries()) {
                identification[field[0]] = field[1]
              }
              const request_config = {
                method: "post",
                url: "http://localhost:3008/id-verification",
                headers: {
                  "Content-Type": "application/json",
                },
                data: identification,
              };
              try {
                const response = await axios(request_config);
                setResult(response.data.outcome)
              } catch (err) {
                setResult("error")
              }
              setOpen(true)
            }}
          >
            <Grid container spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Grid container spacing={2}
                direction="row">
                <Grid item xs={6}>
                  <TextField required name="firstName" id="firstName" label="First Name" variant="outlined" defaultValue="John" />
                </Grid>
                <Grid item xs={6}>
                  <TextField required name="lastName" id="lastName" label="Last Name" variant="outlined" defaultValue="Doe" />
                </Grid>
              </Grid>
              <Grid container spacing={2}
                direction="row">
                <Grid item xs={6}>
                  <TextField required name="line1" id="line1" label="Address" variant="outlined" defaultValue="15 Circle Road" />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="line2" id="line2" label="Apt # / Suite" variant="outlined" />
                </Grid>
              </Grid>
              <Grid container spacing={2}
                direction="row">
                <Grid item xs={3}>
                  <TextField sx={{ maxWidth: 100 }} required name="city" id="city" label="City" variant="outlined" defaultValue="New York" />
                </Grid>
                <Grid item xs={3}>
                  <TextField sx={{ maxWidth: 100 }} select required name="state" id="state" label="State" variant="outlined" defaultValue="NY">
                    {STATES.map(state => <MenuItem key={state} value={state}> {state} </MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField sx={{ maxWidth: 100 }} required name="zip" id="zip" label="Zip" variant="outlined" defaultValue="12345"
                    inputProps={{
                      pattern: "[0-9]{5}"
                    }} />
                </Grid>
                <Grid item xs={3}>
                  <TextField sx={{ maxWidth: 100 }} required name="country" id="country" label="Country" variant="outlined" defaultValue="US" InputProps={{
                    readOnly: true,
                  }} />
                </Grid>
              </Grid>
              <Grid container
                direction="column" alignItems="flex-start" >
                <Grid item xs={8}>
                  <TextField required name="ssn" id="ssn" label="SSN" variant="outlined" defaultValue="123456789"
                    inputProps={{
                      pattern: "[0-9]{9}"
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField required type="email" name="email" id="email" label="Email Address" variant="outlined" defaultValue="john@doe.com" />
                </Grid>
                <Grid item xs={8}>
                  <TextField type="date" required name="dob" id="dob" label="Date of Birth" variant="outlined" defaultValue="2000-01-25"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container
                direction="column"
                alignItems="flex-start">
                <Grid item xs={12}>
                  <Button type="submit" sx={{ marginTop: 4, marginLeft: 1 }} variant="contained">Submit</Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle sx={{ m: 0, p: 3 }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 7 }}>
          {resultText(result)}
        </DialogContent>
      </Dialog>
    </Box >
  );
}

function resultText(result) {
  if (result === 'Approved') {
    return <div style={{ fontSize: 20 }}>Your application has been approved 🤑</div>
  } else if (result === "Manual Review") {
    return <div style={{ fontSize: 20 }}>Your application is under review 😬</div>
  } else if (result === "Denied") {
    return <div style={{ fontSize: 20 }}> Your application has been denied 😭</div>
  } else {
    return <div style={{ fontSize: 20 }}>An error has occured ☹️</div>
  }
}

const STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

export default App;
