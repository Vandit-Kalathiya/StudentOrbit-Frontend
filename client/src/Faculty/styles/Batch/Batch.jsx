import { useEffect, useState } from "react";
import { Typography, Button, Form } from "antd";
import { Plus } from "lucide-react";
import BatchCard from "./BatchCard";
import AddBatchModal from "./AddBatchModal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { openNotification } from "../../../Utils/Notification";
import { getUsernameFromToken } from "../../../../authToken";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.4 } },
};

const Batch = () => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const fetchedUsername = getUsernameFromToken()

  useEffect(() => {
    axios
      .get(`http://localhost:1818/faculty/batches/b/${fetchedUsername}`,{withCredentials:true})
      .then((res) => {
        const demo = res.data;        
        setData(demo);
      })
      .catch((error) => {
        console.error("There was an error while getting all batches: ", error);
      });
  }, []);

  const handleBatchAdded = (values) => {
    setData([...data, values]);
    setShowModal(false);
    form.resetFields();
    openNotification(
      "success",
      "Batch Added",
      "The batch has been added successfully."
    );
  };

  return (
    <div className="my-6 mx-3 md:my-8 md:px-8 pl-3">
      <div className="relative flex md:flex-row flex-col items-center justify-center p-2">
        <Typography className="md:m-0 mt-5 text-center text-4xl md:text-5xl flex-grow font-semibold">
          Batches
        </Typography>
        <div className="p-2">
          <Button
            shape="round"
            icon={<Plus />}
            className="bg-[#5B6DF3] text-white hover:bg-[#4859da] py-5 text-center mt-2"
            onClick={() => setShowModal(true)}
          >
            Add Batch
          </Button>
        </div>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 md:mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <BatchCard
              batch={item.batchName}
              sem={item.semester}
              id1={item.startId}
              id2={item.endId}
            />
          </motion.div>
        ))}
      </motion.div>
      <AddBatchModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        form={form}
        onBatchAdded={handleBatchAdded}
      />
    </div>
  );
};

export default Batch;
