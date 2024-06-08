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
        const response = await axios.get('https://backend-osa.onrender.com/test-bookings');
        const bookings = response.data;

        setTestBookings(bookings);

        const prices = bookings.reduce((acc, booking) => {
          booking.tests.forEach(test => {
            acc[`${booking.id}-${test.test_name}`] = test.price_naira;
          });
          return acc;
        }, {});
        setEditablePrices(prices);

        const ranges = bookings.reduce((acc, booking) => {
          booking.tests.forEach(test => {
            acc[`${booking.id}-${test.test_name}`] = test.reference_range || '';
          });
          return acc;
        }, {});
        setEditableRanges(ranges);

        const interpretations = bookings.reduce((acc, booking) => {
          booking.tests.forEach(test => {
            acc[`${booking.id}-${test.test_name}`] = test.interpretation || '';
          });
          return acc;
        }, {});
        setEditableInterpretations(interpretations);

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch test bookings');
        setLoading(false);
      }
    };

    fetchTestBookings();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const selectedRows = testBookings.filter(booking => selectedBookings[`${booking.id}`]);
      const total = selectedRows.reduce((acc, booking) => {
        const bookingTotal = booking.tests.reduce((sum, test) => {
          const price = parseFloat(editablePrices[`${booking.id}-${test.test_name}`]) || 0;
          return sum + price;
        }, 0);
        return acc + bookingTotal;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedBookings, editablePrices, testBookings]);

  const handlePriceChange = (id, testName, value) => {
    const key = `${id}-${testName}`;
    setEditablePrices((prevPrices) => ({
      ...prevPrices,
      [key]: value,
    }));
  };

  const handleRangeChange = (id, testName, value) => {
    const key = `${id}-${testName}`;
    setEditableRanges((prevRanges) => ({
      ...prevRanges,
      [key]: value,
    }));
  };

  const handleInterpretationChange = (id, testName, value) => {
    const key = `${id}-${testName}`;
    setEditableInterpretations((prevInterpretations) => ({
      ...prevInterpretations,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (id) => {
    setSelectedBookings((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
  };

  const handlePrint = async () => {
    const selectedRows = testBookings.filter(booking => selectedBookings[`${booking.id}`]);
    if (selectedRows.length === 0) {
      alert('No bookings selected for printing.');
      return;
    }
    const doc = new jsPDF();
    doc.text('Test Bookings', 14, 16);
    selectedRows.forEach(booking => {
      doc.autoTable({
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 20,
        head: [['ID', 'Patient No', 'Lab No', 'Name', 'Sex', 'Age', 'Age Unit', 'Panel', 'Referred By', 'Date', 'Test Name', 'Rate', 'Price (Naira)', 'Reference Range', 'Interpretation']],
        body: booking.tests.map(test => [
          booking.id,
          booking.patient_no,
          booking.lab_no,
          booking.name,
          booking.sex,
          booking.age,
          booking.age_unit,
          booking.panel,
          booking.referred_by,
          booking.date,
          test.test_name,
          test.rate,
          editablePrices[`${booking.id}-${test.test_name}`],
          editableRanges[`${booking.id}-${test.test_name}`],
          editableInterpretations[`${booking.id}-${test.test_name}`],
        ]),
      });
    });
    doc.save('test-results.pdf');
    await savePrintedTests(selectedRows);
  };

  const savePrintedTests = async (tests) => {
    try {
      await axios.post('https://backend-osa.onrender.com/masters', { tests });
    } catch (error) {
      console.error('Error saving printed tests:', error);
    }
  };

  const handleDeleteSelected = async () => {
    const selectedIds = testBookings.filter(booking => selectedBookings[`${booking.id}`]).map(booking => booking.id);
    try {
      await axios.post('https://backend-osa.onrender.com/test-bookings/delete', { ids: selectedIds });
      setTestBookings(prevBookings => prevBookings.filter(booking => !selectedIds.includes(booking.id)));
      setSelectedBookings({});
      setTotalPrice(0);
    } catch (error) {
      console.error('Error deleting selected bookings:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Typography variant="h6">Test Bookings</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Price (Naira)</TableCell>
              <TableCell>Reference Range</TableCell>
              <TableCell>Interpretation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testBookings.map(booking => (
              booking.tests.map(test => (
                <TableRow key={`${booking.id}-${test.test_name}`}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedBookings[`${booking.id}`] || false}
                      onChange={() => handleCheckboxChange(booking.id)}
                    />
                  </TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{test.test_name}</TableCell>
                  <TableCell>
                    <TextField
                      value={editablePrices[`${booking.id}-${test.test_name}`]}
                      onChange={e => handlePriceChange(booking.id, test.test_name, e.target.value)}
                      type="number"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editableRanges[`${booking.id}-${test.test_name}`]}
                      onChange={e => handleRangeChange(booking.id, test.test_name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={editableInterpretations[`${booking.id}-${test.test_name}`]}
                      onChange={e => handleInterpretationChange(booking.id, test.test_name, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6">Total Price: {totalPrice}</Typography>
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Print
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
        Delete Selected
      </Button>
    </Container>
  );
};

export default TestBookingsList;
