import { motion } from "framer-motion";
import CardList from "./CardList";
import TodoList from "./TodoList";
import CalendarWrapper from "./CalendarWrapper";
import TeamProgressCard from "./TeamProgressCard";
import WorkloadCard from "./WorkloadCard";
import { useEffect, useRef, useState } from 'react';
import useLenisScroll from '../../Hooks/useLenisScroll';
import axios from "axios";
import { getUsernameFromToken } from "../../../authToken";
import { Select } from "antd";

const DashboardDetails = () => {
  const todoListRef = useRef(null);
  useLenisScroll([todoListRef]);

  const [todo, setTodo] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [projects, setProjects] = useState([]); // Store all projects
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project

  useEffect(() => {
    const fetchedUsername = getUsernameFromToken();

    // Fetch all projects
    axios.get(`http://localhost:1818/students/gs/${fetchedUsername}`, { withCredentials: true })
      .then((res) => {
        setProjects(res.data);
        setSelectedProject(res.data[0]); // Set the first project as default
      });

    // Fetch task counts
    axios.get(`http://localhost:1818/tasks/count/${fetchedUsername}/TO_DO`, { withCredentials: true })
      .then((res) => setTodo(res.data));

    axios.get(`http://localhost:1818/tasks/count/${fetchedUsername}/IN_PROGRESS`, { withCredentials: true })
      .then((res) => setInProgress(res.data));

    axios.get(`http://localhost:1818/tasks/count/${fetchedUsername}/COMPLETED`, { withCredentials: true })
      .then((res) => setCompleted(res.data));
  }, []);

  // Update selected project based on dropdown selection
  const handleProjectChange = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const handleDropdownVisibleChange = (open) => {
    setDropdownVisible(open);
  };

  return (
    <motion.div
      className="overflow-hidden mt-10 px-8 md:mt-8 md:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap -mx-4">
        <motion.div
          className="w-full md:w-2/3 lg:w-3/4 px-4 flex flex-col"
          variants={containerVariants}
        >
          <CardList todo={todo} inProgress={inProgress} completed={completed} />
          <motion.div className="w-full mb-6" ref={todoListRef} variants={containerVariants}>
            <TodoList projects={projects}/>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6"
          variants={containerVariants}
        >
          <CalendarWrapper />
        </motion.div>
      </div>

      <motion.div className="grid md:grid-cols-2 gap-8 mb-5" variants={containerVariants}>
        <motion.div className="relative" variants={containerVariants}>
          <div className="relative">
            <div className="absolute top-3 right-3 z-10">
              <div className="flex justify-end mb-4">
                <Select
                  value={selectedProject?.id || ""}
                  onSelect={handleProjectChange}
                  open={dropdownVisible}
                  onDropdownVisibleChange={handleDropdownVisibleChange}
                >
                  {projects.map((project) => (
                    <Select.Option key={project.id} value={project.id}>
                      {project.groupName}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {selectedProject && (
            <TeamProgressCard weeks={selectedProject.weeks} />
          )}
        </motion.div>

        {/* Workload Card */}
        <motion.div variants={containerVariants}>
          <WorkloadCard members={selectedProject?.students || []} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardDetails;
