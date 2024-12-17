import { useState } from "react";
import { Menu, Modal } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate, useLocation, matchPath } from "react-router-dom";
import axios from "axios";
import { getTokenFromCookie } from "../../authToken";

const MenuList = ({ darkTheme, setLoginStatus }) => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showLogoutModal = () => setIsLogoutModalVisible(true);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:1818/auth/logout", null, {
        withCredentials: true,
        headers:{
          Authorization:"Bearer " + getTokenFromCookie()
        }
      });
      console.log("Logged out successfully");
      // localStorage.removeItem("s_jwt");
      // localStorage.removeItem("role");
      // localStorage.removeItem('username');
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

  // Function to get the class for NavLink
  const getNavLinkClass = ({ isActive }) => 
    isActive ? "text-[#4859DA]" : "";

  // Defining the menu items array
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <NavLink to="/s/dashboard" className={getNavLinkClass}>Dashboard</NavLink>,
    },
    {
      key: "2",
      icon: <ProjectOutlined />,
      label: <NavLink to="/s/dashboard/projects" className={getNavLinkClass}>Projects</NavLink>,
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: <NavLink to="/s/dashboard/profile" className={getNavLinkClass}>Profile</NavLink>,
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: showLogoutModal,
    },
  ];

  return (
    <>
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems} // Using the items prop instead of children
        className="min-h-[100vh] mt-0 flex flex-col gap-[15px] text-[1rem] relative"
      />

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
