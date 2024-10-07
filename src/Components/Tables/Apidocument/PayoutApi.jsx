import { useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
import {
 
  Typography,

  IconButton,
  Grid,

  Tabs,
  Tab
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Moneytransfer from './Moneytransfer';
import Callbackpayout from './Callbackpayout';
// import Statuschkapi from './Statuschkapi';

const PayoutApi = () => {
  const navigate = useNavigate();
 
  const [tabValue, setTabValue] = useState(0);

  const handleBackButtonClick = () => navigate(-1);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  return (
    <>
        <Grid container alignItems="center" spacing={1} mb={2}>
          <Grid item>
            <IconButton color="primary" onClick={handleBackButtonClick}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h5">Money Transfer API Document</Typography>
          </Grid>
        </Grid>
        
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          {['Money Transfer API', 'Call Back URL', 'Status Check API'].map((label, index) => (
            <Tab key={index} style={{ fontWeight: '700', fontSize: '16px' }} label={label} />
          ))}
        </Tabs>

        {/* Render selected tab content */}
        {tabValue === 0 && <Moneytransfer />}
        {tabValue === 1 && <Callbackpayout />}
        {/* {tabValue === 2 && <Statuschkapi />} */}
 
    </>
  );
};

export default PayoutApi;
