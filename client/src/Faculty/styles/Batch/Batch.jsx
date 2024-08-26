import { useState } from "react";
import { Typography, Button, Form } from "antd";
import { Plus } from "lucide-react";
import BatchCard from "./BatchCard";
import AddBatchModal from "./AddBatchModal";

const initialData = [
  { batch: "A1", sem: "5", id1: "22ce001", id2: "22ce022" },
  { batch: "B1", sem: "3", id1: "22ce023", id2: "22ce045" },
  { batch: "C1", sem: "5", id1: "22ce046", id2: "22ce068" },
  { batch: "A1", sem: "3", id1: "22ce001", id2: "22ce022" },
  { batch: "B1", sem: "5", id1: "22ce023", id2: "22ce045" },
  { batch: "C2", sem: "5", id1: "22ce141", id2: "22ce164" },
];

const Batch = () => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);

  const handleAddBatch = (values) => {
    setData([...data, values]);
    setShowModal(false);
    form.resetFields();
  };

  return (
    <div className="my-6 mx-3 md:my-8 md:px-8">
      <div className="relative flex md:flex-row items-center justify-center p-2">
        <Typography className="md:m-0 mt-5 text-center text-4xl md:text-5xl flex-grow font-semibold">
          Batches
        </Typography>
        <div className="p-2">
          <Button
            shape="round"
            icon={<Plus />}
            className="bg-[#5B6DF3] text-white hover:bg-[#4859da] py-5 text-center my-5"
            onClick={() => setShowModal(true)}
          >
            Add Batch
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mt-4">
        {data.map((item, index) => ( 
          <BatchCard key={index} batch={item.batch} sem={item.sem} id1={item.id1} id2={item.id2} />
        ))}
      </div>
      <AddBatchModal visible={showModal} onCancel={() => setShowModal(false)} onFinish={handleAddBatch} form={form} />
    </div>
  );
};

export default Batch;
