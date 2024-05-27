import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(...registerables);

const Dashboard = () => {
  const [sales, setSales] = useState({});
  const [revenue, setRevenue] = useState({});
  const [customers, setCustomers] = useState({});
  const [reports, setReports] = useState({});
  const [recentSales, setRecentSales] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get('http://localhost:4000/api/sales');
        const revenueResponse = await axios.get('http://localhost:4000/api/revenue');
        const customersResponse = await axios.get('http://localhost:4000/api/customers');
        const reportsResponse = await axios.get('http://localhost:4000/api/reports');
        const recentSalesResponse = await axios.get('http://localhost:4000/api/recent-sales');
        const topSellingResponse = await axios.get('http://localhost:4000/api/top-selling');
        const recentActivityResponse = await axios.get('http://localhost:4000/api/recent-activity');

        setSales(salesResponse.data);
        setRevenue(revenueResponse.data);
        setCustomers(customersResponse.data);
        setReports(reportsResponse.data);
        setRecentSales(recentSalesResponse.data);
        setTopSelling(topSellingResponse.data);
        setRecentActivity(recentActivityResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const radarData = {
    labels: reports.categories || [],
    datasets: [
      {
        label: 'Sales',
        data: reports.sales || [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Revenue',
        data: reports.revenue || [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Customers',
        data: reports.customers || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxWidth={false} sx={{ marginTop: 180,marginBottom: 20, maxWidth: '1200px', width: '1300px' }}>
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
      </div>
      <section className="section dashboard">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* Sales Card */}
              <Grid item xs={12} md={4}>
                <Paper className="info-card">
                  <div className="card-body">
                    <Typography variant="h5" component="h2">
                      Sales <span>| Today</span>
                    </Typography>
                    <div className="d-flex align-items-center">
                      <div className="card-icon">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <Typography variant="h6">{sales.today}</Typography>
                        <span className="text-success">
                          {sales.increasePercentage}% increase
                        </span>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              {/* Revenue Card */}
              <Grid item xs={12} md={4}>
                <Paper className="info-card">
                  <div className="card-body">
                    <Typography variant="h5" component="h2">
                      Revenue <span>| This Month</span>
                    </Typography>
                    <div className="d-flex align-items-center">
                      <div className="card-icon">
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                      <div className="ps-3">
                        <Typography variant="h6">${revenue.thisMonth}</Typography>
                        <span className="text-success">
                          {revenue.increasePercentage}% increase
                        </span>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              {/* Customers Card */}
              <Grid item xs={12} md={4}>
                <Paper className="info-card">
                  <div className="card-body">
                    <Typography variant="h5" component="h2">
                      Customers <span>| This Year</span>
                    </Typography>
                    <div className="d-flex align-items-center">
                      <div className="card-icon">
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="ps-3">
                        <Typography variant="h6">{customers.thisYear}</Typography>
                        <span className="text-danger">
                          {customers.decreasePercentage}% decrease
                        </span>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              {/* Reports */}
              <Grid item xs={12}>
                <Paper>
                  <div className="card-body">
                    <Typography variant="h5" component="h2">
                      Reports <span>/Today</span>
                    </Typography>
                    <Radar data={radarData} />
                  </div>
                </Paper>
              </Grid>
              {/* Recent Sales */}
              <Grid item xs={12}>
                <Paper className="recent-sales overflow-auto">
                  <div className="card-body">
                    <Typography variant="h5" component="h2">
                      Recent Sales <span>| Today</span>
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recentSales.map((sale) => (
                            <TableRow key={sale.id}>
                              <TableCell>{sale.id}</TableCell>
                              <TableCell>{sale.customer}</TableCell>
                              <TableCell>{sale.product}</TableCell>
                              <TableCell>{sale.price}</TableCell>
                              <TableCell>
                                <span className={`badge bg-${sale.status.toLowerCase()}`}>{sale.status}</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Paper>
              </Grid>
              {/* Top Selling */}
              <Grid item xs={12}>
                <Paper className="top-selling overflow-auto">
                  <div className="card-body">
                    <Typography variant="h5" component="h2">
                      Top Selling <span>| Today</span>
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Preview</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Sold</TableCell>
                            <TableCell>Revenue</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {topSelling.map((product, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <img src={product.preview} alt={product.product} style={{ width: '50px' }} />
                              </TableCell>
                              <TableCell>{product.product}</TableCell>
                              <TableCell>{product.price}</TableCell>
                              <TableCell>{product.sold}</TableCell>
                              <TableCell>{product.revenue}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            </Grid>
          <div className="col-lg-4">
            {/* Recent Activity */}
            <Grid item xs={12}>
              <Paper>
                <div className="card-body">
                  <Typography variant="h5" component="h2">
                    Recent Activity <span>| Today</span>
                  </Typography>
                  <ul>
                    {recentActivity.map((activity, index) => (
                      <li key={index} className="activity-item d-flex">
                        <div className="activity-label">{activity.label}</div>
                        <i className={`bi bi-circle-fill activity-badge ${activity.badge} align-self-start`}></i>
                        <div className="activity-content">{activity.content}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Paper>
            </Grid>
          </div>
        </Grid>
      </section>
    </Container>
  );
};

export default Dashboard;
