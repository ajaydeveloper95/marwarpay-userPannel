// AppRoutes.js

import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashbord';
import Mywallet from '../Components/Tables/Ewalletmanagment/Mywallet';

import PayoutSuccess from '../Components/Tables/Reports/Payoutsuc';
import Payingen from '../Components/Tables/Reports/Payingen';
import Payoutgen from '../Components/Tables/Reports/Payoutgen';
import UPIToEwallet from '../Components/Tables/Ewalletmanagment/Upitoewallet';
import UPIWallet from '../Components/Tables/Upiwallet/Upiwallet';
import ViewTicket from '../Components/Tables/Support/Viewticket';
import CreateTicket from '../Components/Pages/Support/Createsupportticket';
import PayoutApi from '../Components/Tables/Apidocument/PayoutApi';
import PayinApi from '../Components/Tables/Apidocument/PayinApi';
import ChangePassword from '../Components/Pages/Setting/Changepass';
import Profile from '../Components/Pages/Setting/Profile';
import EditProfile from '../Components/Pages/Setting/EditProfile';
import Payinsuc from '../Components/Tables/Reports/Payinsuccess';
import useAxiosInterceptors from '../axiosConfig';
import Balance from '../Components/Tables/Apidocument/Balance';


const AppRoutes = () => {
  useAxiosInterceptors(); 
  return (
    <Routes> 
      <Route path="/" element={<Dashboard />} />
      <Route path="/my-wallet" element={<Mywallet />} />
      <Route path="/payinsucess" element={<Payinsuc/>} />
      <Route path="/payout" element={<PayoutSuccess />} />
      <Route path="/payin" element={<Payingen />} />
      <Route path="/payoutgen" element={<Payoutgen />} />
     
      <Route path="/upitoewallet" element={<UPIToEwallet />} />
      <Route path="/upi-wallet" element={<UPIWallet />} />
      <Route path="/view-tickets" element={<ViewTicket />} />
      <Route path="/create-ticket" element={<CreateTicket />} />
      <Route path="/api-documents/payin" element={<PayinApi />} />
      <Route path="/api-documents/payout" element={<PayoutApi />} />
      <Route path="/api-documents/balancecheck" element={<Balance/>} />
      <Route path="/settings/profile" element={<Profile />} />
      <Route path="/settings/changepassword" element={<ChangePassword />} />
      <Route path="/settings/edit" element={<EditProfile />} />
     
   </Routes>
  );
};

export default AppRoutes;
