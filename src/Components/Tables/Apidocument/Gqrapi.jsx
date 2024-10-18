import { useState, useEffect } from 'react';

function Gqrapi() {
 
  const [formData, setFormData] = useState({
    userName: '',
    authToken: '',
    name: '',
    amount: '',
    trxId: ''
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
          <p>{`https://api.yunicare.in/apiAdmin/v1/payin/generatePayment`}</p>
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
        <div className="json-output" style={{ marginBottom: '20px' }}>
          <h4>Post Parameters Object</h4>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>{jsonOutput}</pre>
        </div>
        <div style={{ marginBottom: '20px' }}>
  <h4>Server Response</h4>
  <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
    {JSON.stringify({
      "status_code": 200,
      "status_msg": "QR Generated Successfully ",
      "status": "SUCCESS",
      "qr": "upi://pay?pa=&pn=&tr=&am=&cu=INR&mc=",
      "txnid": 16131198309337,
    
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
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>qr</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>QR Code String</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>3</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>txnID</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>QR Reference ID</td>
              </tr>
         
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Gqrapi;
