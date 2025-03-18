import { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert, Grid, useMediaQuery, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { apiPost } from '../../../api/apiMethods';

const CreatetopupRequest = () => {
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const API_ENDPOINT = `apiUser/v1/fundAdd/addFundRequest`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPost(API_ENDPOINT, formData);
      console.log('Transaction request submitted successfully:', response.data);
      setOpenSnackbar(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access. Redirecting to login.');
        window.location.href = '/login';
      } else {
        setError('An error occurred. Please try again.');
        console.error('Error:', error);
      }
    }
    setFormData('');
  };

  return (
    <>
      <Grid sx={{
        mb: 3,
        position: isSmallScreen ? 'relative' : 'sticky',
        top: isSmallScreen ? 'auto' : 0,
        zIndex: 1000,
        paddingTop: '20px',
        overflow: 'hidden',
        backgroundColor: 'white',
      }}>
        <Grid container alignItems="center" sx={{ mb: 2, fontWeight: 'bold' }}>
          <Grid item xs>
            <Typography variant="h5" gutterBottom>Create Fund Request</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: 'background.paper' }}>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Transaction Amount" name="transactionAmount" type="number" value={formData.transactionAmount || ''} onChange={handleChange} margin="dense" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Payee Name" name="payeeName" value={formData.payeeName || ''} onChange={handleChange} margin="dense" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Payee Account Number" name="payeeAccountNumber" value={formData.payeeAccountNumber || ''} onChange={handleChange} margin="dense" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Payee IFSC" name="payeeIFSC" value={formData.payeeIFSC || ''} onChange={handleChange} margin="dense" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Payee Bank Name" name="payeeBankName" value={formData.payeeBankName || ''} onChange={handleChange} margin="dense" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Bank RRN" name="bankRRN" value={formData.bankRRN || ''} onChange={handleChange} margin="dense" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="dense" required>
                <InputLabel>Payment Mode</InputLabel>
                <Select
                  name="paymentMode"
                  value={formData.paymentMode || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="IMPS">IMPS</MenuItem>
                  <MenuItem value="RTGS">RTGS</MenuItem>
                  <MenuItem value="NEFT">NEFT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth name="paymentDateTime" type="datetime-local" value={formData.paymentDateTime || ''} onChange={handleChange} margin="dense" required />
            </Grid>
          
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            Fund request submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default CreatetopupRequest;
