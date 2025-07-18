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
  Button,
  Grid,
  Pagination,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  useMediaQuery
} from '@mui/material';

import { Visibility as VisibilityIcon } from '@mui/icons-material';
// import { saveAs } from 'file-saver';
import { apiGet } from '../../../api/apiMethods';

const UPIWallet = () => {
  const [ewalletData, setEwalletData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  // Filter and Pagination state
  const [searchAmount, setSearchAmount] = useState('');
  const [searchStartDate, setSearchStartDate] = useState(''); 
  const [searchEndDate, setSearchEndDate] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [totalDocs, setTotalDocs] = useState(Number);
  const [totalPages, setTotalPages] = useState(Number);
  const API_ENDPOINT = `apiUser/v1/wallet/upiWalletTrx`;
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  // const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  const fetchData = async (exportCSV = "false") => {
    try {
      // Prevent API call if only one date is entered
      if (exportCSV === "true" && (!searchStartDate || !searchEndDate)) {
        alert("Please choose both a start and end date.");
        return;
      }
  
      // If dates are provided, ensure they are 12:00 AM and 11:59 PM
      let start = null;
      let end = null;
      
      if (searchStartDate && searchEndDate) {
        start = new Date(searchStartDate);
        start.setHours(0, 0, 0, 0);  // Set start time to 12 AM
  
        end = new Date(searchEndDate);
        end.setHours(23, 59, 59, 999);  // Set end time to 11:59 PM
      }
  
      // Calculate date range in days (for validation)
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      
      // Restrict export to 10 days maximum
      if (exportCSV === "true" && diffDays >= 10) {
        alert("You can only export data for a maximum of 10 days.");
        return;
      }
  
      // Prevent API call if one date is entered but the other is missing
      if ((searchStartDate && !searchEndDate) || (!searchStartDate && searchEndDate)) return;
  
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchAmount,
        startDate: start ? start.toISOString() : "", // Send start date in ISO format
        endDate: end ? end.toISOString() : "", // Send end date in ISO format
        export: exportCSV,
      });
  
      const response = await apiGet(`${API_ENDPOINT}?${queryParams}`);
  
      if (exportCSV === "true") {
        const blob = new Blob([response.data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `UPI-Wallet${searchStartDate}-${searchEndDate}.csv`;
        link.click();
        link.remove();
        return;
      }
  
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        setEwalletData(response.data.data);
        setTotalDocs(response.data.totalDocs);
        setTotalPages(Math.ceil(response.data.totalDocs / itemsPerPage));
        setFilteredData(false); // Data is available
        setIsLoading(false);
      } else {
        setEwalletData([]);
        setTotalDocs(0);
        setTotalPages(1);
        setEwalletData(true); // No data found
        setIsLoading(false);
      }
    } catch (error) {
      console.error("There was an error fetching the QR data!", error);
    }
  };
  useEffect(() => {
    const totalPages = Math.ceil(totalDocs / itemsPerPage)
    setTotalPages(totalPages);
  }, [itemsPerPage, totalDocs])

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchStartDate, searchEndDate]);


  const handleModal = (ticket = null) => {
    setSelectedTicket(ticket);
    setOpenModal(!!ticket);
  };
 const handleReset = () => {
    setSearchAmount('');
    setSearchStartDate(''); // Reset start date
    setSearchEndDate(''); // Reset end date
    setFilteredData(ewalletData);
    setCurrentPage(1);
    // setViewAll(false);
  };

  // Pagination handler
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  const totalBalance = ewalletData.reduce((acc, trx) => acc + trx.transactionAmount, 0).toFixed(2);
const totalTransactions = ewalletData.length;



  return (
    <>
      <Grid sx={{
        mb: 3,
        position: isSmallScreen ? 'relative' : 'sticky', // Remove sticky for small screens
        top: isSmallScreen ? 'auto' : 0,           
        zIndex: 1000, 
        paddingTop: '20px',
        overflow: 'hidden',     
        backgroundColor: 'white', 
      }} className='setdesigntofix'>
        <Grid container alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>UPI Wallet Transactions</Typography>
          </Grid>
          <Button variant="contained"onClick={() => fetchData("true")}>
            Export 
          </Button>
        </Grid>

        {/* Total Balance and Number of Transactions */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" component="div">Total Balance</Typography>
                <Typography variant="h4" component="div" sx={{ mt: 1, color: '#4caf50' }}>₹{Number(totalBalance).toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ bgcolor: '#f5f5f5', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" component="div">Total Transactions</Typography>
                <Typography variant="h4" component="div" sx={{ mt: 1 }}>{totalTransactions}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Search by Amount"
              type="number"
              variant="outlined"
              fullWidth
              value={searchAmount}
              onChange={(e) => {
                setSearchAmount(e.target.value);
            
              }}
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
              onChange={(e) => {
                setSearchStartDate(e.target.value);
               
              }}
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
              onChange={(e) => {
                setSearchEndDate(e.target.value);
            
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} container alignItems="center">
  <Grid item xs={6} sm={6}>
    <Button variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>Reset</Button>
  </Grid>

</Grid>
        </Grid>
        

      
      </Grid>

      <TableContainer component={Paper} sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', p: 1 }}>
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>#</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Type</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Amount</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Before Amount</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>After Amount</strong></TableCell>
              
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Status</strong></TableCell>
              <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}><strong>Date</strong></TableCell>
              <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}><strong>Action</strong></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
          
          {isLoading ? (
    <TableRow>
      <TableCell colSpan={6} align="center">
        Loading...
      </TableCell>
    </TableRow>
  ) : filteredData ? (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No data available.
      </TableCell>
    </TableRow>
  ) : (
    ewalletData.map((trx, index) => (
                <TableRow key={trx._id}>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', color: trx.transactionType === 'Cr.' ? 'green' : trx.transactionType === 'Dr.' ? 'red' : 'inherit' }}>{trx.transactionType}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{trx.transactionAmount}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{trx.beforeAmount}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{trx.afterAmount}</TableCell>
                
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px', color: trx.transactionStatus === 'Success' ? 'green' : 'red'}}>{trx.transactionStatus}</TableCell>
                  <TableCell align="center" sx={{border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px'}}>{new Date(trx.createdAt).toLocaleString()}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', padding: '8px' }}>
                    <IconButton onClick={() => handleModal(trx)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
      </Grid>

<Dialog open={openModal} onClose={() => handleModal(null)} maxWidth="md" fullWidth>
        <DialogTitle>UPI Wallet Details</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Field</strong></TableCell>
                    <TableCell><strong>Details</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                  <TableRow>
                    <TableCell><strong>Transaction Type</strong></TableCell>
                    <TableCell sx={{color: selectedTicket.transactionType === 'Cr.' ? 'green' : selectedTicket.transactionType === 'Dr.' ? 'red' : 'inherit'}}>{selectedTicket.transactionType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Transaction Amount</strong></TableCell>
                    <TableCell>{Number(selectedTicket.transactionAmount).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Before Amount</strong></TableCell>
                    <TableCell>{Number(selectedTicket.beforeAmount).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>After Amount</strong></TableCell>
                    <TableCell>{Number(selectedTicket.afterAmount).toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell>{selectedTicket.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Transaction Status</strong></TableCell>
                    <TableCell sx={{color: selectedTicket.transactionStatus === 'Success' ? 'green' : 'red'}}>{selectedTicket.transactionStatus}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Initiate At</strong></TableCell>
                    <TableCell>{new Date(selectedTicket.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Success At</strong></TableCell>
                    <TableCell>{new Date(selectedTicket.updatedAt).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModal(null)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UPIWallet;


