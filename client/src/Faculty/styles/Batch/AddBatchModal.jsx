import { Modal, Form, Input, Select, Button } from "antd";

const AddBatchModal = ({ visible, onCancel, onFinish, form }) => {
  return (
    <Modal
      title="Add New Batch"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ batch: "", sem: "", id1: "", id2: "" }}
      >
        <Form.Item
          name="batch"
          label="Batch Name"
          rules={[{ required: true, message: "Please input the batch name!" },
            {
              pattern: /^[a-dA-D][1-2]$/,
              message: "Batch name is not valid",
            }
          ]}
        >
          <Input placeholder="Eg. A1" />
        </Form.Item>
        <Form.Item
          name="sem"
          label="Semester"
          rules={[{ required: true, message: "Please select the semester!" }]}
        >
          <Select placeholder="Select Semester" allowClear>
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
              pattern:
                /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/,
              message: "Student ID must be in the format YYCEXXX",
            },
          ]}
        >
          <Input placeholder="22CEXXX" />
        </Form.Item>
        <Form.Item
          name="id2"
          label="End Id"
          rules={[
            { required: true, message: "Please input the end student ID!" },
            {
              pattern:
                /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/,
              message: "Student ID must be in the format YYCEXXX",
            },
          ]}
        >
          <Input placeholder="22CEXXX" />
        </Form.Item>
        <Form.Item>
          <Button className="bg-[#4859DA] text-white" htmlType="submit">
            Add Batch
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBatchModal;
