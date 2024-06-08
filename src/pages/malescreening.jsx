import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import axios from 'axios';
import { styled } from '@mui/system';
import company from '../assets/company.png';
import { Container, Grid, TextField, MenuItem, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';

const TestBookingmen = () => {
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

//   const handleSubmit = async () => {
//     try {
//       for (const test of tests) {
//         if (!test.referenceRange || !test.interpretation) {
//           alert('Please fill all the reference range and interpretation fields');
//           return;
//         }
//       }

//       const response = await axios.post('https://backend-osa.onrender.com/test-booking', {
//         ...patientData,
//         tests,
//       });

//       if (response.status === 201) {
//         alert('Test booking saved successfully');
//       }
//     } catch (error) {
//       console.error('Error saving test booking:', error);
//       alert('Failed to save test booking');
//     }
//   };

  const handleCancel = () => {
    setPatientData(initialPatientData);
    setTests(initialTests.map(test => ({ ...test, rate: 0, referenceRange: '', interpretation: '' })));
  };


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
    // Reusable component for editable table rows
const EditableSerologyTableRow = ({ row, index, handleInputChange }) => (
  <TableRow>
    <TableCell>
      <TextField
        value={row.test}
        onChange={(e) => handleInputChange(index, 'test', e.target.value)}
      />
    </TableCell>
    <TableCell>
      <TextField
        value={row.methodology}
        onChange={(e) => handleInputChange(index, 'methodology', e.target.value)}
      />
    </TableCell>
    <TableCell align="center">
      <TextField
        value={row.result}
        onChange={(e) => handleInputChange(index, 'result', e.target.value)}
      />
    </TableCell>
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
  
    const [serData, setSerData] = useState(serologyData);
  
    // Function to handle input change
    const handleSerologyInputChange = (index, key, value) => {
      setSerData((prevData) => {
        const newData = [...prevData];
        newData[index] = { ...newData[index], [key]: value };
        return newData;
      });
    };
    const [marData, setMarData] = useState([
      { test: 'MALARIA PARASITE', methodology: 'Rapid Chromatographic immunoassay', result: '' },
    ]);
    
    // Reusable component for editable parasitology table rows
const EditableParasitologyTableRow = ({ row, index, handleInputChange }) => (
  <TableRow>
    <TableCell>
      <TextField
        value={row.test}
        onChange={(e) => handleInputChange(index, 'test', e.target.value)}
      />
    </TableCell>
    <TableCell>
      <TextField
        value={row.methodology}
        onChange={(e) => handleInputChange(index, 'methodology', e.target.value)}
      />
    </TableCell>
    <TableCell align="center">
      <TextField
        value={row.result}
        onChange={(e) => handleInputChange(index, 'result', e.target.value)}
      />
    </TableCell>
  </TableRow>
);

  const initialData = [
    { investigation: 'Total WBC', result: '6.7', referenceRange: '4.0 – 10.0 X10^3/μL' },
    { investigation: 'Neutrophils', result: '61.0', referenceRange: '45.0 – 70.0 % (2.5-7.5 x10^9/L)' },
    { investigation: 'Lymphocytes', result: '35.0', referenceRange: '20.0 – 40.0 % (1.2- 4.0 x10^9/L)' },
    { investigation: 'Monocytes', result: '3.0', referenceRange: '02-10% (0.2-1.0 x10^9/L)' },
    { investigation: 'Eosinophils', result: '1.0', referenceRange: '1-6% (0.02 – 0.6 x10^9/L)' },
    { investigation: 'Basophils', result: '0.10', referenceRange: '0-2% (0.01- 0.1x10^9/L)' },
    { investigation: 'RBC', result: '4.5', referenceRange: '4.5 - 6.5/pl' },
    { investigation: 'MCV', result: '91.2', referenceRange: '80-100 fl' },
    { investigation: 'MCH', result: '31.6', referenceRange: '27-34pg' },
    { investigation: 'MCHC', result: '33.1', referenceRange: '32-36g/dl' },
    { investigation: 'HGB', result: '13.6', referenceRange: '11.5 – 16.0 g/dL' },
    { investigation: 'HCT (PCV)', result: '43', referenceRange: '32.0 – 49.0 %' },
    { investigation: 'Platelets', result: '250', referenceRange: '150 – 450 X10^3/μL' },
  ];

  const [herData, setHerData] = useState(initialData);
  const [comments, setComments] = useState({
    redBloodCells: 'Normocytic Normochromic red cells.',
    whiteBloodCells: 'Leucocyte values are within normal limits.',
    platelets: 'Normal and adequate.',
  });

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleCommentsChange = (field, value) => {
    setComments({ ...comments, [field]: value });
  };

  const [urinalysis, setUrinalysis] = useState({
    colour: 'Yellow',
    appearance: 'Slightly Turbid',
    pH: '6.5',
    specificGravity: '1.025',
    urobilinogen: 'Normal',
    leukocyte: 'Trace',
    bilirubin: 'Negative',
    blood: 'Negative',
    nitrite: 'Negative',
    protein: 'Negative',
    glucose: 'Nil',
    ketones: 'Negative',
    comment: 'Normal.'
});


const handleUrinalysisChange = (event) => {
    const { name, value } = event.target;
    setUrinalysis(prevState => ({
        ...prevState,
        [name]: value
    }));
};
const initData = {
  bilirubinTotal: '0.6',
  bilirubinDirect: '0.2',
  astSgot: '31',
  altSgpt: '32',
  alp: '209',
  albumin: '4.0',
  totalProtein: '82',
  urea: '20',
  creatinine: '1.0',
  sodium: '138',
  potassium: '3.6',
  chloride: '98',
  bicarbonate: '25',
  totalCholesterol: '152',
  hdl: '72',
  ldl: '65',
  triglycerides: '74',
  vldl: '26',
  fastingBloodSugar: '101'
};

const [sData, setSData] = useState(initData);

const handleChangei = (event) => {
  const { name, value } = event.target;
  setSData((prevData) => ({
    ...prevData,
    [name]: value
  }));
};

// Define the styled components
const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
}));

