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

const Payinsuc = () => {

  const [qrData, setQrData] = useState([]); // Initialize as an array
  const [filteredData, setFilteredData] = useState([]); // Initialize as an array
  const [searchInput, setSearchInput] = useState(''); // Combined input for Name and TxnID
  const [searchStartDate, setSearchStartDate] = useState(''); // Start date
  const [searchEndDate, setSearchEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page
  const API_ENDPOINT = `${domainBase}apiUser/v1/payin/getAllPayInSuccess`;
  const token = localStorage.getItem(accessConstent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data.data)) {
          setQrData(response.data.data);
          setFilteredData(response.data.data);
        } else {
          console.error('Data is not an array:',);
        }
       
      } catch (error) {
        console.error('There was an error fetching the QR data!', error);
        
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    let filtered = qrData.filter(item => {
      const matchesName = item.payerName.toLowerCase().includes(searchInput.toLowerCase());
      const matchesTxnID = item.trxId.toLowerCase().includes(searchInput.toLowerCase());

      const startDate = new Date(searchStartDate);
      const endDate = new Date(searchEndDate);
      const trxDate = new Date(item.createdAt);

      const isWithinDateRange = (!searchStartDate || trxDate >= startDate) && (!searchEndDate || trxDate <= endDate);

      return (matchesName || matchesTxnID) && isWithinDateRange; // Filter by either Name or TxnID and date range
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  // Effect to trigger search whenever searchInput, searchStartDate, or searchEndDate changes
  useEffect(() => {
    handleFilter(); // Call filter function on state changes
  }, [searchInput, searchStartDate, searchEndDate]);



  const handleReset = () => {
    setSearchInput(''); 
    setSearchStartDate(''); 
    setSearchEndDate(''); 
    setFilteredData(qrData); 
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredData) ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : []; // Ensure it's an array
  const totalPages = Math.ceil((Array.isArray(filteredData) ? filteredData.length : 0) / itemsPerPage);

  return (
    <>
      <Grid container alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs>
          <Typography variant="h5" gutterBottom>Payin Success Information</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Search by Name or TxnID" // Combined label
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Update searchInput and trigger filtering
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
            onChange={(e) => setSearchStartDate(e.target.value)} // Update start date and trigger filtering
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
            onChange={(e) => setSearchEndDate(e.target.value)} // Update end date and trigger filtering
          />
        </Grid>
        <Grid item xs={12} sm={3} container alignItems="center">
          <Button variant="outlined" fullWidth onClick={handleReset} sx={{ mr: 2 }}>
            Reset
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', p: 1 }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>#</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Name</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>TxnID</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Amount</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Charge Amount</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Final Amount</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>VPA ID</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>RRN</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Status</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">No data available.</TableCell>
              </TableRow>
            ) : (
              currentItems.map((qr, index) => (
                <TableRow key={qr._id}>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{qr.payerName}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{qr.trxId}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', align: 'center' }}>{qr.amount}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', align: 'center' }}>{qr.chargeAmount}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', align: 'center' }}>{qr.finalAmount}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{qr.vpaId}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{qr.bankRRN}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', color: qr.isSuccess === 'Success' ? 'green' : 'red' }}>{qr.isSuccess}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{new Date(qr.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

  
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </>
  );
};

export default Payinsuc;
