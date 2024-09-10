import { Modal, Form, Select, Button } from "antd";
import { useState } from "react";

const { Option } = Select;

const AssigneesModal = ({ isModalVisible, handleOk, handleCancel, assignees, selectedAssignees, handleFormSubmit }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSelect = () => {
    setDropdownVisible(false);
  };

  const handleDropdownVisibleChange = (open) => {
    setDropdownVisible(open);
  };

  return (
    <Modal
      title="Select Assignees"
      visible={isModalVisible}
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
            {assignees.map(assignee => (
              <Option key={assignee.initials} value={assignee.initials}>
                {assignee.name}
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
