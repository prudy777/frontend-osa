  import React, { useState, useEffect, useRef } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { styled } from '@mui/system';
  import html2pdf from 'html2pdf.js';
  import { Container, Checkbox, Grid, TextField, MenuItem, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';
  import company from '../../assets/company.png';
  const TestBooking = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate hook
    const { patient } = location.state || {};
    const phoneNumber = location.state?.phone || ''; // Get the phone number from state

    useEffect(() => {
      // Redirect to NotAvailablePage if location.state is undefined
      if (!location.state) {
        navigate('/NotAvailablePage');
        return; // Exit early to prevent further rendering
      }
    }, [location.state, navigate]);


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

    const TwoId = (word = '') => {
      if (typeof word !== 'string') {
        return '';
      }
    
      return word.length < 2 ? word : word.substring(0, 2);
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

    const handleDataChange = (index, event) => {
      const { name, value } = event.target;
    
      // Update datas state
      setDatas((prevData) => {
        const updatedData = [...prevData];
        if (updatedData[index]) {
          updatedData[index] = {
            ...updatedData[index],
            [name]: value,
          };
        }
        return updatedData;
      });
    
    
    };
    
    const handleMarDataChange = (index, key, value) => {
      setMarData((prevData) => {
        // Ensure prevData is an array before updating
        const updatedData = Array.isArray(prevData) ? [...prevData] : [];
    
        if (updatedData[index]) {
          updatedData[index] = {
            ...updatedData[index],
            [key]: value,  // Use the 'key' as the dynamic field name
          };
        } else {
          console.error(`Data at index ${index} is undefined`);
        }
    
        return updatedData;
      });
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
    const [comments, setComments] = useState([{
      redBloodCells: 'Normocytic Normochromic red cells.',
      whiteBloodCells: 'Leucocyte values are within normal limits.',
      platelets: 'Normal and adequate.',
    }]);

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


    const initData = {
      liverFunction: {
        bilirubinTotal: {
          value: '0.6',
          methodology: 'Modified TAB (End Point)',
          referenceRange: '<1.3 mg/dL',
        },
        bilirubinDirect: {
          value: '0.2',
          methodology: 'Direct Bilirubin Assay',
          referenceRange: '<0.3 mg/dL',
        },
        astSgot: {
          value: '31',
          methodology: 'AST Assay (End Point)',
          referenceRange: '0-35 IU/L',
        },
        altSgpt: {
          value: '32',
          methodology: 'ALT Assay (End Point)',
          referenceRange: '0-45 IU/L',
        },
        alp: {
          value: '209',
          methodology: 'ALP Assay (End Point)',
          referenceRange: '50-136 IU/L',
        },
        albumin: {
          value: '4.0',
          methodology: 'Albumin Assay',
          referenceRange: '3.5-5.0 g/dL',
        },
        totalProtein: {
          value: '82',
          methodology: 'Protein Assay',
          referenceRange: '60-83 g/L',
        },
      },
      kidneyFunction: {
        urea: {
          value: '20',
          methodology: 'Modified Berthelot (End Point)',
          referenceRange: '10-55 mg/dL',
        },
        creatinine: {
          value: '1.0',
          methodology: 'Creatinine Assay (End Point)',
          referenceRange: '0.6-1.3 mg/dL',
        },
      },
      electrolytes: {
        sodium: {
          value: '138',
          methodology: 'Sodium Ion Assay',
          referenceRange: '135-145 mmol/L',
        },
        potassium: {
          value: '3.6',
          methodology: 'Potassium Ion Assay',
          referenceRange: '3.5-5.0 mmol/L',
        },
        chloride: {
          value: '98',
          methodology: 'Chloride Ion Assay',
          referenceRange: '98-107 mmol/L',
        },
        bicarbonate: {
          value: '25',
          methodology: 'Bicarbonate Ion Assay',
          referenceRange: '22-29 mmol/L',
        },
      },
      lipidProfile: {
        totalCholesterol: {
          value: '152',
          methodology: 'CHOD- PAP Method',
          referenceRange: '<200 mg/dL',
        },
        hdl: {
          value: '72',
          methodology: 'HDL Assay',
          referenceRange: '>40 mg/dL',
        },
        ldl: {
          value: '65',
          methodology: 'LDL Assay',
          referenceRange: '<100 mg/dL',
        },
        triglycerides: {
          value: '74',
          methodology: 'Triglyceride Assay',
          referenceRange: '<150 mg/dL',
        },
        vldl: {
          value: '26',
          methodology: 'VLDL Assay',
          referenceRange: '<30 mg/dL',
        },
      },
      bloodSugar: {
        fastingBloodSugar: {
          value: '101',
          methodology: 'Glucometer',
          referenceRange: '80-120 mg/dL',
        },
      },
    };
    

    const [sData, setSData] = useState([initData]);

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

    const contentRef = useRef(null);

    const handleSavePdf = () => {
      const element = document.getElementById('pdf-content'); // Reference to the section of the page you want to convert to PDF
  
      const options = {
        margin: 0.5,
        filename: 'Laboratory_Investigation_Report.pdf',
        image: { type: 'jpeg', quality: 0.58 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
  
      html2pdf().from(element).set(options).save();
    };
    

    const handleSendWhatsApp = () => {
      const message = `Hello, your laboratory investigation report is ready. Please review it at your earliest convenience.`;
      if (phoneNumber) {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        alert('No WhatsApp number available.');
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
    
        // This function will filter out only the checked items
        const filterCheckedItems = (stateSetter, stateData, dataType) => {
          // Filter out only the unchecked items, keeping them in the state
          stateSetter(prevState => prevState.filter((_, index) => !checkedItems[dataType]?.includes(index)));
        };
    
        // Apply the filtering to each data type, only removing the checked items
        filterCheckedItems(setTests, tests, 'tests');
        filterCheckedItems(setDatas, datas, 'datas');
        filterCheckedItems(setSerData, serData, 'serology');
        filterCheckedItems(setHerData, herData, 'Hearmotology');
        filterCheckedItems(setMarData, marData, 'marData');
        filterCheckedItems(setUrinalysis, urinalysis, 'urinalysis');
        
        // Filter the state for each data type
    setSData(prevSData => prevSData.filter((_, index) => {
      const isLiverChecked = checkedItems['liver']?.includes(index);
      const isKidneyChecked = checkedItems['kidney']?.includes(index);
      const isLipidChecked = checkedItems['lipid']?.includes(index);
      const isBloodChecked = checkedItems['blood']?.includes(index);

      // If any of these are checked, filter them out (remove them)
      return !(isLiverChecked || isKidneyChecked || isLipidChecked || isBloodChecked);
    }));

        // Clear checked items after deletion
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

    // SUBMIT FUNCTION
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = {
        patientData,
        tests,
      };

      const response = await axios.post('http://localhost:4000/printed-tests', formData);
      console.log('Saved successfully:', response.data);
      alert('Test booking saved successfully!');
    } catch (error) {
      console.error('Error saving test booking:', error);
      alert('Failed to save test booking.');
    } finally {
      setLoading(false);
    }
  };

    return (
      <Fade in={true} timeout={1000} appear ref={contentRef} >
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
      handleInputChange={handleMarDataChange}
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
                    <TableRow>
              <TableCell></TableCell>
              <TableCell><strong>INVESTIGATION</strong></TableCell>
              <TableCell><strong>METHODOLOGY</strong></TableCell>
              <TableCell><strong>VALUE</strong></TableCell>
              <TableCell><strong>REFERENCE RANGES</strong></TableCell>
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
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={checkedItems['liver']?.includes(index)} // Check if the row is selected
                      onChange={() => handleCheckboxChange('liver', index)} // Handle checkbox change
                    />
                  </TableCell>
                  <TableCell>Bilirubin Total</TableCell>
                  <TableCell>Modified TAB (End Point)</TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      name="bilirubinTotal"
                      value={sdata.bilirubinTotal}
                      onChange={(e) => handleChangei(index, e)}
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
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={checkedItems['kidney']?.includes(index)}
                      onChange={() => handleCheckboxChange('kidney', index)}
                    />
                  </TableCell>
                  <TableCell>Urea</TableCell>
                  <TableCell>Modified Berthelot (End Point)</TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      name="urea"
                      value={sdata.urea}
                      onChange={(e) => handleChangei(index, e)}
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
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={checkedItems['lipid']?.includes(index)}
                      onChange={() => handleCheckboxChange('lipid', index)}
                    />
                  </TableCell>
                  <TableCell>Total Cholesterol</TableCell>
                  <TableCell>CHOD- PAP Method</TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      name="totalCholesterol"
                      value={sdata.totalCholesterol}
                      onChange={(e) => handleChangei(index, e)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>Rec: &lt;200mg/dL</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={6} style={{ width: '503.1pt', border: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                    <strong>BLOOD SUGAR TEST</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={checkedItems['blood']?.includes(index)}
                      onChange={() => handleCheckboxChange('blood', index)}
                    />
                  </TableCell>
                  <TableCell>Fasting Blood Sugar</TableCell>
                  <TableCell>Glucometer</TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      name="fastingBloodSugar"
                      value={sdata.fastingBloodSugar}
                      onChange={(e) => handleChangei(index, e)}
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
                <Button variant="contained" color="success" onClick={handleSendWhatsApp}>SEND TO WHATSAPP</Button>
              </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
              </Grid>
              <Button variant="outlined" color="primary" onClick={handleAddTest}>Add Test</Button>
              <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading} // Disable button when loading
      >
        {loading ? 'Submitting...' : 'Submit and Save'}
      </Button>
            </Paper>
          </Container>
       </Fade>
    );
  };

  export default TestBooking;
