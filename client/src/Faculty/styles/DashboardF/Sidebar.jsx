import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Button, Layout } from "antd";
import MenuList from "./MenuList";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Main from "../DashboardF/Main";
import Group from "../Group/GroupCard/Group";
import Batch from "../Batch/Batch";
import WeekDetails from "../Task/TaskCard/WeekDetails";
import TaskDetail from "../Task/TaskPage/TaskDetail";
// import Project from "../../Progress/Project";
import GroupDetailsNew from "../Group/GroupDetailsNew";

const { Sider, Content } = Layout;

function Sidebar({ setLoginStatus }) {
  const [collapsed, setCollapsed] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { 
        setSidebarVisible(false);    
        setCollapsed(false);    
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location]);

  const isMobile = window.innerWidth < 768;

  return (
    <Layout className="flex w-[100vw]">
      {isMobile && (
        <div
          className="md:hidden fixed bottom-8 left-2 cursor-pointer z-50 bg-[#5B6DF3] text-white py-2 px-6 rounded-md"
          onClick={toggleSidebar}
        >
          {sidebarVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
        <div className="md:flex flex-col md:h-full">
          <MenuList className="flex-grow" setLoginStatus={setLoginStatus} />
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
        } bg-inherit min-h-screen h-auto`}
        style={{
          // marginLeft: collapsed ? 70 : 150,
          marginLeft: !isMobile && sidebarVisible ? (collapsed ? 70 : 150) : 0,
          transition: !isMobile ? "margin-left 0.1s linear" : "none",
          marginRight: !isMobile ? 16 : 0,
        }}
      >
        <Content
          className="transition-margin mt-20 bg-slate-100"
          style={{
            marginLeft: !isMobile ? (collapsed ? "1vw" : "4vw") : 0,
            transition: !isMobile ? "margin-left 0.3s ease-in-out" : "none",
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="batches" element={<Batch />} />
            <Route path="batches/:batch" element={<Group />} />
            <Route
              path="batches/:batch/:projectName"
              element={<GroupDetailsNew collapsed={collapsed} />}
            />
            <Route
              path="batches/:batch/:projectName/:week"
              element={<WeekDetails />}
            />
            <Route
              path="batches/:batch/:projectName/:week/:taskId"
              element={<TaskDetail />}
            />
            {/* <Route path="progress" element={<Project />} /> */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
