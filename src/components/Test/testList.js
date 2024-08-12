import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import jsPDF from 'jspdf';
import { Container, Checkbox, Grid, TextField, MenuItem, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';
import company from '../../assets/company.png';

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
    patient_no: patient?.id || '',
    lab_no: '041219025',
    name: `${patient?.first_name || ''} ${patient?.last_name || ''}`,
    sex: patient?.sex || 'MALE',
    age: patient ? calculateAge(patient.dob) : '',
    ageUnit: 'Years',
    specimen: '',
    investigation: '',
    referredBy: '',
    time: '',
    date: new Date().toISOString().split('T')[0],
  };

  const initialTests = [
    { id: `${TwoId(patient?.test_type).toUpperCase()}`, name: `${patient?.test_type || ''}`, rate: 0, referenceRange: 'whe', interpretation: 'wrefrd' },
  ];

  const [patientData, setPatientData] = useState(initialPatientData);
  const [tests, setTests] = useState(initialTests);

  useEffect(() => {
    if (patient) {
      setPatientData(initialPatientData);
    }
  }, [patient]);

  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (dataType, index) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };
      if (!updatedCheckedItems[dataType]) {
        updatedCheckedItems[dataType] = [];
      }
      if (updatedCheckedItems[dataType].includes(index)) {
        updatedCheckedItems[dataType] = updatedCheckedItems[dataType].filter(i => i !== index);
        handleRemoveTest(index, dataType);
      } else {
        updatedCheckedItems[dataType].push(index);
      }
      return updatedCheckedItems;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
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

  const handleCancel = () => {
    setPatientData(initialPatientData);
    setTests(initialTests);
  };

  const [datas, setDatas] = useState([{
    salmonellaTyphiH: '1/20',
    paratyphiAH: '1/20',
    paratyphiBH: '1/20',
    paratyphiCH: '1/20',
    salmonellaTyphiO: '1/20',
    paratyphiAO: '1/20',
    paratyphiBO: '1/20',
    paratyphiCO: '1/160',
  }]);

  const [maldata, setMalData] = useState({
    malariaParasite: '',
  });

  const handleDataChange = (index, event) => {
    const { name, value } = event.target;
    setDatas((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      return updatedData;
    });
  };

  const handleMalDataChange = (index, key, value) => {
    setMalData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const serologyData = [
    { test: 'HEPATITIS B Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'SYPHILIS TEST (VDRL)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'HEPATITIS C Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'HIV TEST (1&2)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'GHONNORRHEA Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NEGATIVE' },
    { test: 'H. PYLORI Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'POSITIVE' },
  ];

  const [serData, setSerData] = useState(serologyData);

  const handleSerologyInputChange = (index, event) => {
    const { name, value } = event.target;
    setSerData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  };

  const [marData, setMarData] = useState([
    { test: 'MALARIA PARASITE', methodology: 'Rapid Chromatographic immunoassay', result: '' },
  ]);

  const EditableParasitologyTableRow = ({ row, index, handleInputChange }) => (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={checkedItems['Parasitology']?.includes(index)}
          onChange={() => handleCheckboxChange('Parasitology', index)}
        />
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
    const newData = [...datas];
    newData[index][field] = value;
    setDatas(newData);
  };

  const handleCommentsChange = (field, value) => {
    setComments({ ...comments, [field]: value });
  };
 
  const initUri = [
    {
      urinalysis: 'colour', 
      methodology: 'Yellow'
    },
    {
      urinalysis: 'appearance', 
      methodology: 'Slightly Turbid'
    },
    {
      urinalysis: 'pH', 
      methodology: '6.5'
    },
    {
      urinalysis: 'specificGravity', 
      methodology: '1.025'
    },
    {
      urinalysis: 'urobilinogen', 
      methodology: 'Normal'
    },
    {
      urinalysis: 'leukocyte', 
      methodology: 'Trace'
    },
    {
      urinalysis: 'bilirubin', 
      methodology: 'Negative'
    },
    {
      urinalysis: 'blood', 
      methodology: 'Negative'
    },
    {
      urinalysis: 'nitrite', 
      methodology: 'Negative'
    },
    {
      urinalysis: 'protein', 
      methodology: 'Negative'
    },
    {
      urinalysis: 'glucose', 
      methodology: 'Nil'
    },
    {
      urinalysis: 'ketones', 
      methodology: 'Negative'
    },
    {
      comment: 'Normal.'
    }
  ];
  

  const [urinalysis, setUrinalysis] = useState(initUri)

  const handleUrinalysisChange = (event) => {
    const { name, value } = event.target;
    setUrinalysis(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const initData = [{
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
  }];

  const [sData, setSData] = useState(initData);

  const handleChangei = (index, event) => {
    const { name, value } = event.target;
    setSData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      return updatedData;
    });
  };

  

  const initialFields = [
    { label: 'Name', value: 'OSAWEMEN EMMANUEL' },
    { label: 'Title', value: 'Medical Laboratory Scientist' }
  ];

  const authorizedBy = {
    name: 'OSAWEMEN EMMANUEL',
    title: 'Chief Medical Officer',
  };

  const [fields, setFields] = useState(initialFields);

  

  const handleSubmit = async () => {
    try {
      for (const test of tests) {
        if (!test.referenceRange || !test.interpretation) {
          alert('Please fill all the reference range and interpretation fields');
          return;
        }
      }
      const response = await axios.post('http://localhost:4000/test-booking', {
        ...patientData,
        tests,
        serData
      });

      if (response.status === 201) {
        alert('Test booking saved successfully');
      }
    } catch (error) {
      console.error('Error saving test booking:', error);
      alert('Failed to save test booking');
    }
  };

  const collectData = () => {
    return {
      patientData,
      serData,
      datas,
      marData,
      herData,
      comments,
      urinalysis,
      sData,
      tests,
      fields,
      authorizedBy,
    };
  };

  const contentRef = useRef(null);


  const handleSavePdf = () => {
    try {
      const doc = new jsPDF('p', 'pt', 'a4');
      const content = document.getElementById('pdf-content');

      doc.html(content, {
        callback: (doc) => {
          doc.save('laboratory-investigation-report.pdf');
        },
        x: 10,
        y: 10,
        html2canvas: { scale: 0.5 },
      });
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };


  const handleAddTest = () => {
    setTests((prevTests) => [...prevTests, { id: '', name: '', rate: 0, referenceRange: '', interpretation: '' }]);
  };

  const handleRemoveTest = (index, dataType) => {
    const updateState = (setState) => {
      setState((prevTests) => prevTests.filter((_, i) => i !== index));
    };

    switch (dataType) {
      case 'serology':
        updateState(setSerData);
        break;
      case 'widal-h':
        updateState(setDatas);
        break;
      case 'widal-h1':
        updateState(setDatas);
        break;
      case 'Parasitology':
        updateState(setMarData);
        break;
      case 'Hearmotology':
        updateState(setHerData);
        break;
      case 'liver': 
        updateState(setSData);
        break;
      case 'kidney': 
        updateState(setSData);
        break;
      case 'lipid': 
        updateState(setSData);
        break;
      case 'urinalysis': 
        updateState(setUrinalysis);
        break;
      default:
        console.error(`Unsupported dataType: ${dataType}`);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/test-booking/delete', {
        data: { ids: checkedItems }
      });
  
      console.log('Deletion response:', response.data);
  
      const filterTests = (stateSetter, stateData, dataType) => {
        stateSetter(prevState => prevState.filter((_, index) => !checkedItems[dataType]?.includes(index)));
      };
  
      filterTests(setTests, tests, 'tests');
      filterTests(setDatas, datas, 'datas');
      filterTests(setSerData, serData, 'serology');
      filterTests(setHerData, herData, 'Hearmotology');
      filterTests(setMalData, maldata, 'malData');
      filterTests(setMarData, marData, 'marData');
      filterTests(setSData, sData, 'sData');
      filterTests(setUrinalysis, urinalysis, 'urinalysis');
  
      setCheckedItems({});
    } catch (error) {
      console.error('Error deleting test bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChanges = (index, event) => {
    const newFields = fields.map((field, idx) => {
      if (idx === index) {
        return { ...field, value: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };

  // Define Root and CustomTable styled components
  const Root = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  }));

  const CustomTable = styled(Table)({
    minWidth: 300,
  });

  return (
    <Root>
      <Fade in={true} timeout={1000} appear ref={contentRef} id='pdf-content'>
        <Container maxWidth={false} sx={{ marginTop: 1000, marginBottom: 60 }}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
              LABORATORY INVESTIGATION REPORT 
              <img align='right' src={company} alt="Company Logo" />
            </Typography>
            <Typography variant="h6" align="center" color="primary" gutterBottom>BIODATA</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Patient ID"
                  name="patient_no"
                  value={patientData.patient_no}
                  onChange={handleChange}
                  variant="outlined"
                  size="medium"
                />
              </Grid>
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
                  name="lab_no"
                  value={patientData.lab_no}
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
                  name="investigation"
                  value={patientData.investigation}
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
            </Grid>

            {/* Serology Section */}
            <Typography variant="h6" align="center" color="primary" gutterBottom>SEROLOGY</Typography>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">TEST</TableCell>
                    <TableCell align="center">METHODOLOGY</TableCell>
                    <TableCell align="center">RESULT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Checkbox
                          checked={checkedItems['serology']?.includes(index)}
                          onChange={() => handleCheckboxChange('serology', index)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          name="test"
                          value={row.test}
                          onChange={(event) => handleSerologyInputChange(index, event)}
                          variant="standard"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          name="methodology"
                          value={row.methodology}
                          onChange={(event) => handleSerologyInputChange(index, event)}
                          variant="standard"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          name="result"
                          value={row.result}
                          onChange={(event) => handleSerologyInputChange(index, event)}
                          variant="standard"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Typhoid Test (Widal) Section */}
            <Typography variant="h6" align="center" color="primary" gutterBottom>TYPHOID TEST (WIDAL)</Typography>
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
                  {datas.map((data, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell align="center">
                          <Checkbox
                            checked={checkedItems['Widal-h']?.includes(index)}
                            onChange={() => handleCheckboxChange('Widal-h', index)}
                          />
                        </TableCell>
                        <TableCell>ANTIBODY H</TableCell>
                        <TableCell>
                          <TextField
                            name="salmonellaTyphiH"
                            value={data.salmonellaTyphiH}
                            onChange={(event) => handleDataChange(index, event)}
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="paratyphiAH"
                            value={data.paratyphiAH}
                            onChange={(event) => handleDataChange(index, event)}
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="paratyphiBH"
                            value={data.paratyphiBH}
                            onChange={(event) => handleDataChange(index, event)}
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="paratyphiCH"
                            value={data.paratyphiCH}
                            onChange={(event) => handleDataChange(index, event)}
                            variant="standard"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Checkbox
                            checked={checkedItems['widal-h1']?.includes(index)}
                            onChange={() => handleCheckboxChange('widal-h1', index)}
                          />
                        </TableCell>
                        <TableCell>ANTIBODY O</TableCell>
                        <TableCell>
                          <TextField
                            name="salmonellaTyphiO"
                            value={data.salmonellaTyphiO}
                            onChange={(event) => handleDataChange(index, event)}
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="paratyphiAO"
                            value={data.paratyphiAO}
                            onChange={(event) => handleDataChange(index, event)}
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="paratyphiBO"
                            value={data.paratyphiBO}
                            onChange={(event) => handleDataChange(index, event)}
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name="paratyphiCO"
                            value={data.paratyphiCO}
                            onChange={(event) => handleDataChange(index, event)}
                            variant="standard"
                          />
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" align="justify" sx={{ marginTop: 6 }}>
              <strong>REFERENCE RANGES</strong><br />
              Salmonellas: Significant value Titres ≥1/80 (O antibodies) and 1/160 (H antibodies) indicates recent infection.
            </Typography>

            {/* Parasitology Section */}
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

            {/* Haematology Section */}
            <Typography variant="h6" component="div" gutterBottom>
              <strong style={{ color: '#00b0f0' }}>HAEMATOLOGY AND COAGULATION STUDIES</strong>
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell><strong>INVESTIGATION</strong></TableCell>
                    <TableCell align="center"><strong>RESULT</strong></TableCell>
                    <TableCell><strong>REFERENCE RANGE</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {herData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Checkbox
                          checked={checkedItems['Hearmotology']?.includes(index)}
                          onChange={() => handleCheckboxChange('Hearmotology', index)}
                        />
                      </TableCell>
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

            {/* Medical Microbiology Section */}
            <Typography variant="h6" align="center" gutterBottom>
              <strong>MEDICAL MICROBIOLOGY</strong>
            </Typography>
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>

                    <TableCell width={0.5}></TableCell>
                    <TableCell width={400}><strong>URINALYSIS</strong></TableCell>
                    <TableCell width={500}></TableCell>
                    <TableCell width={400}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urinalysis.map((row, index) => (
                    <React.Fragment key={index}>
                      {Object.entries(row).map(([key, value]) => (
                        <TableRow key={index}>
                          <TableCell align="center">
                            <Checkbox
                              checked={checkedItems['urinalysis']?.includes(index)}
                              onChange={() => handleCheckboxChange('urinalysis', index)}
                            />
                          </TableCell>
                          <TableCell style={{ width: '144.95pt', borderTop: '0.75pt solid #000000', borderRight: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                            <Typography variant="body1">{row.urinalysis}</Typography>
                          </TableCell>
                          <TableCell style={{ width: '145.05pt', borderTop: '0.75pt solid #000000', borderLeft: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                            <TextField
                              name={key}
                              value={value}
                              onChange={(e) => handleInputChange(index, 'result', e.target.value)}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>{row.methodology}</TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Chemical Pathology Section */}
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
                  {sData.map((sdata, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                          <strong>LIVER FUNCTION TEST</strong>
                        </TableCell>
                      </TableRow>
                      <Checkbox
                        checked={checkedItems['liver']?.includes(index)}
                        onChange={() => handleCheckboxChange('liver', index)}
                      />
                      <TableRow>
                        <TableCell>Bilirubin Total</TableCell>
                        <TableCell>Modified TAB (End Point)</TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            name="bilirubinTotal"
                            value={sdata.bilirubinTotal}
                            onChange={handleChangei}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell colSpan={2}>&lt;1.3 mg/dL</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                          <strong>KIDNEY FUNCTION TEST</strong>
                        </TableCell>
                      </TableRow>
                      <Checkbox
                        checked={checkedItems['kidney']?.includes(index)}
                        onChange={() => handleCheckboxChange('kidney', index)}
                      />
                      <TableRow>
                        <TableCell>Urea</TableCell>
                        <TableCell colSpan={2}>Modified Berthelot (End Point)</TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            name="urea"
                            value={sdata.urea}
                            onChange={handleChangei}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>10-55 mg/dL</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                          <strong>LIPID PROFILE</strong>
                        </TableCell>
                      </TableRow>
                      <Checkbox
                        checked={checkedItems['lipid']?.includes(index)}
                        onChange={() => handleCheckboxChange('lipid', index)}
                      />
                      <TableRow>
                        <TableCell>Total Cholesterol</TableCell>
                        <TableCell colSpan={2}>CHOD- PAP Method</TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            name="totalCholesterol"
                            value={sdata.totalCholesterol}
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
                      <TableRow>
                        <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                          <strong>BLOOD SUGAR TEST</strong>
                        </TableCell>
                      </TableRow>
                      <Checkbox
                        checked={checkedItems['blood']?.includes(index)}
                        onChange={() => handleCheckboxChange('blood', index)}
                      />
                      <TableRow>
                        <TableCell>Fasting Blood Sugar</TableCell>
                        <TableCell colSpan={2}>Glucometer</TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            name="fastingBloodSugar"
                            value={sdata.fastingBloodSugar}
                            onChange={handleChangei}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>80 - 120 mg/dL</TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Overall Tests Section */}
            <Typography variant="h6" align="center" color="primary" gutterBottom>OVERALL TESTS</Typography>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price_naira"
                    value={`${test.price_naira}`}
                    onChange={(e) => handleTestChange(index, 'price_naira', e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Remark"
                    name="remark"
                    value={test.remark}
                    onChange={(e) => handleTestChange(index, 'remark', e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="secondary" onClick={() => handleRemoveTest(index)}>Remove</Button>
                </Grid>
              </Grid>
            ))}
            
            {/* Medical Reports Section */}
            <Root>
              <Typography variant="h6" gutterBottom>MEDICAL REPORTS</Typography>
              <TableContainer>
                <CustomTable aria-label="simple table">
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">{field.label}:</TableCell>
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
              <Typography variant="body2" gutterBottom>END OF MEDICAL REPORTS</Typography>
              {authorizedBy && (
                <Typography variant="body2" gutterBottom>
                  AUTHORIZED BY: {authorizedBy.name} ({authorizedBy.title})
                </Typography>
              )}
              <Button variant="contained" color="primary" onClick={() => console.log(fields)}>Save</Button>
            </Root>

            {/* Buttons Section */}
            <Grid container spacing={3} sx={{ marginTop: 3 }}>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" color="secondary" onClick={handleDelete}>DELETE</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" onClick={handleSavePdf}>SAVE AS PDF</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
              </Grid>
            </Grid>
            <Button variant="outlined" color="primary" onClick={handleAddTest}>Add Test</Button>
          </Paper>
        </Container>
      </Fade>
    </Root>
  );
};

export default TestBooking;
