import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Typography } from '@mui/material';

const WidalTable = ({ datas, handleDataChange, checkedItems, handleCheckboxChange }) => {
  return (
    <>
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
            {datas.map((data, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell align="center">
                    <Checkbox
                      checked={checkedItems['widal-h']?.includes(index)}
                      onChange={() => handleCheckboxChange('widal-h', index)}
                    />
                  </TableCell>
                  <TableCell>ANTIBODY H</TableCell>
                  <TableCell>
                    <TextField
                      name="salmonellaTyphiH"
                      value={data.salmonellaTyphiH}
                      onChange={(event) => handleDataChange(index, 'salmonellaTyphiH', event.target.value)}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="paratyphiAH"
                      value={data.paratyphiAH}
                      onChange={(event) => handleDataChange(index, 'paratyphiAH', event.target.value)}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="paratyphiBH"
                      value={data.paratyphiBH}
                      onChange={(event) => handleDataChange(index, 'paratyphiBH', event.target.value)}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="paratyphiCH"
                      value={data.paratyphiCH}
                      onChange={(event) => handleDataChange(index, 'paratyphiCH', event.target.value)}
                      variant="standard"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <Checkbox
                      checked={checkedItems['widal-o']?.includes(index)}
                      onChange={() => handleCheckboxChange('widal-o', index)}
                    />
                  </TableCell>
                  <TableCell>ANTIBODY O</TableCell>
                  <TableCell>
                    <TextField
                      name="salmonellaTyphiO"
                      value={data.salmonellaTyphiO}
                      onChange={(event) => handleDataChange(index, 'salmonellaTyphiO', event.target.value)}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="paratyphiAO"
                      value={data.paratyphiAO}
                      onChange={(event) => handleDataChange(index, 'paratyphiAO', event.target.value)}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="paratyphiBO"
                      value={data.paratyphiBO}
                      onChange={(event) => handleDataChange(index, 'paratyphiBO', event.target.value)}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="paratyphiCO"
                      value={data.paratyphiCO}
                      onChange={(event) => handleDataChange(index, 'paratyphiCO', event.target.value)}
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
    </>
  );
};

export default WidalTable;
