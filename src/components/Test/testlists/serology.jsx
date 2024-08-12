import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Typography } from '@mui/material';

const SerologyTable = ({ serData, handleSerologyInputChange, checkedItems, handleCheckboxChange }) => {
  return (
    <>
      <Typography variant="h6" align="center" color="primary" gutterBottom>
        SEROLOGY
      </Typography>
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
                    onChange={(event) => handleSerologyInputChange(index, 'test', event.target.value)}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="methodology"
                    value={row.methodology}
                    onChange={(event) => handleSerologyInputChange(index, 'methodology', event.target.value)}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="result"
                    value={row.result}
                    onChange={(event) => handleSerologyInputChange(index, 'result', event.target.value)}
                    variant="standard"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SerologyTable;
