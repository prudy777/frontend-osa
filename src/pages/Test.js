import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Grid, TextField, Checkbox } from '@mui/material';

const TestBookingsList = () => {
  const [testBookings, setTestBookings] = useState([]);
  const [editablePrices, setEditablePrices] = useState({});
  const [editableRanges, setEditableRanges] = useState({});
  const [editableInterpretations, setEditableInterpretations] = useState({});
  const [selectedBookings, setSelectedBookings] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestBookings = async () => {
      try {
        const response = await axios.get('https://frontend-osa.vercel.app/test-bookings');
        const bookings = response.data;
        console.log('Fetched Test Bookings:', bookings); // Debugging log
        setTestBookings(bookings);

        const prices = bookings.reduce((acc, booking) => {
          acc[`${booking.id}-${booking.test_id}`] = booking.price_naira;
          return acc;
        }, {});
        setEditablePrices(prices);

        const ranges = bookings.reduce((acc, booking) => {
          acc[`${booking.id}-${booking.test_id}`] = booking.reference_range || '';
          return acc;
        }, {});
        setEditableRanges(ranges);

        const interpretations = bookings.reduce((acc, booking) => {
          acc[`${booking.id}-${booking.test_id}`] = booking.interpretation || '';
          return acc;
        }, {});
        setEditableInterpretations(interpretations);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching test bookings:', error);
        setError('Failed to fetch test bookings');
        setLoading(false);
      }
    };

    fetchTestBookings();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const selectedRows = testBookings.filter(booking => selectedBookings[`${booking.id}-${booking.test_id}`]);
      const total = selectedRows.reduce((acc, booking) => {
        const price = parseFloat(editablePrices[`${booking.id}-${booking.test_id}`]) || 0;
        return acc + price;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedBookings, editablePrices, testBookings]);

  const handlePriceChange = (id, testId, value) => {
    const key = `${id}-${testId}`;
    setEditablePrices((prevPrices) => ({
      ...prevPrices,
      [key]: value,
    }));
  };

  const handleRangeChange = (id, testId, value) => {
    const key = `${id}-${testId}`;
    setEditableRanges((prevRanges) => ({
      ...prevRanges,
      [key]: value,
    }));
  };

  const handleInterpretationChange = (id, testId, value) => {
    const key = `${id}-${testId}`;
    setEditableInterpretations((prevInterpretations) => ({
      ...prevInterpretations,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (id, testId) => {
    const key = `${id}-${testId}`;
    setSelectedBookings((prevSelected) => ({
      ...prevSelected,
      [key]: !prevSelected[key],
    }));
  };

  const handlePrint = async () => {
    const selectedRows = testBookings.filter(booking => selectedBookings[`${booking.id}-${booking.test_id}`]);
    if (selectedRows.length === 0) {
      alert('No bookings selected for printing.');
      return;
    }
    const doc = new jsPDF();
    doc.text('Test Bookings', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['ID', 'Patient ID', 'Lab No', 'Name', 'Sex', 'Age', 'Age Unit', 'Panel', 'Referred By', 'Date', 'Test ID', 'Test Name', 'Rate', 'Price (Naira)', 'Reference Range', 'Interpretation']],
      body: selectedRows.map(booking => [
        booking.id,
        booking.patient_id,
        booking.lab_no,
        booking.name,
        booking.sex,
        booking.age,
        booking.age_unit,
        booking.panel,
        booking.referred_by,
        booking.date,
        booking.test_id,
        booking.test_name,
        booking.rate,
        editablePrices[`${booking.id}-${booking.test_id}`],  // Use editable price
        editableRanges[`${booking.id}-${booking.test_id}`],  // Use editable reference range
        editableInterpretations[`${booking.id}-${booking.test_id}`],  // Use editable interpretation
      ]),
    });
    doc.save('test-results.pdf');
    await savePrintedTests(selectedRows);
  };

  const savePrintedTests = async (tests) => {
    try {
      await axios.post('https://frontend-osa.vercel.app/masters', { tests });
    } catch (error) {
      console.error('Error saving printed tests:', error);
    }
  };
   

  const handleDelete = () => {
    const selectedRows = testBookings.filter(booking => selectedBookings[`${booking.id}-${booking.test_id}`]);
    if (selectedRows.length === 0) {
      alert('No bookings selected for deletion.');
      return;
    }
    const deleteRequests = selectedRows.map(booking => 
      axios.delete(`https://frontend-osa.vercel.app/test-bookings/${booking.id}`)
    );
    Promise.all(deleteRequests)
      .then(() => {
        alert('Selected bookings deleted successfully.');
        setTestBookings(prevBookings => 
          prevBookings.filter(booking => !selectedBookings[`${booking.id}-${booking.test_id}`])
        );
        setSelectedBookings({});
      })
      .catch(error => {
        console.error('Error deleting test bookings:', error);
        alert('Failed to delete selected bookings.');
      });
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }



  return (
    <Container maxWidth="lg" sx={{ marginTop: 60 }}>
      <Paper sx={{ padding: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>Test Results</Typography>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
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
              {testBookings.map((booking) => (
                <TableRow key={`${booking.id}-${booking.test_id}`}>
                  <TableCell>
                    <Checkbox
                      checked={!!selectedBookings[`${booking.id}-${booking.test_id}`]}
                      onChange={() => handleCheckboxChange(booking.id, booking.test_id)}
                    />
                  </TableCell>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.patient_id}</TableCell>
                  <TableCell>{booking.lab_no}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.sex}</TableCell>
                  <TableCell>{booking.age}</TableCell>
                  <TableCell>{booking.age_unit}</TableCell>
                  <TableCell>{booking.panel}</TableCell>
                  <TableCell>{booking.referred_by}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.test_id}</TableCell>
                  <TableCell>{booking.test_name}</TableCell>
                  <TableCell>{booking.rate}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={editablePrices[`${booking.id}-${booking.test_id}`] || ''}
                      onChange={(e) => handlePriceChange(booking.id, booking.test_id, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ width: '150px' }}
                      inputProps={{
                        min: 0,
                        style: { textAlign: 'right' },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={editableRanges[`${booking.id}-${booking.test_id}`] || ''}
                      onChange={(e) => handleRangeChange(booking.id, booking.test_id, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ width: '150px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      value={editableInterpretations[`${booking.id}-${booking.test_id}`] || ''}
                      onChange={(e) => handleInterpretationChange(booking.id, booking.test_id, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ width: '150px' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total Price (Naira): {totalPrice.toFixed(2)}
        </Typography>
        <Grid container justifyContent="flex-end" spacing={2} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handlePrint}>Print</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TestBookingsList;