const CustomTable = styled(Table)({
  minWidth: 300,
});

// Define the Report component
const initialFields = [
  { label: 'Name', value: 'OSAWEMEN EMMANUEL' },
  { label: 'Title', value: 'Medical Laboratory Scientist' }
];

const authorizedBy = {
  name: 'Dr. John Doe',
  title: 'Chief Medical Officer',
};

const [fields, setFields] = useState(initialFields);

  const handleChanges = (index, event) => {
    const newFields = fields.map((field, idx) => {
      if (idx === index) {
        return { ...field, value: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };
  return (
    <Fade in={true} timeout={1000} appear>
      <Container
        maxWidth="lg"
        sx={{
          marginTop:1000,
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
          <Typography variant="h6" align="center" color="primary" gutterBottom>SEROLOGY</Typography>
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
                {serData.map((row, index) => (
                  <EditableSerologyTableRow
                    key={index}
                    row={row}
                    index={index}
                    handleInputChange={handleSerologyInputChange}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
      <Typography variant="body2" align="justify" sx={{ marginTop: 6 }}>
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
      {marData.map((row, index) => (
        <EditableParasitologyTableRow
          key={index}
          row={row}
          index={index}
          handleInputChange={handleMalDataChange}
        />
      ))}
    </TableBody>
  </Table>
</TableContainer>
<Typography variant="body2" align="center" sx={{ lineHeight: '115%', fontSize: '14pt', color: '#4f81bd' }}>
  &nbsp;
</Typography>
<Typography variant="h5" style={{ marginBottom: '16px', color: '#00b0f0', fontFamily: 'Century Gothic' }}>
        HAEMATOLOGY AND COAGULATION STUDIES
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>INVESTIGATION</strong></TableCell>
              <TableCell align="center"><strong>RESULT</strong></TableCell>
              <TableCell><strong>REFERENCE RANGE</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {herData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.investigation}</TableCell>
                <TableCell align="center">
                  <TextField
                    value={row.result}
                    onChange={(e) => handleInputChange(index, 'result', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.referenceRange}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" style={{ marginTop: '16px', textAlign: 'center' }}><strong>Comments</strong></Typography>
      <Typography variant="body1"><u>Blood film review</u></Typography>
      <Typography variant="body1">
        Red Blood Cells: 
        <TextField
          value={comments.redBloodCells}
          onChange={(e) => handleCommentsChange('redBloodCells', e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          multiline
          style={{ marginTop: '8px' }}
        />
      </Typography>
      <Typography variant="body1">
        White Blood Cells: 
        <TextField
          value={comments.whiteBloodCells}
          onChange={(e) => handleCommentsChange('whiteBloodCells', e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          multiline
          style={{ marginTop: '8px' }}
        />
      </Typography>
      <Typography variant="body1">
        Platelets: 
        <TextField
          value={comments.platelets}
          onChange={(e) => handleCommentsChange('platelets', e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          multiline
          style={{ marginTop: '8px' }}
        />
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
                <strong>MEDICAL MICROBIOLOGY</strong>
            </Typography>
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                <Table style={{ border: '0.75pt solid #000000' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ width: '144.95pt', borderRight: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <Typography variant="h6"><strong>URINALYSIS</strong></Typography>
                            </TableCell>
                            <TableCell style={{ width: '145.05pt', borderLeft: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}></TableCell>
                        </TableRow>
                        {Object.entries(urinalysis).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell style={{ width: '144.95pt', borderTop: '0.75pt solid #000000', borderRight: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                    <Typography variant="body1">{key}</Typography>
                                </TableCell>
                                <TableCell style={{ width: '145.05pt', borderTop: '0.75pt solid #000000', borderLeft: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                    <TextField
                                        name={key}
                                        value={value}
                                        onChange={handleUrinalysisChange}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" component="div" gutterBottom>
        <strong style={{ color: '#00b0f0' }}>CHEMICAL PATHOLOGY (CHEMISTRY)</strong>
      </Typography>
      <TableContainer component={Paper} style={{ width: '514.65pt', marginRight: '9pt', marginLeft: '9pt' }}>
        <Table aria-label="chemical pathology table" style={{ borderCollapse: 'collapse', float: 'left' }}>
          <TableHead>
            <TableRow style={{ height: '10.8pt' }}>
              <TableCell style={{ width: '95.75pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <strong>INVESTIGATION</strong>
              </TableCell>
              <TableCell style={{ width: '144.9pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <strong>METHODOLOGY</strong>
              </TableCell>
              <TableCell colSpan={2} style={{ width: '79.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <strong>VALUE</strong>
              </TableCell>
              <TableCell colSpan={2} style={{ width: '150.95pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <strong>REFERENCE RANGES</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Liver Function Test */}
            <TableRow>
              <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <strong>LIVER FUNCTION TEST</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bilirubin Total</TableCell>
              <TableCell>Modified TAB (End Point)</TableCell>
              <TableCell colSpan={2}>
                <TextField
                  name="bilirubinTotal"
                  value={sData.bilirubinTotal}
                  onChange={handleChangei}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell colSpan={2}>&lt;1.3 mg/dL</TableCell>
            </TableRow>
            {/* Add more liver function test rows here */}
            {/* Kidney Function Test */}
            <TableRow>
              <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <strong>KIDNEY FUNCTION TEST</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Urea</TableCell>
              <TableCell colSpan={2}>Modified Berthelot (End Point)</TableCell>
              <TableCell colSpan={2}>
                <TextField
                  name="urea"
                  value={sData.urea}
                  onChange={handleChangei}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>10-55 mg/dL</TableCell>
            </TableRow>
            {/* Add more kidney function test rows here */}
            {/* Lipid Profile */}
            <TableRow>
              <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <strong>LIPID PROFILE</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Cholesterol</TableCell>
              <TableCell colSpan={2}>CHOD- PAP Method</TableCell>
              <TableCell colSpan={2}>
                <TextField
                  name="totalCholesterol"
                  value={sData.totalCholesterol}
                  onChange={handleChangei}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <p style={{ marginBottom: '0pt' }}>Rec: &lt;200mg/dL</p>
                <p style={{ marginBottom: '0pt' }}>Low risk: 200- 239 mg/dL</p>
                <p style={{ marginBottom: '0pt', lineHeight: 'normal' }}>High Risk: &ge; 240 mg/dL</p>
              </TableCell>
            </TableRow>
            {/* Add more lipid profile rows here */}
            {/* Blood Sugar Test */}
            <TableRow>
              <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <strong>BLOOD SUGAR TEST</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fasting Blood Sugar</TableCell>
              <TableCell colSpan={2}>Glucometer</TableCell>
              <TableCell colSpan={2}>
                <TextField
                  name="fastingBloodSugar"
                  value={sData.fastingBloodSugar}
                  onChange={handleChangei}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>80 - 120 mg/dL</TableCell>
            </TableRow>
            {/* Add more blood sugar test rows here */}
          </TableBody>
        </Table>
      </TableContainer>

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
        <Root>
      <Typography variant="h6" gutterBottom>
        MEDICAL REPORTS
      </Typography>
      <TableContainer>
        <CustomTable aria-label="simple table">
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {field.label}:
                </TableCell>
                <TableCell>
                  <TextField
                    value={field.value}
                    onChange={(event) => handleChanges(index, event)}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CustomTable>
      </TableContainer>
      <Typography variant="body2" gutterBottom>
        END OF MEDICAL REPORTS 
      </Typography>
      {authorizedBy && (
        <Typography variant="body2" gutterBottom>
          AUTHORIZED BY: {authorizedBy.name} ({authorizedBy.title})
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={() => console.log(fields)}>
        Save
      </Button>
    </Root>
    <div>
    </div>

          <Button variant="outlined" color="primary" onClick={handleAddTest}>Add Test</Button>
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={12} sm={6}>
              {/* <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>Submit</Button> */}
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

export default TestBookingmen;
