import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Button, Layout } from "antd";
import MenuList from "./MenuList";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ProjectCard from "./Project/ProjectCard";
import ProjectDetails from "./Project/ProjectDetails";
import WeekDetails from '../Faculty/styles/Task/TaskCard/WeekDetails'
import TaskDetail from "../Faculty/styles/Task/TaskPage/TaskDetail";
import DashboardDetails from "./DashboardS/DashboardDetails";
import Profile from "./Profile/Profile";
import Chatbot from "./Chat/Chatbot";

const { Sider, Content } = Layout;

function Sidebar({setLoginStatus}) {
  const [collapsed, setCollapsed] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  return (
    <Layout className="flex w-full">
      <div
        className="md:hidden fixed bottom-8 left-2 cursor-pointer z-50 bg-[#5B6DF3] text-white py-2 px-6 rounded-md"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>

      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={`md:block custom-sidebar bg-white z-999 mt-20 ${!sidebarVisible ? 'hidden' : ''}`}
        style={{ position: "fixed", left: 0, bottom: 0, top: 0 }}
      >
        <div className="md:flex flex-col h-full">
          <MenuList setLoginStatus={setLoginStatus} className="flex-grow" />
          <Button
            type="text"
            className="toggle -mt-36 ml-5"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </div>
      </Sider>

      <Layout
        className={`w-full ${sidebarVisible ? 'md:pl-0' : 'pl-0'} bg-inherit min-h-screen`}
        style={{
          marginLeft: sidebarVisible ? (collapsed ? 70 : 150) : 0,
          transition: "margin-left 0.1s linear",
          marginRight: 16,
        }}
      >
        <Content
          className="transition-margin  h-full mt-20"
          style={{
            marginLeft: collapsed ? "1vw" : "4vw",
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardDetails />} />
            <Route path="/projects" element={<ProjectCard />} />
            <Route path="/projects/:projectName" element={<ProjectDetails collapsed={collapsed} />} />
            <Route path="/projects/:projectName/:week" element={<WeekDetails />} />
            <Route path="/projects/:projectName/:week/:taskId" element={<TaskDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
