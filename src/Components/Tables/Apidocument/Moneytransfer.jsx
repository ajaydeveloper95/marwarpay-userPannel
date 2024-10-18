import { useState, useEffect } from 'react';

function Moneytransfer() {
  const [formData, setFormData] = useState({
    userName: '',
    authToken: '',
    mobile: '',
    account_holder_name: '',
    account_no: '',
    ifsc: '',
    trxId: '',
    txnID: ''
  });

  const [jsonOutput, setJsonOutput] = useState('');

  const [error] = useState('');

  useEffect(() => {
    const jsonOutputData = JSON.stringify(formData, null, 2); // Just stringify formData directly
    setJsonOutput(jsonOutputData);
  }, [formData]); // Re-run the effect when formData changes

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
        <p>{`https://api.yunicare.in/apiAdmin/v1/payout/generatePayOut`}</p>
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
              {Object.entries(formData).map(([key, value], index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{key}</td>
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
              ))}
            </tbody>
          </table>
        </div>
        <p className="clrred">Note:- All Parameter keys are case sensitive.</p>
        <div className="json-output" style={{ marginBottom: '20px' }}>
          <h4>Post Parameters Object</h4>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>{jsonOutput}</pre>
        </div>

        {error && (
          <div className="error-output" style={{ marginBottom: '20px' }}>
            <h4>Error</h4>
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h4>Server Response</h4>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
              status_code: 200,
              status_msg: 'OK',
              status: 'SUCCESS',
              txnid: 16131198309337,
              opt_msg: 'Transaction Fetch Successfully'
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
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>status_msg</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>API Success or Error Message according to status code.</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>3</td>
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
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>4</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>txnid</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Your Unique Transaction ID.</td>
      </tr>
      <tr>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>5</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>optxid</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Unique Transaction ID from Operator Side.</td>
      </tr>
    </tbody>
  </table>
);

export default Moneytransfer;
