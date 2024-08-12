import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Typography } from '@mui/material';

const EditableParasitologyTableRow = ({ row, index, handleInputChange, checkedItems, handleCheckboxChange }) => (
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

const ParasitologyTable = ({ marData, handleMalDataChange, checkedItems, handleCheckboxChange }) => {
  return (
    <>
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
                checkedItems={checkedItems}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ParasitologyTable;
