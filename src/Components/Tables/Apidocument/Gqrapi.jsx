import { useState, useEffect } from 'react';

function Gqrapi() {
  const [formData, setFormData] = useState({
    authToken: 'SHA 256 hash of Your userName + Transaction Password', 
    userName: '',
    email:'',
    name: '',
    mobileNumber: '',
    amount: '',
    trxId:'',
    
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
      <div className="gqrapi" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="gqrapi1" style={{ marginBottom: '20px' }}>
          <h4>Request API URL</h4>
          <p>{`https://api.zanithpay.com/apiAdmin/v1/payin/generatePayment`}</p>
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
                {/* Place authToken as the second row */}
                <tr>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>authToken</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <span style={{ fontWeight: 'normal' }}>{formData.authToken}</span>
                  </td>
                </tr>
                {/* Render other fields, skipping authToken */}
                {Object.entries(formData).map(([key, value], index) => (
                  key !== 'authToken' && (
                    <tr key={index}>
                      <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                        {key === 'userName' ? 2 : index + 2} {/* Adjust numbering */}
                      </td>
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
                  )
                ))}
              </tbody>
            </table>
            <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
              Note: All Parameter keys are case sensitive.
            </p>
          </form>
        </div>

        <div className="json-output" style={{ marginBottom: "20px" }}>
      <h4>Generate authToken  (Method Written in javaScript)</h4>
     
      <div style={{ marginBottom: "20px" }}>
        <pre
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            overflowX: "auto",
          }}
        >
{`const {createHash} = require ("crypto");
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
              "statusCode": 200,
              "data": {
                "status_msg": "Request Completed",
                "status": 200,
                "qrImage": "https://example.com",
                "qr": "qrintent",
                "trxId": "tjkgxkxxd4555"
              },
              "message": "Success"
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
            <tbody  style={{fontWeight:'normal'}}>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>statusCode</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>400 = Variable Related Error</li>
                    <li>200 = Success</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>2</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status_msg</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Your Transaction Status Message </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>3</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>400 = Variable Related Error</li>
                    <li>401 = Variable Data Related Error</li>
                    <li>200 = Success</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>4</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>qrImage</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>QR Code String</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>5</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>qr</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>QR Intent</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>6</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>trxId</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>QR Reference ID</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>7</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>message</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Transaction Initiated message success/Failed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Gqrapi;
