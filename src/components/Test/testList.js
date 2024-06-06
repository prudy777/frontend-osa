import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import company from '../../assets/company.png';
import { Container, Grid, TextField, MenuItem, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';

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
    { id: `${TwoId(patient?.test_type).toUpperCase()}`, name: `${patient?.test_type || ''}`, rate: 30, referenceRange: '', interpretation: '' },
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
    setTests((prevTests) => [...prevTests, { id: '', name: '', rate: 0, referenceRange: '', interpretation: '' }]);
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
    setTests(initialTests.map(test => ({ ...test, rate: 0, referenceRange: '', interpretation: '' })));
  };
  const SerologyTableRow = ({ test, methodology, result }) => (
    <TableRow>
      <TableCell>{test}</TableCell>
      <TableCell>{methodology}</TableCell>
      <TableCell align="center">{result}</TableCell>
    </TableRow>
  );
  
  const serologyData = [
    { test: 'HEPATITIS B Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'SYPHILIS TEST (VDRL)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'HEPATITIS C Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'HIV TEST (1&2)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'GHONNORRHEA Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NEGATIVE' },
    { test: 'H. PYLORI Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'POSITIVE' },
  ];
  
  const renderSerologyTable = () => (
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
          {serologyData.map((row, index) => (
            <SerologyTableRow 
              key={index}
              test={row.test}
              methodology={row.methodology}
              result={row.result}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

    const [data, setData] = useState({
      salmonellaTyphiH: '1/20',
      paratyphiAH: '1/20',
      paratyphiBH: '1/20',
      paratyphiCH: '1/20',
      salmonellaTyphiO: '1/20',
      paratyphiAO: '1/20',
      paratyphiBO: '1/20',
      paratyphiCO: '1/160',
    });

    const [maldata, setMalData] = useState({
      malariaParasite: '',
    });

    const handleDataChange = (key, value) => {
      setData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };
  
    const handleMalDataChange = (key, value) => {
      setMalData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };
  
  return (
    <Fade in={true} timeout={1000} appear>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 160,
          opacity: 1,
          transition: 'opacity 1s ease-out',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>LABORATORY INVESTIGATION REPORT <img src={company} alt="Company Logo" /></Typography>
          <Typography variant="h6" align="center" color="primary" gutterBottom>BIODATA</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name Of Patient"
                name="name"
                value={patientData.name}
                onChange={handleChange}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Lab. No."
                name="labNo"
                value={patientData.labNo}
                onChange={handleChange}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Specimen"
                name="specimen"
                value={patientData.specimen}
                onChange={handleChange}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Investigations"
                name="investigations"
                value={patientData.investigations}
                onChange={handleChange}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date Of Specimen Collection"
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={patientData.time}
                onChange={handleChange}
                variant="outlined"
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Result Reporting"
                name="dateOfResultReporting"
                type="date"
                value={patientData.dateOfResultReporting}
                onChange={handleChange}
                variant="outlined"
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          {/* Serology Section */}
          <Typography variant="h6" align="center" color="primary" gutterBottom>SEROLOGY</Typography>
          {renderSerologyTable()}
          
      <Typography variant="h6" align="center" color="primary" gutterBottom>
        TYPHOID TEST (WIDAL)
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2, border: '1px solid #000' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>Salmonella typhi</TableCell>
              <TableCell>Paratyphi A</TableCell>
              <TableCell>Paratyphi B</TableCell>
              <TableCell>Paratyphi C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ANTIBODY H</TableCell>
              <TableCell>
                <TextField
                  value={data.salmonellaTyphiH}
                  onChange={(event) => handleDataChange(event, 'salmonellaTyphiH')}
                  variant="standard"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={data.paratyphiAH}
                  onChange={(event) => handleMalDataChange(event, 'paratyphiAH')}
                  variant="standard"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={data.paratyphiBH}
                  onChange={(event) => handleChange(event, 'paratyphiBH')}
                  variant="standard"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={data.paratyphiCH}
                  onChange={(event) => handleChange(event, 'paratyphiCH')}
                  variant="standard"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ANTIBODY O</TableCell>
              <TableCell>
                <TextField
                  value={data.salmonellaTyphiO}
                  onChange={(event) => handleChange(event, 'salmonellaTyphiO')}
                  variant="standard"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={data.paratyphiAO}
                  onChange={(event) => handleChange(event, 'paratyphiAO')}
                  variant="standard"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={data.paratyphiBO}
                  onChange={(event) => handleChange(event, 'paratyphiBO')}
                  variant="standard"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={data.paratyphiCO}
                  onChange={(event) => handleChange(event, 'paratyphiCO')}
                  variant="standard"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" align="justify" sx={{ marginTop: 2 }}>
        <strong>REFERENCE RANGES</strong><br />
        Salmonellas: Significant value Titres≥1/80 (O antibodies) and 1/160 (H antibodies) indicates recent infection.
      </Typography>
      <Typography variant="h6" align="center" sx={{ color: '#00b0f0', marginBottom: 0, lineHeight: '115%' }}>
        PARASITOLOGY
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 0, border: '0.75pt solid #000000' }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow sx={{ height: '4.6pt' }}>
              <TableCell sx={{ borderRight: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', padding: '5.03pt', verticalAlign: 'top' }}>
                <Typography variant="body2" align="justify" sx={{ lineHeight: '115%', fontFamily: 'Century Gothic', fontWeight: 'bold' }}>
                  TEST
                </Typography>
              </TableCell>
              <TableCell sx={{ borderRight: '0.75pt solid #000000', borderLeft: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', padding: '5.03pt', verticalAlign: 'top' }}>
                <Typography variant="body2" align="justify" sx={{ lineHeight: '115%', fontFamily: 'Century Gothic', fontWeight: 'bold' }}>
                  METHODOLOGY
                </Typography>
              </TableCell>
              <TableCell sx={{ borderLeft: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', padding: '5.03pt', verticalAlign: 'top' }}>
                <Typography variant="body2" align="center" sx={{ lineHeight: '115%', fontFamily: 'Century Gothic', fontWeight: 'bold' }}>
                  RESULTS
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ borderTop: '0.75pt solid #000000', borderRight: '0.75pt solid #000000', padding: '5.03pt', verticalAlign: 'top' }}>
                <Typography variant="body2" align="justify" sx={{ lineHeight: '115%', fontFamily: 'Century Gothic' }}>
                  MALARIA PARASITE
                </Typography>
              </TableCell>
              <TableCell sx={{ borderTop: '0.75pt solid #000000', borderRight: '0.75pt solid #000000', borderLeft: '0.75pt solid #000000', padding: '5.03pt', verticalAlign: 'top' }}>
                <Typography variant="body2" align="justify" sx={{ lineHeight: '115%', fontSize: '12pt' }}>
                  Rapid Chromatographic immunoassay
                </Typography>
              </TableCell>
              <TableCell sx={{ borderTop: '0.75pt solid #000000', borderLeft: '0.75pt solid #000000', padding: '5.03pt', verticalAlign: 'top' }}>
                <TextField
                  value={data.malariaParasite}
                  onChange={(event) => handleChange(event, 'malariaParasite')}
                  variant="standard"
                  fullWidth
                  sx={{ textAlign: 'center', lineHeight: '115%', fontSize: '14pt', color: '#4f81bd' }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" align="center" sx={{ lineHeight: '115%', fontSize: '14pt', color: '#4f81bd' }}>
        &nbsp;
      </Typography>
          <Typography variant="h6" align="center" color="primary" gutterBottom>TESTS</Typography>
          {tests.map((test, index) => (
            <Grid container spacing={3} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Test ID"
                  name="id"
                  value={test.id}
                  onChange={(e) => handleTestChange(index, 'id', e.target.value)}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Test Name"
                  name="name"
                  value={test.name}
                  onChange={(e) => handleTestChange(index, 'name', e.target.value)}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Rate"
                  name="rate"
                  value={test.rate}
                  onChange={(e) => handleTestChange(index, 'rate', e.target.value)}
                  variant="outlined"
                  size="medium"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reference Range"
                  name="referenceRange"
                  value={test.referenceRange}
                  onChange={(e) => handleTestChange(index, 'referenceRange', e.target.value)}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Interpretation"
                  name="interpretation"
                  value={test.interpretation}
                  onChange={(e) => handleTestChange(index, 'interpretation', e.target.value)}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button variant="outlined" color="secondary" onClick={() => handleRemoveTest(index)}>Remove</Button>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" color="primary" onClick={handleAddTest}>Add Test</Button>
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={12} sm={6}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fade>
  );
};

export default TestBooking;
