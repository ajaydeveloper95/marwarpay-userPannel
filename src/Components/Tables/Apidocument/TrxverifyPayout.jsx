
function TrxverifyPayout() {

  return (
 
      
      <div className="gqrapi" style={{ maxWidth: '800px', margin: '0 auto',padding: '20px' }}>
        <div className="gqrapi1" style={{ marginBottom: '20px' }}>
          <h4>Request API URL</h4>
          <p>{`https://api.zanithpay.com/apiUser/v1/payout/paymentStatusPayOut`}</p>
        </div>
        <p>Request Method - POST</p>
      <div>
        <h4>Post Parameter</h4>
        <div style={{ marginBottom: '20px' }}>
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
        <div style={{ marginBottom: '20px' }}>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
    "statusCode": 200,
    "data": {
        "accountHolderName": "Ajay",
        "accountNumber": "xxxxxxxxxxxxxx44",
        "ifscCode": "xxxxxxxx",
        "amount": 2,
        "trxId": "xxxxxxxx66",
        "isSuccess": "Success",
        "createdAt": "2024-12-02T15:34:38.361Z",
        "rrn": "xxxxxxxxxx",
        "chargeAmount": 1
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
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>accountHolderName</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Your account Holder Name</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>3</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>accountNumber</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Your Account Number </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>4</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>ifscCode</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Your Bank IFSC Code</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>5</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>amount</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                  <ul>
                    <li>Your Transaction amount</li>
                  </ul>
                </td>
              </tr>
             
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>6</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>trxId</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Your Unique Transaction ID.</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>7</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>isSuccess</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Your status Message Success or Failed.</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>8</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>createdAt</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Transaction Created Date</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>9</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>rrn</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>RRN number from bank side.</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>10</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>chargeAmount</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Transaction Charges</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>11</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>message</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Transaction Initiated message success/Failed</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}
export default TrxverifyPayout;

