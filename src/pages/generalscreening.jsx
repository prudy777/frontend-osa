import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import { Container, Grid, TextField, MenuItem, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';
import company from '../assets/company.png';

const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

const CustomTable = styled(Table)({
  minWidth: 300,
});

const EditableMacroTableRow = ({ row, index, handleInputChange }) => (
  <TableRow>
    <TableCell>
      <TextField
        value={row.h}
        onChange={(e) => handleInputChange(index, 'sensitivity', e.target.value)}
      />
    </TableCell>
    <TableCell>
      <TextField
        value={row.m}
        onChange={(e) => handleInputChange(index, 'test', e.target.value)}
      />
    </TableCell>
    </TableRow>
)
const EditableMicroTableRow = ({ row, index, handleInputChange }) => (
  <TableRow>
    <TableCell>
      <TextField
        value={row.h}
        onChange={(e) => handleInputChange(index, 'sensitivity', e.target.value)}
      />
    </TableCell>
    <TableCell>
      <TextField
        value={row.m}
        onChange={(e) => handleInputChange(index, 'test', e.target.value)}
      />
    </TableCell>
    </TableRow>
)
const EditableSensitivityTableRow = ({ row, index, handleInputChange }) => (
  <TableRow>
    <TableCell>
      <TextField
        value={row.sensitivity}
        onChange={(e) => handleInputChange(index, 'sensitivity', e.target.value)}
      />
    </TableCell>
    <TableCell>
      <TextField
        value={row.test}
        onChange={(e) => handleInputChange(index, 'test', e.target.value)}
      />
    </TableCell>
    </TableRow>
)
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

const Report = ({ title, initialFields, footer, authorizedBy }) => {
  const [fields, setFields] = useState(initialFields);

  const handleChange = (index, event) => {
    const newFields = fields.map((field, idx) => {
      if (idx === index) {
        return { ...field, value: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };

  return (
    <Root>
      <Typography variant="h6" gutterBottom>
        {title}
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
                    onChange={(event) => handleChange(index, event)}
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
        {footer}
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
  );
};

const TestBookings = () => {
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
    specimen: '',
    investigations: '',
  };

  const [patientData, setPatientData] = useState(initialPatientData);
  const [serData, setSerData] = useState([
    { test: 'HEPATITIS B Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'SYPHILIS TEST (VDRL)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'HEPATITIS C Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'HIV TEST (1&2)', methodology: 'Rapid Chromatographic immunoassay', result: 'NON-REACTIVE' },
    { test: 'GHONNORRHEA Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'NEGATIVE' },
    { test: 'H. PYLORI Ab.', methodology: 'Rapid Chromatographic immunoassay', result: 'POSITIVE' },
  ]);

  const [senData, setSenData] = useState([
    {sensitivity: 'Ceftriaxone Subactam', test: '+++'},
    {sensitivity: 'Ofloxacin', test: '+'},
    {sensitivity: 'Levofloxacin', test:'+'},
    {sensitivity: 'Gentamycin', test:'Resistant'},
    {sensitivity: 'Erythromycin', test:'Resistant'},  
    {sensitivity: 'Cefuroxime', test:'Resistant'},  
    {sensitivity: 'Ciprofloxacin', test:'Resistant'},  
    {sensitivity: 'Augumentin', test:'Resistant'},  
    {sensitivity: 'Cefotaxime', test:'Resistant'},  
    {sensitivity: 'Cefexime', test:'Resistant'},  
    {sensitivity: 'Imipenem', test:'Resistant'},  
  ])

  const [miData, setMiData] = useState([
    {h: "Pus cells: 3-6/hpf", m: 'Yeast:  Nil'},
    {h: "Epithelial cells: ++	", m: 'Crystals: Nil'},
    {h: "RBC:Nil", m:"Bacteria cells:  Nil"}

  ])

  const [maData, setMaData] = useState([
    {h: "Pus cells: 2-4/hpf", m: 'Yeast:  Nil'},
    {h: "Epithelial cells: ++	", m: 'Crystals: Nil'},
    {h: "RBC:Nil", m:"Bacteria cells:  Nil"}

  ])

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSerologyInputChange = (index, key, value) => {
    setSerData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [key]: value };
      return newData;
    });
  };
  const handleSensitivityInputChange = (index, key, value) => {
    setSenData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [key]: value };
      return newData;
    });
  };

  const handleMicroInputChange = (index, key, value) => {
    setMiData((prevData) => {
      const newData = [...prevData];
      newData[index] = {...newData[index], [key]: value};
      return newData
    })
  }
 
  const handleMacroInputChange = (index, key, value) => {
    setMaData((prevData) => {
      const newData = [...prevData];
      newData[index] = {...newData[index], [key]: value};
      return newData
    })
  }
  return (
    <Fade in={true} timeout={1000} appear>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 360,
          opacity: 1,
          transition: 'opacity 1s ease-out',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            LABORATORY INVESTIGATION REPORT <img src={company} alt="Company Logo" />
          </Typography>
          <Typography variant="h6" align="center" color="primary" gutterBottom>
            BIODATA
          </Typography>
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
                value={patientData.date}
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
          <Typography variant="h6" align="center" color="primary" gutterBottom>
            SEROLOGY
          </Typography>
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
          MEDICAL MICROBIOLOGY 
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
            <TableHead>
                <TableRow>
            <TableCell align="center">SENSITIVITY</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                {senData.map((row, index) => (
                  <EditableSensitivityTableRow 
                    key={index}
                    row={row}
                    index={index}
                    handleInputChange={handleSensitivityInputChange}
                  />
                ))}
              </TableBody>
               <TableRow>
               <TableHead >HVS M/C/S</TableHead>
               <TableHead>Microscopy</TableHead>
               </TableRow>
               <TableBody>
               {miData.map((row, index) => (
                  <EditableMicroTableRow 
                    key={index}
                    row={row}
                    index={index}
                    handleInputChange={handleMicroInputChange}
                  />))}
               </TableBody>
               <Typography variant="p" gutterBottom><strong>Culture:</strong> Yielded heavy growth of Staphylococcus aureus after 48hours of incubation at 37oC</Typography>
              </Table>
              </TableContainer>
              <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
            <TableHead>
                <TableRow>
            <TableCell> Urine M/C/S
            Macroscopy: Yellow, slightly turbid urine.  </TableCell>
            </TableRow><Typography variant='h6'>Microscopy</Typography></TableHead>
            <TableBody>
               {maData.map((row, index) => (
                  <EditableMacroTableRow 
                    key={index}
                    row={row}
                    index={index}
                    handleInputChange={handleMacroInputChange}
                  />))}
               </TableBody>
               <Typography variant='h6'><strong>Culture</strong>:  Yielded no growth after 48hours of incubation at 37oC</Typography>
            </Table></TableContainer>
          <Report
            title="Report"
            initialFields={[
              { label: 'Field 1', value: '' },
              { label: 'Field 2', value: '' },
            ]}
            footer="END OF REPORT"
            authorizedBy={{ name: 'Dr. John Doe', title: 'Chief Medical Officer' }}
          />
        </Paper>
      </Container>
    </Fade>
  );
};

export default TestBookings;
