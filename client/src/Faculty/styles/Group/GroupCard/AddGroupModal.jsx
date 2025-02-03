import { Button, DatePicker, Form, Input, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../../../../Utils/Notification";
import moment from "moment/moment";
import { BASE_URL } from "../../../../../authToken";

const { TextArea } = Input;

const AddGroupModal = ({ visible, onClose, batch, onGroupAdded }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleAddGroup = async (values) => {
    const {
      groupName,
      description,
      groupLeaderId,
      studentIds,
      technologies,
      startDate,
    } = values;

    const groupData = {
      batchName: batch,
      groupName,
      description,
      groupLeaderId,
      students: studentIds.split(",").map((id) => id.trim()),
      technologies: technologies.split(",").map((tech) => tech.trim()),
      startDate: startDate.format("YYYY-MM-DD"),
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/faculty/groups/create`,
        groupData,
        {
          withCredentials: true,
        }
      );
      onGroupAdded(res.data);
      openNotification(
        "success",
        "Group Added",
        "The new group has been added successfully."
      );
      form.resetFields();
      onClose();
      navigate(`/f/dashboard/batches/${batch}`);
    } catch (error) {
      openNotification(
        "error",
        "Group Creation Failed",
        error.response?.data?.message || "An error occurred."
      );
      console.error("Error creating group:", error);
    }
  };

  const validateStudentIds = async (_, value) => {
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
    const { studentIds } = form.getFieldsValue();  // Get student IDs from form
    const studentIdsArray = studentIds ? studentIds.split(",").map((id) => id.trim()) : [];

    if (value && studentIdsArray.length > 0 && !studentIdsArray.includes(value.trim())) {
      return Promise.reject("Group Leader ID must be same as one of the Student IDs.");
    }
    return Promise.resolve();
  };


  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <Modal
      title="Add New Group"
      open={visible}
      onCancel={onClose}
      footer={null}
      style={{ top: 10 }}
      bodyProps={{ overflow: "hidden" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddGroup}
        initialValues={{ batch }}
      >
        <Form.Item label="Batch">
          <Input value={batch} readOnly />
        </Form.Item>
        <Form.Item
          name="groupName"
          label="Project Name"
          rules={[
            { required: true, message: "Please input the project name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[
            {
              required: true,
              message: "Please input the start date of the project!",
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            disabledDate={disabledDate} 
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="technologies"
          label="Technologies"
          rules={[
            { required: true, message: "Please input the technologies!" },
          ]}
        >
          <Input placeholder="Comma-separated" />
        </Form.Item>
        <Form.Item
          name="studentIds"
          label="Student IDs"
          rules={[{ required: true, validator: validateStudentIds }]}
        >
          <Input placeholder="Comma-separated, max 4 IDs" />
        </Form.Item>
        <Form.Item
          name="groupLeaderId"
          label="Group Leader ID"
          rules={[
            { required: true, message: "Please input the Group Leader ID!" },
            { validator: validateGroupLeader },
          ]}
        >
          <Input placeholder="22ce001" />
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
