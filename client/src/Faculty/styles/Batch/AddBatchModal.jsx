import { Modal, Form, Input, InputNumber, Button } from "antd";

const AddBatchModal = ({ visible, onCancel, onFinish, form }) => {
  return (
    <Modal title="Add New Batch" visible={visible} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ batch: "", sem: "", id1: "", id2: "" }}>
        <Form.Item name="batch" label="Batch Name" rules={[{ required: true, message: "Please input the batch name!" }]}>
          <Input placeholder="A1" />
        </Form.Item>
        <Form.Item
          name="sem"
          label="Semester"
          rules={[
            { required: true, message: "Please input the semester!" },
            { type: "number", message: "Semester must be a number!" },
          ]}
        >
          <InputNumber className="w-full" placeholder="3" />
        </Form.Item>
        <Form.Item name="id1" label="Start Id" rules={[{ required: true, message: "Please input the start student ID!" }]}>
          <Input placeholder="22CEXXX" />
        </Form.Item>
        <Form.Item name="id2" label="End Id" rules={[{ required: true, message: "Please input the end student ID!" }]}>
          <Input placeholder="22CEXXX" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Batch
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBatchModal;
