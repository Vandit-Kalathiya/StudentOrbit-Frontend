import { Button, Form, Input, List, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useState } from "react";

const { TextArea } = Input;

const AddGroupModal = ({ visible, onClose, onAddGroup, batch }) => {

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [batchName, setBatchName] = useState("");
  const [groupLeaderId, setGroupLeaderId] = useState("");
  const [students, setStudents] = useState(new Set());
  const [technologies, setTechnologies] = useState(new Set());

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  }

  const handleGroupDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleBatchName = (e) => {
    setBatchName(e.target.value);
  }

  const handleGroupLeaderId = (e) => {
    setGroupLeaderId(e.target.value);
  }

  const handleStudents = (e) => {
    setStudents(e.target.value);
  }

  const handleTechnologies = (e) => {
    setTechnologies(e.target.value);
  }

  const [form] = useForm();

  const validateStudentIds = (rule, value) => {
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

  // const handleFinish = (values) => {
  //   const { projectName, description, technologies, studentIds, groupLeader } = values;

  //   const studentIdsArray = studentIds.split(",").map((id) => id.trim());

  //   const newGroup = {
  //     title: projectName,
  //     description,
  //     technologies: technologies.split(",").map((tech) => tech.trim()),
  //     groupLeader,
  //     members: studentIdsArray,
  //     progress: 0,
  //     category: "New Category", 
  //     batch, 
  //   };

  //   onAddGroup(newGroup);
  //   form.resetFields();
  //   onClose();
  // };



  const handleAddGroup = async (e) => {
    // e.preventDefault();
    const groupData = {
      batchName: batchName,
      groupName: groupName,
      description: description,
      groupLeaderId: groupLeaderId,
      students: students,
      technologies: technologies,
    }
    console.log(groupData)

    // axios.get('http://localhost:1818/faculty/batches/allBatches').then(x => console.log(x.data))

    axios.post('http://localhost:1818/faculty/groups/create', groupData, {
      // headers: {
      //   'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
      //   'Content-Type': 'application/json',
      //   // ''
      // },
      withCredentials: true
    })
      .then((response) => {
        console.log("Group added...")
        navigate("/f/dashboard/batches")
      })
      .catch((error) => {
        console.error('There was an error submitting the report:', error);
      });
  }



  return (
    <Modal
      title="Add New Group"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleAddGroup}>
        <Form.Item label="Batch">
          <Input value={batch} readOnly onBeforeInput={(e) => handleBatchName(e)} />
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
          <TextArea rows={4} onChange={(e) => handleGroupDescription(e)} />
        </Form.Item>
        <Form.Item
          name="technologies"
          label="Technologies"
          rules={[{ required: true, message: "Please input the technologies!" }]}
        >
          <Input placeholder="Comma-separated" onChange={(e) => handleTechnologies(e)} />
        </Form.Item>
        <Form.Item
          name="studentIds"
          label="Student IDs"
          rules={[{ validator: validateStudentIds }]}
        >
          <Input placeholder="Comma-separated, max 4 IDs"onChange={(e) => handleStudents(e)}  />
        </Form.Item>
        <Form.Item
          name="groupLeader"
          label="Group Leader"
          rules={[
            { required: true, message: "Please input the Group Leader ID!" },
            { validator: validateGroupLeader },
          ]}
        >
          <Input placeholder="22ce001" onChange={(e) => handleGroupLeaderId(e)} />
        </Form.Item>
        <Form.Item>
          <Button className="bg-[#4859DA] text-white hover:border-[#4859DA] hover:text-[#4859DA]" htmlType="submit">
            Add Group
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
