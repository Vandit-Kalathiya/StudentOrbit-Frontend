import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Button, Layout } from "antd";
import MenuList from "./MenuList";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ProjectCard from "./Project/ProjectCard";
import ProjectDetails from "./Project/ProjectDetails";
import WeekDetails from '../Faculty/styles/Task/TaskCard/WeekDetails'
import TaskDetail from "../Faculty/styles/Task/TaskPage/TaskDetail";

// eslint-disable-next-line no-unused-vars
const { Header, Sider, Content } = Layout;

const initialData = [
  { batch: "A1", sem: "5", id1: "22ce001", id2: "22ce022" },
  { batch: "B1", sem: "3", id1: "22ce023", id2: "22ce045" },
  { batch: "C1", sem: "5", id1: "22ce046", id2: "22ce068" },
  { batch: "A1", sem: "3", id1: "22ce001", id2: "22ce022" },
  { batch: "B1", sem: "5", id1: "22ce023", id2: "22ce045" },
  { batch: "C2", sem: "5", id1: "22ce141", id2: "22ce164" },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true); // Track sidebar visibility on mobile

  const batchData = initialData.map(item => ({
    name: `${item.sem}${item.batch}`,
    route: `/dashboard/batches/${item.sem}${item.batch}`
  }));

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  return (
    <Layout className="flex w-full">
      {/* Sidebar Toggle Button for Mobile View */}
      <div
        className="md:hidden absolute bottom-8 left-2 cursor-pointer z-50 bg-[#5B6DF3] text-white py-2 px-6 rounded-md"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className={`md:block custom-sidebar bg-white z-999 mt-20 ${!sidebarVisible ? 'hidden' : ''}`}
        style={{ position: "fixed", left: 0, bottom: 0, top: 0 }}
      >
        <div className="md:flex flex-col h-full">
          <MenuList className="flex-grow" batchData={batchData} />
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
          // marginLeft: collapsed ? 70 : 150,
          marginLeft: sidebarVisible ? (collapsed ? 70 : 150) : 0,
          transition: "margin-left 0.1s linear",
          marginRight: 16,
        }}
      >
        <Content
          className="transition-margin h-full overflow-auto mt-20"
          style={{
            marginLeft: collapsed ? "1vw" : "4vw",
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          <Routes>
            <Route path="/projects" element={<ProjectCard />} />
            <Route path="/projects/:projectName" element={<ProjectDetails collapsed={collapsed} />} />
            <Route path="/projects/:projectName/:week" element={<WeekDetails />} />
            <Route path="/projects/:projectName/:week/:taskId" element={<TaskDetail />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
