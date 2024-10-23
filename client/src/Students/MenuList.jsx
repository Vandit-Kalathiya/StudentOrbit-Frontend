import { useState } from "react";
import { Menu, Modal } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation, matchPath } from "react-router-dom";
import axios from "axios";

const MenuList = ({ darkTheme, setLoginStatus }) => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showLogoutModal = () => setIsLogoutModalVisible(true);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:1818/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("s_jwt")}`,
        },
      });
      console.log("Logged out successfully");
      localStorage.removeItem("s_jwt");
      localStorage.removeItem("role");
      localStorage.removeItem('username');
      setLoginStatus(false);
      navigate("/");
    } catch (error) {
      console.error("There was an error logging out:", error);
    } finally {
      setIsLogoutModalVisible(false);
    }
  };

  const handleCancelLogout = () => setIsLogoutModalVisible(false);

  const selectedKey = (() => {
    if (matchPath("/f/dashboard", location.pathname)) return "1";
    if (matchPath("/s/dashboard/projects/*", location.pathname)) return "2";
    if (matchPath("/s/dashboard/profile", location.pathname)) return "3";
    return "1";
  })();

  return (
    <>
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        selectedKeys={[selectedKey]}
        className="min-h-[100vh] mt-0 flex flex-col gap-[15px] text-[1rem] relative"
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/s/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ProjectOutlined />}>
          <Link to="/s/dashboard/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/s/dashboard/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<LogoutOutlined />} onClick={showLogoutModal}>
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
