import { Modal, Form, Input, Select, Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../../../../authToken";

const AddBatchModal = ({ visible, onCancel, form, onBatchAdded, onBatchEdited, mode = "add", batchDetails = {} }) => {
  const [batchName, setBatchName] = useState("");
  const [semester, setSemester] = useState(0);
  const [startId, setStartId] = useState("");
  const [endId, setEndId] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchedUsername = getUsernameFromToken()

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

  // const handleAddBatch = async () => {
  //   setLoading(true);
  //   const batchData = {
  //     batchName: batchName,
  //     semester: semester,
  //     startId: startId,
  //     endId: endId,
  //     assignedFacultyUsername: fetchedUsername
  //   };
  //   console.log(batchData);

  //   try {
  //     const response = await axios.post("http://localhost:1818/faculty/batches/add", batchData, {
  //       withCredentials: true,
  //     });
  //     onBatchAdded(response.data);
  //     form.resetFields();
  //     console.log("Batch added...");
  //     onCancel();
  //   } catch (error) {
  //     console.error("There was an error submitting the batch:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (mode === "edit" && batchDetails) {
      setBatchName(batchDetails.batchName || "");
      setSemester(batchDetails.semester || null);
      setStartId(batchDetails.startId || "");
      setEndId(batchDetails.endId || "");

      form.setFieldsValue({
        batch: batchDetails.batchName,
        sem: batchDetails.semester,
        id1: batchDetails.startId,
        id2: batchDetails.endId,
      });
    } else {
      setBatchName("");
      setSemester(null);
      setStartId("");
      setEndId("");
      form.resetFields();
    }
  }, [batchDetails, mode, form]);


  const handleSubmit = async () => {
    setLoading(true);
    const batchData = {
      batchName,
      semester,
      startId,
      endId,
      assignedFacultyUsername: fetchedUsername,
    };
    console.log(batchData);

    try {
      if (mode === "add") {
        const response = await axios.post("http://localhost:1818/faculty/batches/add", batchData, {
          withCredentials: true,
        });
        onBatchAdded(response.data);
        message.success("Batch added successfully!");
      } else {
        // const response = await axios.put(
        //   `http://localhost:1818/faculty/batches/edit/${batchDetails.id}`,
        //   batchData,
        //   { withCredentials: true }
        // );
        // onBatchEdited(response.data);
        message.success("Batch updated successfully!");
      }
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Error submitting the batch:", error);
      message.error("There was an error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={mode === "add" ? "Add New Batch" : "Edit Batch"}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          batch: batchName,
          sem: semester,
          id1: startId,
          id2: endId,
        }}
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
            {mode === "add" ? "Add Batch" : "Update Batch"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBatchModal;
