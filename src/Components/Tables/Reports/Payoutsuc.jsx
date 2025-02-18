import { useState, useEffect, useRef } from 'react';
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
  Pagination,
  useMediaQuery
} from '@mui/material';

import { apiGet } from '../../../api/apiMethods';

const Payinsuc = () => {
  const isFirstRender = useRef(true);

  const [qrData, setQrData] = useState([]); // Initialize as an array
  const [filteredData, setFilteredData] = useState([]); // Initialize as an array
  const [searchInput, setSearchInput] = useState(''); // Combined input for Name and TxnID
  const [searchStartDate, setSearchStartDate] = useState(''); // Start date
  const [searchEndDate, setSearchEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalDocs, setTotalDocs] = useState(Number);
  const [totalPages, setTotalPages] = useState(Number);
  const API_ENDPOINT = `apiUser/v1/payout/getAllPayOutSuccess`;
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const [viewAll, setViewAll] = useState(false);

  const fetchData = async (exportCSV = "false") => {
    try {
      if ((searchStartDate && !searchEndDate) || (!searchStartDate && searchEndDate)) return;
      const response = await apiGet(`${API_ENDPOINT}?page=${currentPage}&limit=${itemsPerPage}&keyword=${searchInput}&startDate=${searchStartDate}&endData=${searchEndDate}&export=${exportCSV}`);
      if(exportCSV == 'true'){
        const blob = new Blob([response.data], {type: 'text/csv'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `payout-success${searchStartDate}-${searchEndDate}.csv`

        link.click();
        link.remove();
        return;
      }
      if (Array.isArray(response.data.data)) {
        setQrData(response.data.data);
        setFilteredData(response.data.data);
        setTotalDocs(response.data.totalDocs);
      } else {
        console.error('Data is not an array:',);
      }

    } catch (error) {
      console.error('There was an error fetching the QR data!', error);

    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchStartDate, searchEndDate]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const totalPages = Math.ceil(totalDocs / itemsPerPage)
    setTotalPages(totalPages);
  }, [itemsPerPage, totalDocs])





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
 

  return (
    <>
      <Grid sx={{
        mb: 3,
        paddingTop: '20px',
        position: isSmallScreen ? 'relative' : 'sticky', // Remove sticky for small screens
        top: isSmallScreen ? 'auto' : 0,
        zIndex: 1000,
        backgroundColor: 'white',
      }} className='setdesigntofix'>
        <Grid container alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs>
            <Typography variant="h5" gutterBottom>PayOut Success Information</Typography>
          </Grid>
          <Button variant="contained" onClick={() => fetchData("true")}>
            Export
          </Button>
        </Grid>

        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }} >
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by TxnID" // Combined label
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
          <Grid item xs={12} sm={3} container spacing={1}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={handleReset}>
                Reset
              </Button>
            </Grid>
            {/* <Grid item xs={6}>
              <Button variant="contained" fullWidth onClick={toggleViewAll}>
                {viewAll ? 'Paginate' : 'View All'}
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', p: 1 }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead >
            <TableRow >
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>#</strong></TableCell>

              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Transaction ID</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Amount</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Charge Amount</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Final Amount</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Bank RRN</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Status</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">No data available.</TableCell>
              </TableRow>
            ) : (
              filteredData.map((qr, index) => (
                <TableRow key={qr._id}>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>

                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{qr.trxId || 'NA'}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', align: 'center' }}>{Number(qr.amount || 'NA').toFixed(2)}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', align: 'center' }}>{Number(qr.chargeAmount || 'NA').toFixed(2)}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', align: 'center' }}>{Number(qr.finalAmount || 'NA').toFixed(2)}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{qr.bankRRN || 'NA'}</TableCell>

                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', color: qr.isSuccess === 'Success' ? 'green' : 'red' }}>{qr.isSuccess || 'NA'}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>{new Date(qr.createdAt).toLocaleString()}</TableCell>
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

export default Payinsuc;
