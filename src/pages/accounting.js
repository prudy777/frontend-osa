import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApexCharts from 'apexcharts';

const AccountingPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [filter, setFilter] = useState({ dateRange: '', category: '' });
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [budgetData, setBudgetData] = useState({ labels: [], allocatedBudget: [], actualSpending: [] });

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/accounting/transactions');
      setTransactions(response.data);
      calculateSummary(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, []);

  const fetchBudgetReport = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/budget-report');
      setBudgetData(response.data);
    } catch (error) {
      console.error('Error fetching budget report:', error);
    }
  }, []);

  const calculateSummary = (transactions) => {
    const income = transactions.filter(tx => tx.type === 'income').reduce((acc, tx) => acc + tx.amount, 0);
    const expenses = transactions.filter(tx => tx.type === 'expense').reduce((acc, tx) => acc + tx.amount, 0);
    setIncome(income);
    setExpenses(expenses);
    setNetProfit(income - expenses);
  };

  const calculateSelectedTotal = () => {
    const selected = transactions.filter(tx => selectedTransactions.includes(tx.id));
    const total = selected.reduce((acc, tx) => acc + tx.amount, 0);
    return total;
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgetReport();
  }, [fetchTransactions, fetchBudgetReport]);

  useEffect(() => {
    const options = {
      chart: {
        height: 350,
        type: 'pie'
      },
      dataLabels: {
        enabled: true
      },
      series: budgetData.allocatedBudget.length > 0 ? budgetData.allocatedBudget : [44, 55, 13, 33],
      labels: budgetData.labels.length > 0 ? budgetData.labels : ['Series 1', 'Series 2', 'Series 3', 'Series 4'],
      colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0']
    };
    const chart = new ApexCharts(document.querySelector("#apexcharts-pie"), options);
    chart.render();

    // Cleanup chart on component unmount
    return () => {
      chart.destroy();
    };
  }, [budgetData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    // Apply filter logic here
  };

  const handleSelectChange = (id) => {
    setSelectedTransactions((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleAddTransaction = () => {
    // Add logic to handle adding a new transaction
  };

  const handleDeleteTransaction = (id) => {
    // Add logic to handle deleting a transaction
  };

  return (
    <Container maxWidth={false} sx={{ marginTop: 50, maxWidth: '1200px', width: '1300px' }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Accounting Overview</Typography>
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={4}>
            <Typography variant="h6">Total Revenue: {income}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Total Expenses: {expenses}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Net Profit/Loss: {netProfit}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Selected Total: {calculateSelectedTotal()}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date Range"
              name="dateRange"
              value={filter.dateRange}
              onChange={handleFilterChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              label="Category"
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              variant="outlined"
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="medical">Medical</MenuItem>
              <MenuItem value="supplies">Supplies</MenuItem>
              <MenuItem value="salaries">Salaries</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedTransactions.includes(tx.id)}
                          onChange={() => handleSelectChange(tx.id)}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.category}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteTransaction(tx.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleAddTransaction}>Add New Transaction</Button>

        <div className="card mt-5">
          <div className="card-body">
            <h5 className="card-title">Budget Report | This Month</h5>
            <div id="apexcharts-pie" />
          </div>
        </div>
      </Paper>
    </Container>
  );
};
const PrintedTests = () => {
  const [printedTests, setPrintedTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrintedTests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/printed-tests');
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
    <Container maxWidth="lg" sx={{ marginTop: 60 }}>
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


export default AccountingPage;
