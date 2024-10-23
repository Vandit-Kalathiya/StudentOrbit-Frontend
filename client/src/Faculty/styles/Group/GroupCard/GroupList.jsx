import { motion } from "framer-motion";
import Banner from "./Banner";

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
  hidden: { opacity: 0, y: 20 }, 
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const GroupList = ({ data, batch }) => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:mt-4 md:grid-cols-2 lg:grid-cols-2"
      variants={containerVariants} 
      initial="hidden" 
      animate="show"   
    >
      {data
        .filter((item) => item && item.id)
        .map((item, index) => (
          <motion.div key={item.id} variants={cardVariants}>
            <Banner project={item} batch={batch}/>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default GroupList;