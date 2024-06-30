"use client";

import { useEffect, useState } from "react";
import {
  Box,
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
import LineChart from "~~/components/analytics/LineChart";
import {
  getTop5Journeys,
  getTotalInteractions,
  getTotalInteractionsGraph,
  getUniqueUsers,
} from "~~/services/analytics/getAnalytics";

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("last-7-days");
  const [journeyId, setJourneyId] = useState("");
  const [totalInteractions, setTotalInteractions] = useState<number>();
  const [uniqueInteractions, setUniqueInteractions] = useState<number>();
  const [top5Journeys, settop5Journeys] = useState<any[]>([]);
  const [totalInteractionsGraph, setTotalInteractionsGraph] = useState<any[]>([]);

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };
  useEffect(() => {
    const getDateRange = () => {
      const today = new Date();
      const actualToday = new Date(today.getDate() + 1);
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
    getUniqueUsers(start, end, journeyId).then(data => setUniqueInteractions(data));
    getTotalInteractionsGraph(start, end, journeyId).then(data => {
      setTotalInteractionsGraph(data);
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
            Interactions Over Time
          </Typography>
          <LineChart data={totalInteractionsGraph} />
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
                    <TableCell>{frame.journeyName}</TableCell>
                    <TableCell>{frame.count}</TableCell>
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
