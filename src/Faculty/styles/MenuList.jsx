// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Menu } from "antd";
import {
  DashboardOutlined,
  AreaChartOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BarsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const MenuList = ({ darkTheme }) => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard/batches/groups') {
      setIsSubMenuVisible(true);
    } else {
      setIsSubMenuVisible(false);
    }
  }, [location.pathname]);

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      defaultSelectedKeys={["1"]}
      className="min-h-[100vh] mt-0 flex flex-col gap-[15px] text-[1rem] relative"
    >
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<AppstoreOutlined />}>
        Activity
      </Menu.Item>
      {isSubMenuVisible ? (
        <Menu.SubMenu key="3" icon={<BarsOutlined />} title="My Batches">
          <Menu.Item key="3-1">
            <Link to="/dashboard/batches/groups">Batch A1</Link>
          </Menu.Item>
          <Menu.Item key="3-2">
            <Link to="/dashboard/batches/groups">Batch B1</Link>
          </Menu.Item>
          <Menu.Item key="3-3">
            <Link to="/dashboard/batches/groups">Batch C1</Link>
          </Menu.Item>
        </Menu.SubMenu>
      ) : (
        <Menu.Item key="3" icon={<BarsOutlined />}>
          <Link to="/dashboard/batches">My Batches</Link>
        </Menu.Item>
      )}
      {/* <Menu.Item key="3" icon={<BarsOutlined />}>
       <Link to="/dashboard/batches">My Batches</Link>
      </Menu.Item> */}
      {/* <Menu.SubMenu key="3" icon={<BarsOutlined />} title="My Batches">
        <Menu.Item key="3-1">
          <Link to="/dashboard/batches">Batch A1</Link>
        </Menu.Item>
        <Menu.Item key="3-2">
          <Link to="/dashboard/groups">Batch B1</Link>
        </Menu.Item>
        <Menu.Item key="3-3">
          <Link to="/dashboard/groups">Batch C1</Link>
        </Menu.Item>
      </Menu.SubMenu> */}
      <Menu.Item key="4" icon={<AreaChartOutlined />}>
        Progress
      </Menu.Item>
      <Menu.Item key="5" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="6" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
