import { useState, useEffect } from 'react';

function Moneytransfer() {
  const [formData, setFormData] = useState({
    authToken: 'SHA 256 hash of Your userName + Transaction Password',
    userName: '',
    mobileNumber: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    amount: '',
    trxId: ''
  });

  const [jsonOutput, setJsonOutput] = useState('');

  const [error] = useState('');

  useEffect(() => {
    const jsonOutputData = JSON.stringify(formData, null, 2); 
    setJsonOutput(jsonOutputData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '20px' }} className="gqrapi">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h4>Request API URL</h4>
        <p>{`https://api.zanithpay.com/apiAdmin/v1/payout/generatePayOut`}</p>
        <p style={{ fontSize: '14px' }}>Request Method - POST</p>

        <div style={{ marginBottom: '20px' }}>
          <h4>Post Parameters</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Parameter Key</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <td style={{fontWeight:'bold'}}>1</td>
                <td style={{fontWeight:'bold'}}>authToken</td>
                <td>
                  <span>{formData.authToken}</span>
                </td>
              </tr>
              {Object.entries(formData).map(([key, value], index) => (
                key !== 'authToken' && ( 
                  <tr key={index}>
                    <td style={{fontWeight:'bold'}}>{key === 'userName' ? 2 : index + 1}</td> 
                    <td style={{fontWeight:'bold'}}>{key}</td>
                    <td>
                      <input
                        type={key === 'txnpwd' ? 'password' : 'text'}
                        placeholder={`Enter ${key}`}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                      />
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
        <p className="clrred">Note:- All Parameter keys are case sensitive.</p>

        <div className="json-output" style={{ marginBottom: "20px", fontWeight:'bold'}}>
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

    <div className="json-output" style={{ marginBottom: "20px",fontWeight:'bold' }}>
    
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

        <div className="json-output" style={{ marginBottom: '20px',fontWeight:'bold' }}>
          <h4>Post Parameters Object</h4>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>{jsonOutput}</pre>
        </div>

        {error && (
          <div className="error-output" style={{ marginBottom: '20px' }}>
            <h4>Error</h4>
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        )}

        <div style={{ marginBottom: '20px' ,fontWeight:'bold'}}>
          <h4>Server Response</h4>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(
               {
                "statusCode": 200,
                "data": {
                    "statusCode": 1,
                    "status": 1,
                    "trxId": "thdsffjelkrt4543",
                    "opt_msg": "Success"
                },
                "message": "Success"
            }, null, 2)}
          </pre>
        </div>
        <h4>Response Parameters</h4>
        <ResponseTable />
      </div>
    </div>
  );
}

const ResponseTable = () => (
  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px',fontWeight:'bold' }}>
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
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>statusCode</td>
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
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status_msg</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>API Success or Error Message according to status code.</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>3</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
          <ul>
            <li>1 = SUCCESS</li>
            <li>-2,-1,2 = PENDING / FAILED</li>
           
          </ul>
        </td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>4</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>trxId</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Your Unique Transaction ID.</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>5</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>optxid</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Unique Transaction ID from Operator Side.</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>6</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>opt_msg</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Operator Side message</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>7</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>message</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Transaction Initiated message success/Failed</td>
      </tr>
    </tbody>
  </table>
);

export default Moneytransfer;
