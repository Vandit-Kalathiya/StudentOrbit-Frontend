import { Modal, Form, Input, Select, Button, notification } from "antd";
import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const AddBatchModal = ({ visible, onCancel, form, onBatchAdded }) => {
  // let navigate = useNavigate();
  const [batchName, setBatchName] = useState("");
  const [semester, setSemester] = useState(0);
  const [startId, setStartId] = useState("");
  const [endId, setEndId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBatchName = (e) => {
    setBatchName(e.target.value);
  };
  const handleSemester = (e) => {
    setSemester(e);
  };
  const handleStartId = (e) => {
    setStartId(e.target.value);
  };
  const handleEndId = (e) => {
    setEndId(e.target.value);
  };

  const handleAddBatch = async () => {
    setLoading(true);
    const batchData = {
      batchName: batchName,
      semester: semester,
      startId: startId,
      endId: endId,
    };
    console.log(batchData);

    try {
      const response = await axios.post("http://localhost:1818/faculty/batches/add", batchData, {
        withCredentials: true,
      });
      onBatchAdded(response.data);
      form.resetFields();
      console.log("Batch added...");
      onCancel();
    } catch (error) {
      console.error("There was an error submitting the batch:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal
      title="Add New Batch"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddBatch}
        initialValues={{ batch: "", sem: "", id1: "", id2: "" }}
      >
        <Form.Item
          name="batch"
          label="Batch Name"
          rules={[
            { required: true, message: "Please input the batch name!" },
            {
              pattern: /^[a-dA-D][1-2]$/,
              message: "Batch name is not valid",
            },
          ]}
        >
          <Input placeholder="Eg. A1" onChange={(e) => handleBatchName(e)} />
        </Form.Item>
        <Form.Item
          name="sem"
          label="Semester"
          rules={[{ required: true, message: "Please select the semester!" }]}
        >
          <Select
            placeholder="Select Semester"
            allowClear
            onChange={(e) => handleSemester(e)}
          >
            {[...Array(7).keys()].map((_, i) => (
              <Select.Option key={i + 2} value={i + 2}>
                {i + 2}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="id1"
          label="Start Id"
          rules={[
            { required: true, message: "Please input the start student ID!" },
            {
              pattern: /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/,
              message: "Student ID must be in the format YYCEXXX",
            },
          ]}
        >
          <Input placeholder="22CEXXX" onChange={(e) => handleStartId(e)} />
        </Form.Item>
        <Form.Item
          name="id2"
          label="End Id"
          rules={[
            { required: true, message: "Please input the end student ID!" },
            {
              pattern: /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/,
              message: "Student ID must be in the format YYCEXXX",
            },
          ]}
        >
          <Input placeholder="22CEXXX" onChange={(e) => handleEndId(e)} />
        </Form.Item>
        <Form.Item>
          <Button className="bg-[#4859DA] text-white" htmlType="submit" loading={loading}>
            Add Batch
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBatchModal;
