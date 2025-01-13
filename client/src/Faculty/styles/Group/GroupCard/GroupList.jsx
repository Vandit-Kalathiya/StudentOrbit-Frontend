import { motion } from "framer-motion";
import Banner from "./Banner";
import Loader from "../../../../components/Loader";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, 
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};



const GroupList = ({ data, batch, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader />
      </div>
    );
  }
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:mt-4 md:grid-cols-2 lg:grid-cols-2"
      variants={containerVariants} 
      initial="hidden" 
      animate="show"   
    >
      {data
        .filter((item) => item && item.id)
        .map((item) => (
          <motion.div key={item.id} variants={cardVariants}>
            <Banner project={item} batch={batch}/>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default GroupList;
