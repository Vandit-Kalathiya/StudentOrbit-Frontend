import { Modal, Form, Select, Button } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const AssigneesModal = ({ isModalVisible, handleOk, handleCancel, members, selectedAssignees, handleFormSubmit }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ assignees: selectedAssignees });
  }, [selectedAssignees, form]);

  const handleSelect = () => {
    setDropdownVisible(false);
  };

  const handleDropdownVisibleChange = (open) => {
    setDropdownVisible(open);
  };

  return (
    <Modal
      title="Select Assignees"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{ assignees: selectedAssignees }}
      >
        <Form.Item
          name="assignees"
          label="Select Assignees"
          rules={[{ required: true, message: 'Please select at least one assignee!' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select assignees"
            onSelect={handleSelect} 
            onDropdownVisibleChange={handleDropdownVisibleChange}
            open={dropdownVisible}
            value={form.getFieldValue('assignees')}
          >
            {members.map(member => (
              <Option key={member.id} value={member.id}>
                {member.username}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Assign
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssigneesModal;
