import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Typography } from '@mui/material';

const HaematologyTable = ({ herData, handleInputChange, comments, handleCommentsChange, checkedItems, handleCheckboxChange }) => {
  return (
    <>
      <Typography variant="h5" style={{ marginBottom: '16px', color: '#00b0f0', fontFamily: 'Century Gothic' }}>
        HAEMATOLOGY AND COAGULATION STUDIES
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
    </>
  );
};

export default HaematologyTable;
