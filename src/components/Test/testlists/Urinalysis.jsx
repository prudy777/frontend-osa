import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Typography } from '@mui/material';

const UrinalysisTable = ({ urinalysis, handleUrinalysisChange, checkedItems, handleCheckboxChange }) => {
  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        <strong>MEDICAL MICROBIOLOGY</strong>
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table style={{ border: '0.75pt solid #000000' }}>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: '2.05pt', borderLeft: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '1.03pt', paddingLeft: '1.03pt', verticalAlign: 'top' }}></TableCell>
              <TableCell style={{ width: '144.95pt', borderRight: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                <Typography variant="h6"><strong>URINALYSIS</strong></Typography>
              </TableCell>
              <TableCell style={{ width: '145.05pt', borderLeft: '0.75pt solid #000000', borderBottom: '0.75pt solid #000000', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}></TableCell>
            </TableRow>
            {urinalysis.map((test, index) => (
              <React.Fragment key={index}>
                {Object.entries(test).map(([key, value]) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <Checkbox
                        checked={checkedItems['urinalysis']?.includes(index)}
                        onChange={() => handleCheckboxChange('urinalysis', index)}
                      />
                    </TableCell>
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
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UrinalysisTable;
