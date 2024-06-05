import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import company from '../../assets/company.png';
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fade
} from '@mui/material';

const TestBooking = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const TwoId = (word) => {
    if (word.length < 2) {
      return word;
    }
    return word.substring(0, 2);
  };

  const initialPatientData = {
    patientId: patient?.id || '',
    labNo: '041219025',
    name: `${patient?.first_name || ''} ${patient?.last_name || ''}`,
    sex: 'MALE',
    age: patient ? calculateAge(patient.dob) : '',
    ageUnit: 'Years',
    panel: 'CBSE',
    referredBy: 'Dr. Arun Fotedar',
    date: patient?.dob || '',
  };

  const initialTests = [
    {
      id: `${TwoId(patient?.test_type).toUpperCase()}`,
      name: `${patient?.test_type || ''}`,
      rate: 30,
      referenceRange: '',
      interpretation: ''
    }
  ];

  const [patientData, setPatientData] = useState(initialPatientData);
  const [tests, setTests] = useState(initialTests);

  useEffect(() => {
    if (patient) {
      setPatientData(initialPatientData);
    }
  }, [patient]);

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
    setTests((prevTests) => [
      ...prevTests,
      { id: '', name: '', rate: 0, referenceRange: '', interpretation: '' }
    ]);
  };

  const handleRemoveTest = (index) => {
    setTests((prevTests) => prevTests.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
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
    setTests(initialTests.map(test => ({
      ...test,
      rate: 0,
      referenceRange: '',
      interpretation: ''
    })));
  };

  const sections = [
    {
      title: 'BIODATA',
      fields: [
        { label: 'Name Of Patient', name: 'name', type: 'text' },
        { label: 'Lab. No.', name: 'labNo', type: 'text' },
        { label: 'Age', name: 'age', type: 'text' },
        { label: 'Sex', name: 'sex', type: 'select', options: ['MALE', 'FEMALE'] },
        { label: 'Specimen', name: 'specimen', type: 'text' },
        { label: 'Investigations', name: 'investigations', type: 'text' },
        { label: 'Date Of Specimen Collection', name: 'date', type: 'date' },
        { label: 'Time', name: 'time', type: 'time' },
      ]
    },
    {
      title: 'SEROLOGY',
      tableData: [
        { test: 'HEPATITIS B Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
        { test: 'SYPHILIS TEST (VDRL)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
        { test: 'HEPATITIS C Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
        { test: 'HIV TEST (1&2)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
        { test: 'GHONNORRHEA Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NEGATIVE' },
        { test: 'H. PYLORI Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'POSITIVE' }
      ]
    },
    {
      title: 'WIDAL TEST',
      tableData: [
        { antigen: 'Salmonella Typhi H', dilution: '1/20' },
        { antigen: 'Paratyphi A H', dilution: '1/20' },
        { antigen: 'Paratyphi B H', dilution: '1/20' },
        { antigen: 'Paratyphi C H', dilution: '1/20' },
        { antigen: 'Salmonella Typhi O', dilution: '1/20' },
        { antigen: 'Paratyphi A O', dilution: '1/20' },
        { antigen: 'Paratyphi B O', dilution: '1/20' },
        { antigen: 'Paratyphi C O', dilution: '1/160' }
      ]
    },
    {
      title: 'MALARIA PARASITE TEST',
      fields: [
        { label: 'Malaria Parasite', name: 'malariaParasite', type: 'text' }
      ]
    },
    {
      title: 'TEST RESULTS',
      tests: true
    }
  ];

  const renderSection = (section) => {
    if (section.fields) {
      return (
        <Grid container spacing={3}>
          {section.fields.map((field, index) => (
            <Grid item xs={12} sm={field.type === 'select' ? 2 : 6} key={index}>
              {field.type === 'select' ? (
                <TextField
                  select
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={patientData[field.name]}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                >
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={patientData[field.name]}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                  InputLabelProps={{
                    shrink: field.type === 'date' || field.type === 'time',
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      );
    }

    if (section.tableData) {
      return (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">TEST</TableCell>
                <TableCell align="center">METHODOLOGY</TableCell>
                <TableCell align="center">RESULT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {section.tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.test}</TableCell>
                  <TableCell>{row.methodology}</TableCell>
                  <TableCell align="center">{row.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    if (section.tests) {
      return (
        <>
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test ID</TableCell>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Reference Range</TableCell>
                  <TableCell>Interpretation</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tests.map((test, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        value={test.id}
                        onChange={(e) => handleTestChange(index, 'id', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={test.name}
                        onChange={(e) => handleTestChange(index, 'name', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={test.rate}
                        onChange={(e) => handleTestChange(index, 'rate', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={test.referenceRange}
                        onChange={(e) => handleTestChange(index, 'referenceRange', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={test.interpretation}
                        onChange={(e) => handleTestChange(index, 'interpretation', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveTest(index)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTest}
            sx={{ marginTop: 4 }}
          >
            Add Test
          </Button>
        </>
      );
    }
  };

  return (
    <Fade in>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <img src={company} alt="Company Logo" style={{ width: '100px' }} />
            </Grid>
          </Grid>

          {sections.map((section, index) => (
            <div key={index}>
              <Typography variant="h6" align="center" color="primary" sx={{ marginTop: 4 }}>
                {section.title}
              </Typography>
              {renderSection(section)}
            </div>
          ))}

          <Grid container spacing={3} sx={{ marginTop: 4 }}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fade>
  );
};

export default TestBooking;
