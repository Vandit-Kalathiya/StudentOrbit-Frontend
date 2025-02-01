import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import GroupLeft from "./GroupLeft";
import GroupRight from "./GroupRight/GroupRight";
import { getUsernameFromToken } from "../../../../authToken";
import { useEffect, useState } from "react";
import axios from "axios";
import GroupSkeleton from "../../../skeleton/GroupSkeleton";

function GroupDetailsNew({ collapsed }) {
  const { batch, projectName } = useParams();
  const location = useLocation();
  const fetchedUsername = getUsernameFromToken();
  const [loading, setLoading] = useState(false);

  const project = location.state;

  useEffect(() => {
    // console.log("loaded...");
  }, [project]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:1818/faculty/groups/g/${project.groupName}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.weeks);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      className="flex flex-col m-[none] h-auto w-[100%] md:h-[100%] md:overflow-hidden bg-[#F5F5F5] font-poppins"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full mt-10">
        <motion.h1
          className="text-5xl font-semibold text-center"
          variants={itemVariants}
        >
          {batch || fetchedUsername.toUpperCase()}
        </motion.h1>
      </div>

      {loading ? (
        <GroupSkeleton />
      ) : (
        <div className="md:flex-1 md:overflow-hidden flex flex-col md:flex-row h-auto md:max-h-[100vh] md:py-4 px-5">
          <motion.div
            className="md:flex-1"
            style={{
              left: collapsed ? "3rem" : "11rem",
              transition: "left 0.2s linear",
              height: "calc(100vh - someOffset)",
            }}
            variants={itemVariants}
          >
            <GroupLeft projectName={projectName} />
          </motion.div>

          <motion.div
            className="md:flex-1 md:overflow-auto md:max-h-[73vh] py-4"
            variants={itemVariants}
          >
            <div className="block">
              <GroupRight project={project} />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default GroupDetailsNew;
