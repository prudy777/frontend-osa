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
  TextField,
  Button,
  styled,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PrintedTests = () => {
  const [printedTests, setPrintedTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTests, setFilteredTests] = useState([]);
  const [visibleTests, setVisibleTests] = useState(15);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchPrintedTests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/masters');
        setPrintedTests(response.data);
        setFilteredTests(response.data); // Initialize with full data
      } catch (error) {
        console.error('Error fetching printed tests:', error);
        setError('Failed to fetch printed tests');
      } finally {
        setLoading(false);
      }
    };

    fetchPrintedTests();
  }, []);

  useEffect(() => {
    const results = printedTests.filter(test =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patient_id.toString().includes(searchTerm)
    );
    setFilteredTests(results);
  }, [searchTerm, printedTests]);

  const showMoreTests = () => {
    setVisibleTests(prevVisibleTests => prevVisibleTests + 15);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 40 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: 40 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  const Root = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: 40,
  }));

  return (
    <Root>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 4,
          marginLeft: isMobile ? 0 : 'auto',
          padding: isMobile ? 2 : 0,
        }}
      >
        <Paper sx={{ padding: 2, }}>
          <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>Printed Tests Results</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              label="Search by Name or Patient ID"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ marginRight: 2, }}
            />
            <Button variant="contained" color="primary" sx={{ width: '100px'}}>
              Search
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Box sx={{ overflowX: 'auto' }}>
              <Table size={isMobile ? 'small' : 'medium'} sx={{ marginTop: 4 }}>
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
                  {filteredTests.slice(0, visibleTests).map((test) => (
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
              {filteredTests.length > visibleTests && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <Button variant="contained" onClick={showMoreTests}>
                    Show More
                  </Button>
                </Box>
              )}
            </Box>
          </TableContainer>
        </Paper>
      </Container>
    </Root>
  );
};

export default PrintedTests;
