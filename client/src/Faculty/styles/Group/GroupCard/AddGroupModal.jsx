import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../../../Utils/Notification";

const { TextArea } = Input;

const AddGroupModal = ({ visible, onClose, batch, onGroupAdded }) => {
  let navigate = useNavigate();
  const [form] = useForm();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groupLeaderId, setGroupLeaderId] = useState("");
  const [students, setStudents] = useState(new Set());
  const [technologies, setTechnologies] = useState(new Set());
  const [startDate, setStartDate] = useState("");

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleGroupLeaderId = (e) => {
    setGroupLeaderId(e.target.value);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  }

  const handleStudents = (e) => {
    const studentIdsArray = e.target.value.split(",").map((id) => id.trim());
    const newStudentsSet = new Set(studentIdsArray);
    setStudents(newStudentsSet);
  };

  const handleTechnologies = (e) => {
    const techArray = e.target.value.split(",").map((tech) => tech.trim());
    const newTechnologiesSet = new Set(techArray);
    setTechnologies(newTechnologiesSet);
  };

  const validateStudentIds = async (rule, value) => {
    const fetchedBatchResponse = await axios.get(
      `http://localhost:1818/faculty/batches/${batch.substring(0, 1)}/${batch.substring(1)}`, { withCredentials: true }
    );

    const startId = fetchedBatchResponse.data.startId
    const endId = fetchedBatchResponse.data.endId
    // setFetchedBatch(fetchedBatchResponse.data);

    if (!value) {
      return Promise.reject("Please input the student IDs!");
    }

    const studentIdsArray = value.split(",").map((id) => id.trim());
    if (studentIdsArray.length > 4) {
      return Promise.reject("You can enter a maximum of 4 student IDs.");
    }

    const idPattern = /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/;
    for (const id of studentIdsArray) {
      if (!idPattern.test(id)) {
        return Promise.reject("Each Student ID must be in the format YYCEXXX");
      }
      // if(id.toUpperCase() < startId.toUpperCase() || id.toUpperCase() > endId.toUpperCase()){
      //   return Promise.reject(`Each Student ID must be in range ${startId} to ${endId}`);
      // }
    }
    return Promise.resolve();
  };

  const validateGroupLeader = (_, value) => {
    if (value && value.trim().split(",").length > 1) {
      return Promise.reject("You can enter only one Group Leader ID.");
    }
    const leaderPattern = /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/;
    if (!leaderPattern.test(value.trim())) {
      return Promise.reject("Group Leader ID must be in the format YYCEXXX");
    }
    return Promise.resolve();
  };

  const handleAddGroup = async () => {
    const groupData = {
      batchName: batch,
      groupName,
      description,
      groupLeaderId,
      students: Array.from(students),
      technologies: Array.from(technologies),
      startDate,
    };
    console.log(startDate)
    // console.log(groupData);

    const fetchedBatch = await axios.get(`http://localhost:1818/faculty/batches/${batch.substring(0, 1)}/${batch.substring(1)}`, { withCredentials: true })

    try {
      const res = await axios.post(
        "http://localhost:1818/faculty/groups/create",
        groupData,
        {
          withCredentials: true,
        }
      );
      console.log("Group added...");
      onGroupAdded(res.data);
      openNotification("success", "Group Added", "The new group has been added successfully.");
      form.resetFields();
      onClose();
      navigate(`/f/dashboard/batches/${batch}`);
    } catch (error) {
      openNotification("error", "Group Creation Failed", error.response.data.message);
      console.error("There was an error submitting the group:", error);
    }
  };

  return (
    <Modal
      title="Add New Group"
      open={visible}
      onCancel={onClose}
      footer={null}
      style={{ top: 20 }}
    >
      <Form form={form} layout="vertical" onFinish={handleAddGroup}>
        <Form.Item label="Batch">
          <Input value={batch} readOnly />
        </Form.Item>
        <Form.Item
          name="projectName"
          label="Project Name"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input onChange={(e) => handleGroupName(e)} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea rows={3} onChange={(e) => handleGroupDescription(e)} />
        </Form.Item>
        <Form.Item
          name="startdate"
          label="Start Date"
          rules={[
            { required: true, message: "Please input the start date of project!" },
          ]}
        >
          <Input
            placeholder="Please enter it very carefully"
            type="date"
            onChange={(e) => handleStartDate(e)}
          />
        </Form.Item>
        <Form.Item
          name="technologies"
          label="Technologies"
          rules={[
            { required: true, message: "Please input the technologies!" },
          ]}
        >
          <Input
            placeholder="Comma-separated"
            onChange={(e) => handleTechnologies(e)}
          />
        </Form.Item>
        <Form.Item
          name="studentIds"
          label="Student IDs"
          rules={[{ required: true, validator: validateStudentIds }]}
        >
          <Input
            placeholder="Comma-separated, max 4 IDs"
            onChange={(e) => handleStudents(e)}
          />
        </Form.Item>
        <Form.Item
          name="groupLeader"
          label="Group Leader"
          rules={[
            { required: true, message: "Please input the Group Leader ID!" },
            { validator: validateGroupLeader },
          ]}
        >
          <Input
            placeholder="22ce001"
            onChange={(e) => handleGroupLeaderId(e)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-[#4859DA] text-white hover:border-[#4859DA] hover:text-[#4859DA]"
            htmlType="submit"
          >
            Add Group
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
