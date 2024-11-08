import { motion } from "framer-motion";
import CardList from "./CardList";
import TodoList from "./TodoList";
import CalendarWrapper from "./CalendarWrapper";
import TeamProgressCard from "./TeamProgressCard";
import WorkloadCard from "./WorkloadCard";
import { useEffect, useRef, useState } from 'react';
import useLenisScroll from '../../Hooks/useLenisScroll';
import axios from "axios";

const DashboardDetails = () => {

  const todoListRef = useRef(null);
  useLenisScroll([todoListRef]);

  const [todo, setTodo] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  useEffect(() => {
    axios.get(`http://localhost:1818/tasks/count/${localStorage.getItem("username")}/TO_DO`)
      .then((res) => setTodo(res.data));

      axios.get(`http://localhost:1818/tasks/count/${localStorage.getItem("username")}/IN_PROGRESS`)
      .then((res) => setInProgress(res.data));

      axios.get(`http://localhost:1818/tasks/count/${localStorage.getItem("username")}/COMPLETED`)
      .then((res) => setCompleted(res.data));
  }, []);

  console.log(todo, " in ", inProgress, " c", completed);
  

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
          variants={itemVariants}
        >
          <CardList todo={todo} inProgress={inProgress} completed={completed} />
          <motion.div className="w-full mb-6" ref={todoListRef} variants={itemVariants}>
            <TodoList />
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6"
          variants={itemVariants}
        >
          <CalendarWrapper />
        </motion.div>
      </div>

      <motion.div className="grid md:grid-cols-2 gap-8 mb-5" variants={itemVariants}
      >
        <motion.div variants={itemVariants}>
          <TeamProgressCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <WorkloadCard />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardDetails;
