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

const Payingen = () => {
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const isFirstRender = useRef(true);

  const [qrData, setQrData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  console.log(filteredData)
  const [searchInput, setSearchInput] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalDocs, setTotalDocs] = useState(Number);
  const [totalPages, setTotalPages] = useState(Number);
  const API_ENDPOINT = `apiUser/v1/payin/getAllQrGenerated`;

  const fetchData = async (exportCSV = false) => {
    try {
      if ((searchStartDate && !searchEndDate) || (!searchStartDate && searchEndDate)) return;
      setFilteredData([])
      const response = await apiGet(`${API_ENDPOINT}?page=${currentPage}&limit=${itemsPerPage}&keyword=${searchInput}&startDate=${searchStartDate}&endData=${searchEndDate}&export=${exportCSV}`);

      if(exportCSV == 'true'){
        const blob = new Blob([response.data], {type: 'text/csv'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `payin-generate${searchStartDate}-${searchEndDate}.csv`

        link.click();
        link.remove();
        return;
      }
      // else{
      //   setQrData(Array.isArray(data) ? data : []);
      // }
      const data = response.data.data || [];
      setFilteredData(Array.isArray(data) ? data : []);
      setTotalDocs(response.data.totalDocs);
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


  useEffect(() => {
    // handleFilter();
  }, [searchInput, searchStartDate, searchEndDate]);

  const handleReset = () => {
    setSearchInput('');
    setSearchStartDate('');
    setSearchEndDate('');
    // setFilteredData(qrData);
    setCurrentPage(1);
    setViewAll(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };



  return (
    <>
      <Grid
        sx={{
          mb: 3,
          position: isSmallScreen ? 'relative' : 'sticky', // Remove sticky for small screens
          top: isSmallScreen ? 'auto' : 0,
          zIndex: 1000,
          paddingTop: '20px',
          overflow: 'hidden',
          backgroundColor: 'white',
          color: '#000'
        }} className='setdesigntofix'
      >
        <Grid container alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs>
            <Typography variant="h5" gutterBottom>
              Payin Generation Information
            </Typography>
          </Grid>
          <Button variant="contained" onClick={() => fetchData('true')}>
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
            {/* <Grid item xs={6} sm={6}>
              <Button variant="contained" onClick={toggleViewAll}>
                {viewAll ? 'Paginate' : 'View All'}
              </Button>
            </Grid> */}
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
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((qr, index) => (
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
