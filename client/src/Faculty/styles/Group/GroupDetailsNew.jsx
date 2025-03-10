import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import GroupLeft from "./GroupLeft";
import GroupRight from "./GroupRight/GroupRight";
import { BASE_URL, getUsernameFromToken } from "../../../../authToken";
import { useEffect, useState } from "react";
import axios from "axios";
import GroupSkeleton from "../../../skeleton/GroupSkeleton";
import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Chatbot from "../../../Students/Chat/Chatbot"; // Assuming Chatbot is in this path
import { BsFillPeopleFill } from "react-icons/bs";

function GroupDetailsNew({ collapsed }) {
  const { batch, projectName } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [members, setMembers] = useState([]);
  const location = useLocation();
  const fetchedUsername = getUsernameFromToken();
  const [loading, setLoading] = useState(false);

  const project = location.state;

  const toggleChatPopup = () => {
    setIsChatOpen((prev) => !prev);
  };

  useEffect(() => {
    if (location.state) {
      setRoomId(location.state.uniqueGroupId);
      setMembers(location.state.students);
    }
  }, [location.state]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/faculty/groups/g/${project.groupName}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.weeks);
      })
      .finally(() => setLoading(false));
  }, [project]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col m-[none] h-auto w-[100%] md:h-[100%] md:overflow-hidden bg-slate-100 font-poppins"
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
      <div
        className="fixed bottom-8 right-8 z-50 bg-[#5B6DF3] text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={toggleChatPopup}
      >
        <MessageOutlined style={{ fontSize: "24px" }} />
      </div>

      <Drawer
        title={
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Chat With Your Team</span>
            <BsFillPeopleFill className="h-5 w-5" />
          </div>
        }
        placement="right"
        closable={true}
        onClose={toggleChatPopup}
        open={isChatOpen}
        width={window.innerWidth < 768 ? "90%" : 790}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ background: "#5B6DF3", color: "white" }}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        closeIcon={<CloseOutlined style={{ color: "white" }} />}
      >
        <Chatbot roomId={roomId} members={members} />
      </Drawer>
    </motion.div>
  );
}

export default GroupDetailsNew;
