// PrintedTests.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const PrintedTests = () => {
  const [printedTests, setPrintedTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrintedTests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/masters');
        setPrintedTests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching printed tests:', error);
        setError('Failed to fetch printed tests');
        setLoading(false);
      }
    };

    fetchPrintedTests();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 1 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Printed Tests</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Lab No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Age Unit</TableCell>
                <TableCell>Panel</TableCell>
                <TableCell>Referred By</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Test ID</TableCell>
                <TableCell>Test Name</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Price (Naira)</TableCell>
                <TableCell>Reference Range</TableCell>
                <TableCell>Interpretation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {printedTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.id}</TableCell>
                  <TableCell>{test.patient_id}</TableCell>
                  <TableCell>{test.lab_no}</TableCell>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.sex}</TableCell>
                  <TableCell>{test.age}</TableCell>
                  <TableCell>{test.age_unit}</TableCell>
                  <TableCell>{test.panel}</TableCell>
                  <TableCell>{test.referred_by}</TableCell>
                  <TableCell>{test.date}</TableCell>
                  <TableCell>{test.test_id}</TableCell>
                  <TableCell>{test.test_name}</TableCell>
                  <TableCell>{test.rate}</TableCell>
                  <TableCell>{test.price_naira}</TableCell>
                  <TableCell>{test.reference_range}</TableCell>
                  <TableCell>{test.interpretation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default PrintedTests;
