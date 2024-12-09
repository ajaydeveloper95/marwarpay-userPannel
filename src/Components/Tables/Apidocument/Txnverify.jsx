


function Txnverify() {
  return (
 
      
      <div className="gqrapi" style={{ maxWidth: '800px', margin: '0 auto',padding: '20px' }}>
        <div className="gqrapi1" style={{ marginBottom: '20px' }}>
          <h4>Request API URL</h4>
          <p>{`https://api.zanithpay.com/apiUser/v1/payin/paymentStatusPayIn`}</p>
        </div>
        <p>Request Method - POST</p>
      <div>
        <h4>Post Parameter</h4>
        <div style={{ marginBottom: '20px',fontWeight:'normal' }}>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
    "userName": "test",
    "authToken": "xxxxxxxxxxxxxxxxxxxxxxxxxb",
    "trxId": "xxxxxxxxxxxxxx44"
}, null, 2)}
          </pre>
        </div>
        <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' ,fontWeight:'normal'}}>
              Note: You Post data in JSON formate.
            </p>
      </div>

      <div>
        <h4>Server Response</h4>
        <div style={{ marginBottom: '20px',fontWeight:'normal' }}>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
    "statusCode": 200,
    "data": {
        "trxId": "xxxxxxxxxxxxxx44",
        "amount": 1,
        "name": "Ajay",
        "callBackStatus": "Success",
        "createdAt": "2024-11-30T05:05:38.186Z",
        "rrn": "433506xxxxx",
        "chargeAmount": 0.02
    },
    "message": "Success"
}, null, 2)}
          </pre>
        </div>
        <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' ,fontWeight:'normal'}}>
              Note: You Receive Server Responce in JSON formate.
            </p>
      </div>
      
      <div>
          <h4>Response Parameters</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' ,fontWeight:'normal'}}>
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
                    <li>200 = Success</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>2</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>trxId</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Your Unique Transaction ID.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>3</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>amount</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Your Transaction amount</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>4</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>name</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Your User Name</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>5</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>callBackStatus</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Success</li>
                  </ul>
                </td>
              </tr>
             
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>6</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>createdAt</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Created date</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>7</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>rrn</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>RRN number from bank side.</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>8</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>chargeAmount</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Transaction Charges</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>9</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>message</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Transaction Initiated message success/Failed</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}
export default Txnverify;

