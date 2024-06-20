import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PrintedTests = () => {
  const [printedTests, setPrintedTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchPrintedTests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/masters');
        setPrintedTests(response.data);
      } catch (error) {
        console.error('Error fetching printed tests:', error);
        setError('Failed to fetch printed tests');
      } finally {
        setLoading(false);
      }
    };

    fetchPrintedTests();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 4,
        marginLeft: isMobile ? 0 : 'auto',
        padding: isMobile ? 2 : 0,
      }}
    >
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>Printed Tests Results</Typography>
        <TableContainer component={Paper}>
          <Box sx={{ overflowX: 'auto' }}>
            <Table size={isMobile ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell>Patient ID</TableCell>
                  <TableCell>Lab No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Investigation</TableCell>
                  <TableCell>Specimen</TableCell>
                  <TableCell>Referred By</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Price (Naira)</TableCell>
                  <TableCell>Reference Range</TableCell>
                  <TableCell>Interpretation</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {printedTests.map((test) => (
                  <TableRow key={test.test_id}>
                    <TableCell>{test.patient_id ?? 'N/A'}</TableCell>
                    <TableCell>{test.lab_no ?? 'N/A'}</TableCell>
                    <TableCell>{test.name ?? 'N/A'}</TableCell>
                    <TableCell>{test.sex ?? 'N/A'}</TableCell>
                    <TableCell>{test.age ?? 'N/A'}</TableCell>
                    <TableCell>{test.investigation ?? 'N/A'}</TableCell>
                    <TableCell>{test.specimen ?? 'N/A'}</TableCell>
                    <TableCell>{test.referred_by ?? 'N/A'}</TableCell>
                    <TableCell>{test.date ?? 'N/A'}</TableCell>
                    <TableCell>{test.rate ?? 'N/A'}</TableCell>
                    <TableCell>{test.price_naira ?? 'N/A'}</TableCell>
                    <TableCell>{test.reference_range ?? 'N/A'}</TableCell>
                    <TableCell>{test.interpretation ?? 'N/A'}</TableCell>
                    <TableCell>{test.remark ?? 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default PrintedTests;
