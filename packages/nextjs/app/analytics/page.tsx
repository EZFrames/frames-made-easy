"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { set } from "nprogress";
import LineChart from "~~/components/analytics/LineChart";
import {
  GetOrders,
  getTop5Journeys,
  getTotalInteractions,
  getTotalInteractionsGraph,
  getUniqueUsers,
  getUniqueUsersGraph,
} from "~~/services/analytics/getAnalytics";

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("last-7-days");
  const [journeyId, setJourneyId] = useState("");
  const [totalInteractions, setTotalInteractions] = useState<number>();
  const [uniqueInteractions, setUniqueInteractions] = useState<number>();
  const [top5Journeys, settop5Journeys] = useState<any[]>([]);
  const [totalInteractionsGraph, setTotalInteractionsGraph] = useState<any[]>([]);
  const [uniqueUsersGraph, setUniqueUsersGraph] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedChart, setSelectedChart] = useState("users");

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };
  useEffect(() => {
    const getDateRange = () => {
      const today = new Date();
      const actualToday = new Date(today.getDate() + 2);
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      switch (dateRange) {
        case "last-day":
          return { start: formatDate(yesterday), end: formatDate(actualToday) };
        case "last-7-days":
          return { start: formatDate(lastWeek), end: formatDate(actualToday) };
        case "last-30-days":
          return { start: formatDate(lastMonth), end: formatDate(actualToday) };
        default:
          return { start: formatDate(lastWeek), end: formatDate(actualToday) };
      }
    };
    const { start, end } = getDateRange();
    getTotalInteractions(start, end, journeyId).then(data => setTotalInteractions(data));
    getUniqueUsers(start, end, journeyId).then(data => {
      setUniqueInteractions(data);
    });
    getTotalInteractionsGraph(start, journeyId).then(data => {
      setTotalInteractionsGraph(data);
    });
    getUniqueUsersGraph(start, journeyId).then(data => {
      setUniqueUsersGraph(data);
    });
    GetOrders(journeyId, start).then(data => {
      setOrders(data.orders);
    });
  }, [dateRange, journeyId]);

  useEffect(() => {
    const getDateRange = () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      switch (dateRange) {
        case "last-day":
          return { start: formatDate(yesterday), end: formatDate(today) };
        case "last-7-days":
          return { start: formatDate(lastWeek), end: formatDate(today) };
        case "last-30-days":
          return { start: formatDate(lastMonth), end: formatDate(today) };
        default:
          return { start: formatDate(lastWeek), end: formatDate(today) };
      }
    };
    const { start, end } = getDateRange();
    getTop5Journeys(start, end).then((data: any[]) => settop5Journeys(data));
  }, [dateRange]);

  useEffect(() => {
    setSelectedChart("users");
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" style={{ fontWeight: 800 }} gutterBottom>
          Frame Analytics
        </Typography>
        <Box sx={{ mb: 2 }}>
          <FormControl sx={{ mr: 2, minWidth: 120 }}>
            <InputLabel>Date Range</InputLabel>
            <Select value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <MenuItem value="last-day">Last Day</MenuItem>
              <MenuItem value="last-7-days">Last 7 Days</MenuItem>
              <MenuItem value="last-30-days">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Journey ID" value={journeyId} onChange={e => setJourneyId(e.target.value)} sx={{ mr: 2 }} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "4px", textAlign: "center" }}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Total Interactions
              </Typography>
              <Typography variant="h4">{totalInteractions}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "4px", textAlign: "center" }}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Unique User Interactions
              </Typography>
              <Typography variant="h4">{uniqueInteractions}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Chart Type
          </Typography>
          <ButtonGroup variant="contained" sx={{ mb: 4 }}>
            <Button onClick={() => setSelectedChart("interactions")} disabled={selectedChart === "interactions"}>
              Total Interactions Over Time
            </Button>
            <Button onClick={() => setSelectedChart("users")} disabled={selectedChart === "users"}>
              Unique Users Over Time
            </Button>
          </ButtonGroup>
          {selectedChart === "users" ? (
            <Box>
              <LineChart data={totalInteractionsGraph} />
            </Box>
          ) : (
            <Box>
              <LineChart data={uniqueUsersGraph} />
            </Box>
          )}
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Top 5 Journeys
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Journey ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Journey Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Interactions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {top5Journeys.map((frame, index) => (
                  <TableRow key={index}>
                    <TableCell>{frame._id}</TableCell>
                    <TableCell>{frame.journeyName}</TableCell>
                    <TableCell>{frame.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Order Table
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Product ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      FID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Quantity
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Wallet Address
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                      Attestation
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order, index1) => (
                  <TableRow key={index1}>
                    <TableCell>{order?.journeyId}</TableCell>
                    <TableCell>{order?.fid}</TableCell>
                    <TableCell>{order?.quantity}</TableCell>
                    <TableCell>{order?.walletAddress}</TableCell>
                    <TableCell>
                      https://easscan.org/attestation/view/0x11c7c8e4c9d46886d5f33183a353f2e113b9ef6774b770d49e5e22e4f8de41b3
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default AnalyticsPage;
