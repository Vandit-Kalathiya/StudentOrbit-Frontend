// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Button, Layout } from "antd";
import MenuList from "./MenuList";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Main from "../Main";
import Group from "./Group/GroupCard/Group";
import Batch from "./Batch/Batch";
import GroupDetails from "./Group/GroupDetails";
import WeekDetails from "./Task/WeekDetails";

// eslint-disable-next-line no-unused-vars
const { Header, Sider, Content } = Layout;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    // <Router>
    <div className="flex w-full">
      <Layout
        className="w-full flex"
      >
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          // theme={darkTheme ? "dark" : "light"}
          className="custom-sidebar bg-white z-999 mt-20"
          style={{ position: "fixed", left: 0, bottom: 0, top: 0 }}
        >
          <div className="md:flex flex-col h-full">
            {/* <Logo /> */}
            <MenuList className="flex-grow" />
            <Button
              type="text"
              className="toggle -mt-36 ml-5"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </div>
        </Sider>
        <Layout
          className="w-full md:pl-0 bg-inherit"
          style={{
            marginLeft: collapsed ? 80 : 170, 
            transition: "margin-left 0.3s linear",
            marginRight: 16, 
          }}
        >
          {/* <Header
          className="header bg-white text-black shadow-md h-20 pt-4 w-[90%] z-10 ml-20"
          style={{ position: "fixed", left: 0, top: 0 }}
        >
          <CHeader />
        </Header> */}
          <Content
            className="transition-margin h-full overflow-auto mt-20"
            style={{
              marginLeft: collapsed ? "1vw" : "4vw",
              transition: "margin-left 0.3s ease-in-out",
            }}
          >
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="batches" element={<Batch />} />
              <Route path="batches/:batch" element={<Group />} />
              <Route
                path="batches/:batch/:projectName"
                element={<GroupDetails collapsed={collapsed} />}
              />
              <Route path="batches/:batch/:projectName/:week" element={<WeekDetails />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
    // </Router>
  );
}

export default Sidebar;
