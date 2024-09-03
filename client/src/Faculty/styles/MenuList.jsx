import { useState, useEffect } from 'react';
import { Menu, Modal } from "antd";
import {
  DashboardOutlined,
  AreaChartOutlined,
  SettingOutlined,
  BarsOutlined,
  LogoutOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Link, useLocation, matchPath } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const MenuList = ({ darkTheme, batchData }) => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const match = matchPath('/dashboard/batches/:batch', location.pathname);
    setIsSubMenuVisible(match !== null);
  }, [location.pathname]);

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
    setIsLogoutModalVisible(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <>
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="min-h-[100vh] mt-0 flex flex-col gap-[15px] text-[1rem] relative"
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/f/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ProjectOutlined />}>
          <Link to="/s/dashboard">Projects</Link>
        </Menu.Item>
        {isSubMenuVisible ? (
          <Menu.SubMenu key="3" icon={<BarsOutlined />} title="My Batches">
            {batchData.map((batch, index) => (
              <Menu.Item key={`3-${index}`}>
                <Link to={batch.route}>{batch.name}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key="3" icon={<BarsOutlined />}>
            <Link to="/f/dashboard/batches">My Batches</Link>
          </Menu.Item>
        )}
        <Menu.Item key="4" icon={<AreaChartOutlined />}>
          <Link to="/f/dashboard/progress">Progress</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item key="6" icon={<LogoutOutlined />} onClick={showLogoutModal}>
          Logout
        </Menu.Item>
      </Menu>

      <Modal
        title="Confirm Logout"
        visible={isLogoutModalVisible}
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
