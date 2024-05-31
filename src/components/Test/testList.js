import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField,MenuItem, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';

const TestBooking = () => {
  const initialPatientData = {
    patientId: 'P000446',
    labNo: '041219025',
    name: 'SANJAY',
    sex: 'MALE',
    age: '21',
    ageUnit: 'Months',
    panel: 'CBSE',
    referredBy: 'Dr. Arun Fotedar',
    date: '2005-02-18',
  };

  const initialTests = [
    { id: 'HB', name: 'HAEMOGLOBIN', rate: 30, referenceRange: '', interpretation: '' },
    { id: 'TLC', name: 'TOTAL LEUCOCYTE COUNT', rate: 30, referenceRange: '', interpretation: '' },
    { id: 'BG', name: 'BLOOD GROUP', rate: 0, referenceRange: '', interpretation: '' },
    { id: 'ESR', name: 'E.S.R', rate: 40, referenceRange: '', interpretation: '' },
    { id: 'BSPP', name: 'BL. Sugar (PP)', rate: 40, referenceRange: '', interpretation: '' },
    { id: '078', name: 'ROUTINE URINE ANALYSIS', rate: 40, referenceRange: '', interpretation: '' },
    { id: 'US', name: 'URINE SUGAR', rate: 30, referenceRange: '', interpretation: '' },
  ];

  const [patientData, setPatientData] = useState(initialPatientData);
  const [tests, setTests] = useState(initialTests);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTestChange = (index, field, value) => {
    setTests((prevTests) => {
      const updatedTests = [...prevTests];
      updatedTests[index][field] = value;
      return updatedTests;
    });
  };

  const handleAddTest = () => {
    setTests((prevTests) => [...prevTests, { id: '', name: '', rate: 0, referenceRange: '', interpretation: '' }]);
  };

  const handleRemoveTest = (index) => {
    setTests((prevTests) => prevTests.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      // Validate that all required fields are filled
      for (const test of tests) {
        if (!test.referenceRange || !test.interpretation) {
          alert('Please fill all the reference range and interpretation fields');
          return;
        }
      }

      const response = await axios.post('https://backend-osa.onrender.com/test-booking', {
        ...patientData,
        tests,
      });

      if (response.status === 201) {
        alert('Test booking saved successfully');
      }
    } catch (error) {
      console.error('Error saving test booking:', error);
      alert('Failed to save test booking');
    }
  };

  const handleCancel = () => {
    setPatientData(initialPatientData);
    setTests(initialTests.map(test => ({ ...test, rate: 0, referenceRange: '', interpretation: '' })));
  };
  

  return (
      <Fade in={true} timeout={1000} appear>
        <Container
          maxWidth="lg"
          sx={{
            marginTop: 80,
            opacity: 1,
            transition: 'opacity 1s ease-out',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Test Booking</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patient ID"
              name="patientId"
              value={patientData.patientId}
              onChange={handleChange}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="LAB No"
              name="labNo"
              value={patientData.labNo}
              onChange={handleChange}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={patientData.name}
              onChange={handleChange}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Sex"
              name="sex"
              value={patientData.sex}
              onChange={handleChange}
              variant="outlined"
              size="medium"
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={patientData.age}
              onChange={handleChange}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Age Unit"
              name="ageUnit"
              value={patientData.ageUnit}
              onChange={handleChange}
              variant="outlined"
              size="medium"
            >
              <MenuItem value="Days">Days</MenuItem>
              <MenuItem value="Months">Months</MenuItem>
              <MenuItem value="Years">Years</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Panel"
              name="panel"
              value={patientData.panel}
              onChange={handleChange}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Referred By"
              name="referredBy"
              value={patientData.referredBy}
              onChange={handleChange}
              variant="outlined"
              size="medium"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={patientData.date}
              onChange={handleChange}
              variant="outlined"
              size="medium"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test ID</TableCell>
                <TableCell>Test Name</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Reference Range</TableCell>
                <TableCell align="right">Interpretation</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={test.id}
                      onChange={(e) => handleTestChange(index, 'id', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={test.name}
                      onChange={(e) => handleTestChange(index, 'name', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={test.rate}
                      onChange={(e) => handleTestChange(index, 'rate', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={test.referenceRange}
                      onChange={(e) => handleTestChange(index, 'referenceRange', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={test.interpretation}
                      onChange={(e) => handleTestChange(index, 'interpretation', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="secondary" onClick={() => handleRemoveTest(index)}>Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleAddTest}>Add New Test</Button>

        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth size="medium" onClick={handleSubmit}>Submit</Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth size="medium" onClick={handleCancel}>Cancel</Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth size="medium">Exit</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
   </Fade>
  );
};

export default TestBooking;
