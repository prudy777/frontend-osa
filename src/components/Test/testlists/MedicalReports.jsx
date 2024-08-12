import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
}));

const CustomTable = styled(Table)({
  minWidth: 300,
});

const MedicalReports = ({ fields, handleChanges, authorizedBy }) => {
  return (
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
  );
};

export default MedicalReports;
