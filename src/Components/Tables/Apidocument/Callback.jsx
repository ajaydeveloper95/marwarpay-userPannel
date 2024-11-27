import  { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Alert } from '@mui/material';
import axios from 'axios';
import { domainBase } from '../../../helpingFile';

function Callback() {
  // State to manage callback URLs
  const [formData, setFormData] = useState({ payInCallBackUrl: '', payOutCallBackUrl: null });
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('success');
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('accessToken');
  const API_GET = `${domainBase}apiUser/v1/callBackUrl/getCallBackUrl`;
  const API_UPDATE = `${domainBase}apiUser/v1/callBackUrl/updateCallBackUrl`;
  const API_POST = `${domainBase}apiUser/v1/callBackUrl/addCallBackUrl`;

  useEffect(() => {
    axios.get(API_GET, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { payInCallBackUrl, payOutCallBackUrl } = response.data.data;
        setFormData({ payInCallBackUrl, payOutCallBackUrl });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching callback URLs:', error);
        setAlertMessage('Failed to load callback URLs');
        setAlertType('error');
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
        let response;

        // If no callback URLs exist, call the POST API without "memberId"
        if (!formData.payOutCallBackUrl || !formData.payInCallBackUrl) {
            response = await axios.post(
                API_POST,
                {
                    payInCallBackUrl: formData.payInCallBackUrl || 'null',
                    payOutCallBackUrl: formData.payOutCallBackUrl || 'null',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
        } else {
            // Otherwise, update existing URLs
            response = await axios.post(API_UPDATE, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        }

        if (response.status === 200) {
            setAlertMessage('Callback URLs saved successfully');
            setAlertType('success');
        } else {
            setAlertMessage('Failed to save callback URLs');
            setAlertType('error');
        }
    } catch (error) {
        console.error('Error saving callback URLs:', error);

        // Check for duplicate collection error
        if (error.response && error.response.data && error.response.data.data === 'duplicate collection already callback url set ! Please Update') {
            setAlertMessage('Callback URLs already set. Please update existing URLs.');
        } else {
            setAlertMessage('An error occurred while saving the callback URLs');
        }
        setAlertType('error');
    }
};

  

  if (isLoading) {
    return <Typography >Loading...</Typography>;
  }

  return (
    <div className="gqrapi" style={{ padding: '20px' }}>
      <h4>Callback URL</h4>

      {alertMessage && (
        <Alert severity={alertType} sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <form onSubmit={handleSave}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="PayIn Callback URL"
              name="payInCallBackUrl"
              value={formData.payInCallBackUrl}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
         
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
        <p style={{ color: '#000', fontSize: '14px', marginTop: '10px' }}>
          Ex: https://www.yourwebsite.com/index.php?
        </p>
      </form>
      <p style={{ color: '#000', fontSize: '16px', marginTop: '10px' }}>Request Method - POST</p>

      <div>
        <h4>Post Parameter</h4>
        <div style={{ marginBottom: '20px' }}>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
              "status": 200,
              "payerAmount": "100",
              "payerName": "Test",
              "amount": 100,
              "txnID": 16131198309337,
              "BankRRN": 302111739646,
              "payerVA": "0000000000@ybl",
              "TxnInitDate": "20220608131419",
              "TxnCompletionDate": "20220608131422"
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
export default Callback;
