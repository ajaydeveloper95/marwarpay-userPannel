import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  
  Typography,
  IconButton,
  Grid,
  Button,
  Tabs,
  Tab,
  useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Gqrapi from './Gqrapi';
import Callback from './Callback';
import TrxstatusPayin from './TrxstatusPayin';





const PayinApi = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const [pageSize] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [tabValue, setTabValue] = useState(0); 

  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize]);

  const handleAction = (action, newValue) => {
    switch (action) {
      case 'back':
        navigate(-1);
        break;
      case 'tab':
        setTabValue(newValue);
        break;
      case 'page':
        setCurrentPage((prev) => (newValue === 'next' ? prev + 1 : Math.max(prev - 1, 0)));
        break;
      default:
        break;
    }
  };

  return (
    <>
  
        {/* Header Section */}
        <Grid sx={{
    mb: 3,
    position: isSmallScreen ? 'relative' : 'sticky', // Remove sticky for small screens
        top: isSmallScreen ? 'auto' : 0,            
    zIndex: 1000, 
    paddingTop:'20px',
    overflow:'hidden' ,     
    backgroundColor: 'white', 
  }} className='setdesigntofix'>
        <Grid container alignItems="center" spacing={1} mb={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <IconButton color="primary" onClick={() => handleAction('back')}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h5" component="h1" gutterBottom>
                  UPI QR Only API Document
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
    
        <Tabs
          value={tabValue}
          onChange={(event, newValue) => handleAction('tab', newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab style={{ fontWeight: '700', fontSize: '16px' }} label="Generate QR API" />
          <Tab style={{ fontWeight: '700', fontSize: '16px' }} label="Call Back URL" />
          <Tab style={{ fontWeight: '700', fontSize: '16px' }} label="Transaction Status" />
        </Tabs>
</Grid>
        {tabValue === 0 && <Typography variant="h6"><Gqrapi/></Typography>}
        {tabValue === 1 && <Typography variant="h6"><Callback/></Typography>}
        {tabValue === 2 && <Typography variant="h6"><TrxstatusPayin/></Typography>}

    
        {pageSize !== 'all' && (
          <Grid container spacing={2} justifyContent="center" mt={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAction('page', 'prev')}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAction('page', 'next')}
                disabled={false} 
              >
                Next
              </Button>
            </Grid>
          </Grid>
        )}

    </>
  );
};

export default PayinApi;
