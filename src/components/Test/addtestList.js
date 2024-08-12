import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Document, Packer, Paragraph, ImageRun } from 'docx';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';
import company from '../../assets/company.png';
import { Container, Checkbox, Grid, TextField, MenuItem, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';
import SerologyTable from './testlists/serology';
import WidalTable from './testlists/Widaltest';
import ParasitologyTable from './testlists/parasitology';
import HaematologyTable from './testlists/Haermotology';
import UrinalysisTable from './testlists/Urinalysis';
import ChemistryTable from './testlists/chemistry';
import MedicalReports from './testlists/MedicalReports';

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
  const [serData, setSerData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [marData, setMarData] = useState([]);
  const [herData, setHerData] = useState([]);
  const [comments, setComments] = useState({
    redBloodCells: 'Normocytic Normochromic red cells.',
    whiteBloodCells: 'Leucocyte values are within normal limits.',
    platelets: 'Normal and adequate.',
  });
  const [urinalysis, setUrinalysis] = useState([]);
  const [sData, setSData] = useState([]);
  const [fields, setFields] = useState([]);
  const authorizedBy = {
    name: 'OSAWEMEN EMMANUEL',
    title: 'Chief Medical Officer',
  };
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patient) {
      setPatientData(initialPatientData);
    }
  }, [patient, initialPatientData]);

  const handleCheckboxChange = (dataType, index) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };
      if (!updatedCheckedItems[dataType]) {
        updatedCheckedItems[dataType] = [];
      }
      if (updatedCheckedItems[dataType].includes(index)) {
        updatedCheckedItems[dataType] = updatedCheckedItems[dataType].filter(i => i !== index);
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
    if (patient) {
      setPatientData(initialPatientData);
      setTests(initialTests);
    }
  };

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
        tests
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
      tests,
      fields,
      authorizedBy,
    };
  };

  const contentRef = useRef(null);

  const handlePrint = async () => {
    const input = contentRef.current;
    if (input) {
      try {
        const dataUrl = await htmlToImage.toPng(input, { quality: 0.95 });
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: [
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: dataUrl.split(',')[1],
                      transformation: {
                        width: 600,
                        height: 800,
                      },
                    }),
                  ],
                }),
              ],
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, 'test-booking-report.docx');
      } catch (error) {
        console.error('Error generating document:', error);
      }
    } else {
      console.error('Element not found: pdf-content');
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
      case 'Parasitology':
        updateState(setMarData);
        break;
      case 'Hearmotology':
        updateState(setHerData);
        break;
      case 'liver':
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
      // Filter tests to remove only checked items
      const filterTests = (tests, table) => {
        return tests.filter((_, index) => !checkedItems[table]?.includes(index));
      };

      setTests(filterTests(tests, 'tests'));
      setDatas(filterTests(datas, 'widal-h'));
      setSerData(filterTests(serData, 'serology'));
      setHerData(filterTests(herData, 'Hearmotology'));
      setMarData(filterTests(marData, 'Parasitology'));
      setSData(filterTests(sData, 'liver'));
      setUrinalysis(filterTests(urinalysis, 'urinalysis'));

      setCheckedItems({});
    } catch (error) {
      console.error('Error deleting test bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in={true} timeout={1000} appear ref={contentRef} id='pdf-content'>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 750,
          opacity: 1,
          transition: 'opacity 1s ease-out',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            LABORATORY INVESTIGATION REPORT <img align='right' src={company} alt="Company Logo" />
          </Typography>
          <Typography variant="h6" align="center" color="primary" gutterBottom>
            BIODATA
          </Typography>
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

          <SerologyTable
            serData={serData}
            handleSerologyInputChange={handleSerologyInputChange}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
          <WidalTable
            datas={datas}
            handleDataChange={handleDataChange}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ParasitologyTable
            marData={marData}
            handleMalDataChange={handleMalDataChange}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
          <HaematologyTable
            herData={herData}
            handleInputChange={handleInputChange}
            comments={comments}
            handleCommentsChange={handleCommentsChange}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
          <UrinalysisTable
            urinalysis={urinalysis}
            handleUrinalysisChange={handleUrinalysisChange}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ChemistryTable
            sData={sData}
            handleChangei={handleChangei}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
          <MedicalReports
            fields={fields}
            handleChanges={handleChanges}
            authorizedBy={authorizedBy}
          />
          <Button fullWidth variant="contained" color="secondary" onClick={handleDelete}>
            DELETE
          </Button>
          <Button variant="outlined" color="primary" onClick={handleAddTest}>
            Add Test
          </Button>
          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={12} sm={6}>
              <Button fullWidth variant="contained" color="primary" onClick={handlePrint}>
                Download Data
              </Button>
              <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth variant="outlined" color="secondary" onClick={handleCancel}>
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
