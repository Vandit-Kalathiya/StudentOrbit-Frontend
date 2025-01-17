import { message, Modal, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getRole } from "../../../../../authToken";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import EditGroupModal from "./EditGroupModal";

const Banner = ({ project, batch }) => {
  const navigate = useNavigate();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const role = getRole();

  const handleReadMore = () => {
    navigate(`/f/dashboard/batches/${batch}/${project.groupName}`, {
      state: project,
    });
  };

  const handleDelete = () => {
    // onDelete(batch);
    axios.delete(`http://localhost:1818/faculty/groups/${project.id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data);
      })
    setDeleteModalVisible(false);
    // message.success("Project deleted successfully!");
  };

  console.log(project);
  

  return (
    <div className="w-full rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-8 py-7 relative overflow-hidden">
      <div className="relative">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-[#5B6DF3] transition-colors">
            {project.groupName}
          </h3>
          <div className="px-4 py-2 text-sm font-bold rounded-lg bg-[#5B6DF3]/10 text-[#5B6DF3] border border-[#5B6DF3]/20">
            {project.uniqueGroupId}
          </div>
        </div>

        <p className="text-gray-600 mb-5 leading-relaxed text-base">
          {project.groupDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-1.5 text-sm rounded-full border-2 border-[#5B6DF3]/30 text-[#5B6DF3] 
                       hover:bg-[#5B6DF3] hover:text-white transition-all duration-300 
                       cursor-default transform hover:-translate-y-0.5"
            >
              {tech.name
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 bg-gray-50 p-3 rounded-lg border w-[14rem]">
          <div className="h-8 w-8 rounded-full bg-[#5B6DF3]/10 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-[#5B6DF3]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="font-semibold text-gray-700">Group Leader:</span>
          <span className="text-gray-600">
            {project.groupLeader?.toUpperCase()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleReadMore}
            className="group w-full sm:w-auto px-4 py-3 bg-[#5B6DF3] text-white rounded-lg
                     hover:bg-[#4859da] transition-all duration-300 
                     transform hover:-translate-y-0.5 hover:shadow-lg
                     flex items-center justify-center gap-2"
          >
            <span>Explore Innovations</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
          {role === "faculty" && (
            <div className="flex space-x-3">
              <Button
                type="text"
                size="medium"
                icon={<EditOutlined style={{ color: "blue" }} />}
                onClick={(e) => {
                  e.preventDefault();
                  // message.info("Edit functionality not implemented yet.");
                  setEditModalVisible(true);
                }}
              />
              <Button
                type="text"
                size="medium"
                icon={<DeleteOutlined style={{ color: "red" }} />}
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteModalVisible(true);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Confirm Delete.? It's very sensitive..."
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete the group{" "}
          <strong>{project.groupName}</strong>?
        </p>
      </Modal>

      <EditGroupModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        batch={batch}
        initialGroupData={project}
        onGroupUpdated={(updatedData) => console.log("Updated group data:", updatedData)}
      />
    </div>
  );
};

Banner.propTypes = {
  project: PropTypes.shape({
    groupName: PropTypes.string.isRequired,
    uniqueGroupId: PropTypes.string.isRequired,
    groupDescription: PropTypes.string,
    technologies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    groupLeader: PropTypes.string,
  }).isRequired,
  batch: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default Banner;
