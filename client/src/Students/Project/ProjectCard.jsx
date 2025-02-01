import { useEffect, useState } from "react";
import ProjectCardItem from "./ProjectCardItem";
import { motion } from "framer-motion";
import axios from "axios";
import { getUsernameFromToken } from "../../../authToken";
import ProjectCardSkeleton from "../../skeleton/ProjectCardSkeleton";

const ProjectCard = () => {
  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedUsername = getUsernameFromToken();
    setLoading(true);
    axios
      .get(`http://localhost:1818/students/g/${fetchedUsername}`, {
        withCredentials: true,
      })
      .then((res) => {
        const demo = res.data;
        setProject(demo);
      })
      .catch((error) => {
        console.error("There was an error while getting all batches: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 0 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const emptyStateVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <h1 className="md:text-[2.5rem] text-3xl text-center my-5 mt-10 font-semibold font-poppins">
        My Projects
      </h1>
      {loading ? (
        <ProjectCardSkeleton />
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 my-5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {projects.length === 0 ? (
            <motion.div
              className="col-span-full text-center p-10 text-gray-500 text-xl font-medium"
              variants={emptyStateVariants}
            >
              <p className="bg-gray-100 rounded-lg p-5 shadow-sm ">
                You don't have any projects yet..! Start by developing one to
                see it here.🚀
              </p>
            </motion.div>
          ) : (
            projects.map((project, index) => (
              <motion.div key={index} variants={cardVariants}>
                <ProjectCardItem project={project} />
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </>
  );
};

export default ProjectCard;
