import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import PropTypes from "prop-types";

const { TextArea } = Input;

const EditGroupModal = ({
  visible,
  onClose,
  batch,
  initialGroupData,
  onGroupUpdated,
}) => {
  const [form] = Form.useForm();

  const handleEditGroup = async (values) => {
    const { groupName, groupDescription, groupLeader } = values;

    const updatedGroupData = {
      batchName: batch,
      groupName,
      groupDescription,
      groupLeader,
      startDate: initialGroupData.startDate,
    };

    try {
      const res = await axios.put(
        `http://localhost:1818/faculty/groups/update/${initialGroupData.id}`,
        updatedGroupData,
        {
          withCredentials: true,
        }
      );
      onGroupUpdated(res.data);
      Modal.success({
        title: "Group Updated",
        content: "The group details have been updated successfully.",
      });
      form.resetFields();
      onClose();
    } catch (error) {
      Modal.error({
        title: "Group Update Failed",
        content:
          error.response?.data?.message || "An error occurred while updating.",
      });
      console.error("Error updating group:", error);
    }
  };

  const validateGroupLeader = (_, value) => {
    if (!value) {
      return Promise.reject("Please input the group leader ID!");
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Edit Group"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleEditGroup}
        initialValues={{
          batch,
          groupName: initialGroupData.groupName,
          groupDescription: initialGroupData.groupDescription,
          groupLeader: initialGroupData.groupLeader,
        }}
      >
        <Form.Item label="Batch">
          <Input value={batch} readOnly />
        </Form.Item>
        <Form.Item
          name="groupName"
          label="Project Name"
          rules={[{ required: true, message: "Please input the project name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="groupDescription"
          label="Group Description"
          rules={[{ required: true, message: "Please input the group description!" }]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="groupLeader"
          label="Group Leader ID"
          rules={[
            { required: true, message: "Please input the group leader ID!" },
            { validator: validateGroupLeader },
          ]}
        >
          <Input placeholder="Enter the Group Leader ID" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditGroupModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  batch: PropTypes.string.isRequired,
  initialGroupData: PropTypes.object.isRequired,
  onGroupUpdated: PropTypes.func.isRequired,
};

export default EditGroupModal;
