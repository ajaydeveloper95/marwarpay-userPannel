import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Button,
  Pagination
} from '@mui/material';
import axios from 'axios';
import { accessConstent, domainBase } from '../../../helpingFile';
import { saveAs } from 'file-saver';

const Payingen = () => {
  const [qrData, setQrData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);
  const itemsPerPage = 10;
  const API_ENDPOINT = `${domainBase}apiUser/v1/payin/getAllQrGenerated`;
  const token = localStorage.getItem(accessConstent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data || [];
        setQrData(Array.isArray(data) ? data : []);
        setFilteredData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('There was an error fetching the QR data!', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    let filtered = qrData.filter((item) => {
      const matchesName = item.name?.toLowerCase().includes(searchInput.toLowerCase());
      const matchesTxnID = item.trxId?.toLowerCase().includes(searchInput.toLowerCase());

      const trxDate = new Date(item.createdAt);
      trxDate.setHours(0, 0, 0, 0);

      const startDate = searchStartDate ? new Date(searchStartDate) : null;
      const endDate = searchEndDate ? new Date(searchEndDate) : null;

      if (startDate) startDate.setHours(0, 0, 0, 0);
      if (endDate) endDate.setHours(23, 59, 59, 999);

      const isStartDateOnly = startDate && !endDate && trxDate.getTime() === startDate.getTime();
      const isWithinDateRange =
        startDate && endDate && trxDate >= startDate && trxDate <= endDate;

      return (matchesName || matchesTxnID) && (!startDate && !endDate || isStartDateOnly || isWithinDateRange);
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilter();
  }, [searchInput, searchStartDate, searchEndDate]);

  const handleReset = () => {
    setSearchInput('');
    setSearchStartDate('');
    setSearchEndDate('');
    setFilteredData(qrData);
    setCurrentPage(1);
    setViewAll(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const toggleViewAll = () => {
    setViewAll((prev) => !prev);
    setCurrentPage(1);
  };

  const handleExportData = () => {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Set to true if you want 12-hour format
    });
  
    const csvRows = [
      ['#', 'Name', 'TxnID', 'Amount', 'Status', 'Date'], // Header row
      ...filteredData.map((item, index) => [
        index + 1,
        item.name || 'NA',
        item.trxId || 'NA',
        item.amount || 'NA',
        item.callBackStatus || 'NA',
        dateFormatter.format(new Date(item.createdAt)),
      ]),
    ];
  
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Payin_Data.csv');
  };
  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = viewAll
    ? filteredData
    : Array.isArray(filteredData)
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Grid
        sx={{
          mb: 3,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          paddingTop: '20px',
          overflow: 'hidden',
          backgroundColor: 'white',
          color:'#000'
        }} 
      >
        <Grid container alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs>
            <Typography variant="h5" gutterBottom>
              Payin Generation Information
            </Typography>
          </Grid>
          <Button variant="contained" onClick={handleExportData}>
            Export
          </Button>
        </Grid>

        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Name or TxnID"
              variant="outlined"
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={searchStartDate}
              onChange={(e) => setSearchStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={searchEndDate}
              onChange={(e) => setSearchEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3} container alignItems="center">
            <Grid item xs={6} sm={6}>
              <Button variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>
                Reset
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button variant="contained" onClick={toggleViewAll}>
                {viewAll ? 'Paginate' : 'View All'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', p: 1 }}
      >
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                <strong>#</strong>
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                <strong>TxnID</strong>
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                <strong>Amount</strong>
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                <strong>Status</strong>
              </TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                <strong>Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((qr, index) => (
                <TableRow key={qr._id}>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      whiteSpace: 'nowrap',
                      padding: '8px',
                    }}
                  >
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      whiteSpace: 'nowrap',
                      padding: '8px',
                    }}
                  >
                    {qr.name || 'NA'}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      whiteSpace: 'nowrap',
                      padding: '8px',
                    }}
                  >
                    {qr.trxId || 'NA'}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      whiteSpace: 'nowrap',
                      padding: '8px',
                      align: 'center',
                    }}
                  >
                    {qr.amount}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      whiteSpace: 'nowrap',
                      padding: '8px',
                      color: qr.callBackStatus === 'Success' ? 'green' : 'red',
                    }}
                  >
                    {qr.callBackStatus || 'NA'}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #ddd',
                      whiteSpace: 'nowrap',
                      padding: '8px',
                    }}
                  >
                    {new Date(qr.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!viewAll && (
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Grid>
      )}
    </>
  );
};

export default Payingen;
