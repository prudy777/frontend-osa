import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Select, MenuItem, Checkbox, FormControlLabel, Fade } from '@mui/material';
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

  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [genderData, setGenderData] = useState([]);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get('https://backend-osa.onrender.com/accounting/transactions');
      setTransactions(response.data);
      calculateSummary(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, []);

  const fetchBudgetReport = useCallback(async () => {
    try {
      const response = await axios.get('https://backend-osa.onrender.com/api/budget-report');
      setBudgetData(response.data);
    } catch (error) {
      console.error('Error fetching budget report:', error);
    }
  }, []);

  const fetchPrintedTestsSummary = useCallback(async () => {
    try {
      const response = await axios.get('https://backend-osa.onrender.com/printed-tests-summary');
      setMonthlyData(response.data.monthly);
      setWeeklyData(response.data.weekly);
      setGenderData(response.data.gender);
    } catch (error) {
      console.error('Error fetching printed tests summary:', error);
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
    fetchPrintedTestsSummary();
  }, [fetchTransactions, fetchBudgetReport, fetchPrintedTestsSummary]);

  useEffect(() => {
    const budgetOptions = {
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
    const budgetChart = new ApexCharts(document.querySelector("#apexcharts-pie"), budgetOptions);
    budgetChart.render();

    const monthlyChartOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      series: [{
        name: 'Total Price',
        data: monthlyData.map(item => item.total_price)
      }],
      xaxis: {
        categories: monthlyData.map(item => item.month)
      },
      title: {
        text: 'Monthly Total Prices'
      }
    };
    const monthlyChart = new ApexCharts(document.querySelector("#monthly-chart"), monthlyChartOptions);
    monthlyChart.render();

    const weeklyChartOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      series: [{
        name: 'Total Price',
        data: weeklyData.map(item => item.total_price)
      }],
      xaxis: {
        categories: weeklyData.map(item => item.week)
      },
      title: {
        text: 'Weekly Total Prices'
      }
    };
    const weeklyChart = new ApexCharts(document.querySelector("#weekly-chart"), weeklyChartOptions);
    weeklyChart.render();

    const genderChartOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      series: [{
        name: 'Total Price',
        data: genderData.map(item => item.total_price)
      }],
      xaxis: {
        categories: genderData.map(item => item.sex)
      },
      title: {
        text: 'Total Prices by Gender'
      }
    };
    const genderChart = new ApexCharts(document.querySelector("#gender-chart"), genderChartOptions);
    genderChart.render();

    // Cleanup charts on component unmount
    return () => {
      budgetChart.destroy();
      monthlyChart.destroy();
      weeklyChart.destroy();
      genderChart.destroy();
    };
  }, [budgetData, monthlyData, weeklyData, genderData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
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
    <Fade in={true} timeout={1000} appear>
      <Container maxWidth={false} sx={{ marginTop: 200, maxWidth: '1500px', width: '1500px', opacity: 1, transition: 'opacity 1s ease-out', transform: 'translate3d(0, 0, 0)' }}>
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>Accounting Overview & Printed Tests Summary</Typography>
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

          <Grid container spacing={3} sx={{ marginTop: 5 }}>
            <Grid item xs={12}>
              <div id="monthly-chart" />
            </Grid>
            <Grid item xs={12}>
              <div id="weekly-chart" />
            </Grid>
            <Grid item xs={12}>
              <div id="gender-chart" />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fade>
  );
};

export default AccountingPage;
