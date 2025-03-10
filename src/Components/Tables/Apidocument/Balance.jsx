import { Grid, Typography ,useMediaQuery} from '@mui/material';
import { useState, useEffect } from 'react';

function Balance() {
  const isSmallScreen = useMediaQuery('(max-width:800px)');

  const [formData, setFormData] = useState({
    userName: '',
    authToken: '',
    });


  const [jsonOutput, setJsonOutput] = useState('');




 
  useEffect(() => {
    const jsonData = JSON.stringify(formData, null, 2);
    setJsonOutput(jsonData);
  }, [formData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };




  return (
    <div style={{ padding: '20px' }}>
          <Grid sx={{
    mb: 3,
    position: isSmallScreen ? 'relative' : 'sticky', // Remove sticky for small screens
    top: isSmallScreen ? 'auto' : 0,             
    zIndex: 1000, 
    paddingTop:'20px',
    overflow:'hidden' ,     
    backgroundColor: 'white', 
  }} className='setdesigntofix'>
      <Grid item>
                <Typography variant="h5" component="h1" gutterBottom sx={{fontWeight:'bold'}}>
                  Balance Cheack
                </Typography>
              </Grid>
  </Grid>
      <div className="gqrapi" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="gqrapi1" style={{ marginBottom: '20px' }}>
          <h4>Request Balance Check API URL</h4>
          <p>{`https://api.zanithpay.com/apiUser/v1/wallet/walletBalance`}</p>
        </div>
        <p>Request Method - POST</p>
        <div className="gqrapi1" style={{ marginBottom: '20px' }}>
          <h4>Post Parameters</h4>
          <form>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>#</th>
                  <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Parameter Key</th>
                  <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(formData).map(([key, value], index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{index + 1}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{key}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      <input
                        type={key === 'txnpwd' ? 'password' : 'text'}
                        placeholder={`Enter ${key}`}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '8px',
                          boxSizing: 'border-box',
                          border: '1px solid #ccc', 
                          borderRadius: '4px'        
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
              Note: All Parameter keys are case sensitive.
            </p>
          
          </form>
        </div>


        <div className="json-output" style={{ marginBottom: "20px" }}>
      <h4>Generate authToken</h4>
      <div style={{ marginBottom: "20px" }}>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
{`import { createHash } from "crypto";

const generateTrxAuthToken = (memberId, trxPassword) => {
  let data = {
    memberId,
    trxPassword,
  };
  let jsonToString = JSON.stringify(data);
  let sha256Generate = createHash("sha256")
    .update(jsonToString)
    .digest("hex");
  return sha256Generate;
};

let authToken = generateTrxAuthToken("memberId", "trxpassword");
console.log(authToken);`}
        </pre>
      </div>
    
    </div>

    <div className="json-output" style={{ marginBottom: "20px" }}>
    
      <div style={{ marginBottom: "20px" }}>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
{`authToken  - ba519a680fed8d7cc831a50c4d74fe39b44fbd8debf13e19ac5c319b6d69507c`}
        </pre>
      </div>
    
    </div>

    
        <div className="json-output" style={{ marginBottom: '20px' }}>
          <h4>Post Parameters Object</h4>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>{jsonOutput}</pre>
        </div>
        <div style={{ marginBottom: '20px' }}>
  <h4>Server Response</h4>
  <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
    {JSON.stringify({
      "status_code": 200,
      "status_msg": "OK ",
      "e_wallet_balance": 0.00,
      "upi_wallet_balance": 0.00,
         
    }, null, 2)}  
    
  </pre>
</div>

  

   
        <div>
          <h4>Response Parameters</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>#</th>
                <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Parameter Key</th>
                <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status_code</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>400 = Variable Related Error</li>
                    <li>401 = Variable Data Related Error</li>
                    <li>200 = Success</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>2</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>e_wallet_balance</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>E wallet Balance</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>3</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>upi_wallet_balance</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>UPI Wallet Balance</td>
              </tr>
    
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Balance;
