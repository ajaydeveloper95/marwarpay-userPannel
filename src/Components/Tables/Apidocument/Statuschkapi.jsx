import { useState, useEffect } from 'react';

function Statuschkapi() {
 
  const [formData, setFormData] = useState({
     post: { txnID: '', memberId: '', trxPassword: ''  },
  });
  const [jsonOutput, setJsonOutput] = useState('');

  const [error] = useState('');

  // Update JSON output whenever form data changes
  useEffect(() => {
    setJsonOutput(JSON.stringify(formData, null, 2));
  }, [formData]);

  // Handle input changes for both header and post parameters
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [name]: value,
      },
    }));
  };

  // Submit function can be added here to handle API requests

  return (
    <div className="gqrapi"  style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <h4>Request API URL</h4>
        <p>https://www.marwarpay.in/portal/api/payoutCheckStatus</p>
        <p style={{ fontSize: '14px' }}>Request Method - POST</p>
      </div>

      {/* <h4>Header Parameters</h4>
      <form>
        <ParameterTable
          parameters={formData.header}
          onChange={(e) => handleChange(e, 'header')}
        />
      </form>
      <p className="clrred">Note:- All Parameter key are case sensitive.</p> */}
      <h4>Post Parameters</h4>
      <form>
        <ParameterTable
          parameters={formData.post}
          onChange={(e) => handleChange(e, 'post')}
        />
      </form>
      <p className="clrred">Note:- All Parameter key are case sensitive.</p>

      <div style={{ marginBottom: '20px' }}>
        <h4>Post Parameters Object</h4>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
          {jsonOutput}
        </pre>
      </div>

      {error && (
        <div style={{ marginBottom: '20px', color: 'red' }}>
          <h4>Error</h4>
          <p>{error}</p>
        </div>
      )}

    
<div style={{ marginBottom: '20px' }}>
  <h4>Server Response</h4>
  <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
    {JSON.stringify({
      "status_code": 200,
      "status_msg": "OK",
      "status": "SUCCESS",
      "amount": 100,
      "txnid": 16131198309337,
      "rrn": 302111739646,
      "opt_msg": "Transaction Fetch Successfully"
    }, null, 2)}  {/* This will format the JSON with 2 spaces for indentation */}
  </pre>
</div>

  

      <h4>Response Parameters</h4>
      <ResponseTable />
    </div>
  );
}

const ParameterTable = ({ parameters, onChange }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>#</th>
        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Parameter Key</th>
        <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Description</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(parameters).map(([key, value], index) => (
        <tr key={index}>
          <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{index + 1}</td>
          <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{key}</td>
          <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <input
              type={key === 'txnpwd' ? 'password' : 'text'}
              placeholder={`Enter ${key}`}
              name={key}
              value={value}
              onChange={onChange}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

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
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>rrn</td>
        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>RRN number from bank side.</td>
      </tr>
    </tbody>
  </table>
);

export default Statuschkapi;
