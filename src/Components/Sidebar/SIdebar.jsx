import { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ProfileOutlined,
  WalletOutlined,
  FileProtectOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Avatar, Button, Layout, Menu, Dropdown, message, theme } from 'antd';
import { useNavigate } from 'react-router';
import { accessConstent } from '../../helpingFile';

import { Link } from 'react-router-dom';
import AppRoutes from '../../routes/AppRoutes';
import '../style.css'; // Import the CSS file
import { DashboardOutlined } from '@mui/icons-material';
import logo from "../.././assets/images/logo.png";
import { apiGet } from '../../api/apiMethods';

const { Header, Sider, Content } = Layout;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('1');
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get theme from localStorage, default to false (light mode)
    return localStorage.getItem('theme') === 'dark';
  });


  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  // const token = localStorage.getItem(accessConstent);

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleLogout = async () => {
    try {
      const response = await apiGet(`apiUser/v1/userRoute/logout`);

      if (response.status === 200) {
        localStorage.removeItem(accessConstent);
        message.success(response.data.message || "You have been logged out.");
        navigate('/login');
      } else {
        message.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      message.error("An error occurred while logging out. Please try again.");
    }
  };

  const getUserInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Fetch user data
    apiGet(`apiUser/v1/userRoute/userInfo`)
      .then(response => {
        setUserData(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, [isDarkMode]);

  const userInitial = getUserInitials(userData.fullName || '');

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const menuItems1 = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
      onClick: () => navigate("/settings/profile"),
    },
    {
      key: 'logout',
      icon: <UserOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const dropdownMenu = (
    <Menu items={menuItems1} />
  );

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: 'sub2',
      icon: <ProfileOutlined />,
      label: 'Reports',
      children: [
        { key: '4', label: <Link to="/payin">QR Generate</Link> },
        { key: '5', label: <Link to="/payinsucess">Payin</Link> },
        { key: '6', label: <Link to="/payoutgen">Payout Generate</Link> },
        { key: '17', label: <Link to="/payout">Payout</Link> },
      ],
    },
    {
      key: 'sub5',
      icon: <WalletOutlined />,
      label: 'Payout-Wallet Management',
      children: [
        { key: '7', label: <Link to="/my-wallet">My Wallet</Link> },
        { key: '8', label: <Link to="/upitoewallet">UPI To E-Wallet</Link> },
      ],
    },
    {
      key: 'sub6',
      icon: <WalletOutlined />,
      label: 'Collection-Wallet Management',
      children: [
        { key: '9', label: <Link to="/upi-wallet">My Wallet</Link> },
      ],
    },
    {
      key: 'sub15',
      icon: <ConfirmationNumberIcon />,
      label: 'TOPUP Request',
      children: [
        { key: '26', label: <Link to="/create-topuprequest">Create Top-up Request</Link> },
        { key: '27', label: <Link to="/view-topuprequest">View All Top-Up Request</Link> },
      ],
    },
    {
      key: 'sub7',
      icon: <ConfirmationNumberIcon />,
      label: 'Support Ticket',
      children: [
        { key: '10', label: <Link to="/create-ticket">Create Ticket</Link> },
        { key: '11', label: <Link to="/view-tickets">View Ticket</Link> },
      ],
    },
    {
      key: 'sub8',
      icon: <FileProtectOutlined />,
      label: 'API Document',
      children: [
        { key: '12', label: <Link to="/api-documents/payin">PayIn</Link> },
        { key: '13', label: <Link to="/api-documents/payout">PayOut</Link> },
        { key: '14', label: <Link to="/api-documents/balancecheck">Balance Check</Link> },
      ],
    },
    {
      key: 'sub9',
      icon: <SettingOutlined />,
      label: 'Setting',
      children: [
        { key: '15', label: <Link to="/settings/profile">My Profile</Link> },
        { key: '16', label: <Link to="/settings/changepassword">Change Password</Link> },
       
      ],
    },
  ];

  return (
    <>
      <Layout style={{ height: '100vh', background: 'transparent', overflowX:'hidden', position:'sticky',overflowY:'hidden !important' }}>
       
<Sider
  trigger={null}
  collapsible
  collapsed={collapsed}
  style={{ height: '100vh', background: 'var(--sidebar-bg)' }}
  className="sider"
>
  <div className="fixed-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img
      src={logo}
      alt="logo"
      style={{ width: collapsed ? '60px' : '150px', marginTop: '15%' }}
    />
  </div>

  <div className="menu-container" style={{ height: '75vh', overflowY: 'auto', background: 'var(--sidebar-bg)'}}>
    <Menu
      theme={isDarkMode ? 'dark' : 'light'}
      mode="inline"
      selectedKeys={[selectedItem]}
      onClick={handleMenuClick}
      items={menuItems}
    />
  </div>
</Sider>

        <Layout>
          <Header
            style={{
              padding: '0 24px',
              background: 'var(--header-bg)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'var(--text-color)',
             
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64, color: 'var(--text-color)' }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Dropdown menu={{ items: menuItems1 }} trigger={['click']}>
                {userData && userData.profileImage ? (
                  <img src={userData.profileImage} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                ) : (
                  <Avatar size="large" style={{ backgroundColor: '#87d068' }}>{userInitial}</Avatar>
                )}
              </Dropdown>
              <Button
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                style={{ fontSize: '16px', marginLeft: '20px', color: 'var(--text-color)' }}
              />
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 20px 24px 16px',
              padding: '0px 24px 24px 24px',
              minHeight: '85vh',
              background: 'var(--bg-color)',
              borderRadius: borderRadiusLG,
              overflowY: 'auto',
            }}
          >
            <AppRoutes />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Sidebar;
