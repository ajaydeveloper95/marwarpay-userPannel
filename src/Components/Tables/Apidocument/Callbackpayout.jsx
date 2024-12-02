import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import axios from 'axios';
import { accessConstent, domainBase } from '../../../helpingFile';

function CallbackPayout() {
  const [formData, setFormData] = useState({ payInCallBackUrl: 'null', payOutCallBackUrl: '' });
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('success');
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem(accessConstent);
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
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container className="gqrapi" style={{ padding: '20px' }}>
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
              label="PayOut Callback URL"
              name="payOutCallBackUrl"
              value={formData.payOutCallBackUrl}
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
          Ex: https://www.yourwebsite.com/index
        </p>
      </form>
      
      <div style={{ marginBottom: '20px' ,fontWeight:'bold'}}>
          <h4>Server Response</h4>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
                status: 'SUCCESS',
                txnid: 'ddgFgfhffddgjhfj',
                optxid: 'WAAYU816379332',
                amount: '2',
                rrn: '433425296231'
            }, null, 2)}
          </pre>
        </div>
        <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' ,fontWeight:'normal'}}>
              Note: You Receive Server Responce in JSON formate.
            </p>

      <h4>Response Parameters</h4>
      <ResponseTable />
     
    </Container>
  );
}

const ResponseTable = () => (
  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
    <thead>
      <tr>
        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>#</th>
        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Parameter Key</th>
        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Description</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status_code</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
          <ul>
            <li>400 = Variable Related Error</li>
            <li>401 = Variable Data Related Error</li>
            <li>200 = Success</li>
          </ul>
        </td>
      </tr> */}
      {/* <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>2</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status_msg</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>API Success or Error Message according to status code.</td>
      </tr> */}
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
          <ul>
            <li>PENDING</li>
            <li>FAILED</li>
            <li>SUCCESS</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>2</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>txnid</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Your Unique Transaction ID.</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>3</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>amount</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Money Transfer Amount.</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>4</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>rrn</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>RRN number from bank side.</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>5</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>optxid</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Unique Transaction ID from Operator Side.</td>
      </tr>
    </tbody>
  </table>
);

export default CallbackPayout;
