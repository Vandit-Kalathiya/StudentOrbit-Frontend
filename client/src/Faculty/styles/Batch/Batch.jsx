import { useEffect, useState } from "react";
import { Typography, Button, Form, Select } from "antd";
import { Plus } from "lucide-react";
import BatchCard from "./BatchCard";
import AddBatchModal from "./AddBatchModal";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { openNotification } from "../../../Utils/Notification";
import { BASE_URL, getUsernameFromToken } from "../../../../authToken";
import SkeletonCardGrid from "../../../skeleton/BatchCardSkeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Batch = () => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchedUsername = getUsernameFromToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/faculty/batches/b/${fetchedUsername}`,
          { withCredentials: true }
        );
        const demo = response.data;
        setData(demo);
      } catch (error) {
        console.error("There was an error while getting all batches: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchedUsername, temp]);

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

  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2023; year <= currentYear; year++) {
    years.push({ label: `${year} Odd`, value: JSON.stringify({ year, type: 1 }) });
    years.push({ label: `${year} Even`, value: JSON.stringify({ year, type: 2 }) });
  }

  const handleChange = (value) => {
    const selected = JSON.parse(value); // Parse the string back into an object
    console.log("Selected Year:", selected.year, selected.type);
    // console.log("Type:", selected.type === 1 ? "Odd" : "Even");
  };

  return (
    <div className="my-6 mx-3 md:my-8 md:px-8 pl-3">
      <div className="relative flex md:flex-row flex-col items-center justify-center p-2">
        <div>
          <Select
            style={{ width: 200 }}
            placeholder="Select a year"
            onChange={handleChange}
          >
            {years.map((year, index) => (
              <Select.Option key={index} value={year.value}>
                {year.label}
              </Select.Option>
            ))}
          </Select>
        </div>
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
      {loading ? (
        <div className="text-center h-10">
          <SkeletonCardGrid />
        </div>
      ) : data.length === 0 ? (
        <div className="col-span-full text-center p-10 text-gray-500 text-xl font-medium">
          <p className="bg-gray-100 rounded-lg p-5 shadow-sm ">
            You don't have any batches yet..! Start by creating one to see it
            here.🚀
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 md:mt-4"
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
                id={item.id}
                setTemp={setTemp}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
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
