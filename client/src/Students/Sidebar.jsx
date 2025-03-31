import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Button, Layout } from "antd";
import MenuList from "./MenuList";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ProjectCard from "./Project/ProjectCard";
import ProjectDetails from "./Project/ProjectDetails";
import WeekDetails from "../Faculty/styles/Task/TaskCard/WeekDetails";
import TaskDetail from "../Faculty/styles/Task/TaskPage/TaskDetail";
import DashboardDetails from "./DashboardS/DashboardDetails";
import Profile from "./Profile/Profile";
import Chatbot from "./Chat/Chatbot";
import Index from "./Github/Pages/Index"
import Repository from "./Github/Pages/Repository"
import UserProfile from "./Github/Pages/UserProfile"


const { Sider, Content } = Layout;

function Sidebar({ setLoginStatus }) {
  const [collapsed, setCollapsed] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleReSize = () => {
      if (window.innerWidth <= 768) {
        setSidebarVisible(false);
        setCollapsed(false);
      } else {
        setSidebarVisible(true);
      }
    };

    handleReSize();
    window.addEventListener("resize", handleReSize);
    return () => window.removeEventListener("resize", handleReSize);
  }, [location]);

  const isMobile = window.innerWidth <= 768;

  return (
    <Layout className="flex w-full">
      {isMobile && (
        <div
          className="md:hidden fixed bottom-8 left-2 cursor-pointer z-50 bg-[#5B6DF3] text-white py-2 px-6 rounded-md"
          onClick={toggleSidebar}
        >
          {sidebarVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
      )}

      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={`md:block custom-sidebar bg-white z-[40] mt-20 ${
          !sidebarVisible ? "hidden" : ""
        }`}
        style={{ position: "fixed", left: 0, bottom: 0, top: 0 }}
      >
        <div className="md:flex flex-col h-full">
          <MenuList setLoginStatus={setLoginStatus} className="flex-grow" />
          {!isMobile && (
            <Button
              type="text"
              className="toggle -mt-36 ml-5"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          )}
        </div>
      </Sider>

      {isMobile && sidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      <Layout
        className={`w-full ${
          sidebarVisible ? "md:pl-0" : "pl-0"
        } bg-inherit min-h-screen`}
        style={{
          marginLeft: !isMobile && sidebarVisible ? (collapsed ? 70 : 150) : 0,
          transition: !isMobile ? "margin-left 0.1s linear" : "none",
          marginRight: !isMobile ? 16 : 0,
        }}
      >
        <Content
          className="transition-margin  h-full mt-20 bg-slate-100"
          style={{
            marginLeft: !isMobile ? (collapsed ? "1vw" : "4vw") : 0,
            transition: !isMobile ? "margin-left 0.3s ease-in-out" : "none",
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardDetails />} />
            <Route path="/projects" element={<ProjectCard />} />
            <Route
              path="/projects/:projectName"
              element={<ProjectDetails collapsed={collapsed} />}
            />
            <Route
              path="/projects/:projectName/:week"
              element={<WeekDetails />}
            />
            <Route
              path="/projects/:projectName/:week/:taskId"
              element={<TaskDetail />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/github" element={<Index />} />
            <Route path="/github/repository" element={<Repository />} />
            <Route path="/github/user" element={<UserProfile />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
