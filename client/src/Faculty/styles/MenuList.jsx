import { useState, useEffect } from 'react';
import { Menu, Modal } from "antd";
import {
  DashboardOutlined,
  AreaChartOutlined,
  SettingOutlined,
  BarsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, matchPath, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MenuList = ({ darkTheme, setLoginStatus }) => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const match = matchPath('/dashboard/batches/:batch', location.pathname);
    setIsSubMenuVisible(match !== null);
  }, [location.pathname]);

  const selectedKey = (() => {
    if (matchPath("/f/dashboard", location.pathname)) return "1";
    if (matchPath("/s/dashboard", location.pathname)) return "2";
    if (matchPath("/f/dashboard/batches/*", location.pathname)) return "3";
    if (matchPath("/f/dashboard/progress", location.pathname)) return "4";
    return "1"; 
  })();

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:1818/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("f_jwt")}`,
        },
      })
      .then(() => {
        console.log("Logged out successfully");
        localStorage.removeItem("f_jwt");
        localStorage.removeItem("role");
        localStorage.removeItem('username');
        console.log("Logging out user");
        
        setLoginStatus(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error logging out:", error);
      })
      .finally(() => {
        setIsLogoutModalVisible(false);
      });
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <>
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        selectedKeys={[selectedKey]}
        className="min-h-[100vh] mt-0 flex flex-col gap-[15px] text-[1rem] relative"
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/f/dashboard">Dashboard</Link>
        </Menu.Item>
          <Menu.Item key="2" icon={<BarsOutlined />}>
            <Link to="/f/dashboard/batches">My Batches</Link>
          </Menu.Item>
        <Menu.Item key="3" icon={<AreaChartOutlined />}>
          <Link to="/f/dashboard/progress">Progress</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={showLogoutModal}>
          Logout
        </Menu.Item>
      </Menu>

      <Modal
        title="Confirm Logout"
        open={isLogoutModalVisible}
        onOk={handleLogout}
        onCancel={handleCancelLogout}
        okText="Yes, Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default MenuList;
