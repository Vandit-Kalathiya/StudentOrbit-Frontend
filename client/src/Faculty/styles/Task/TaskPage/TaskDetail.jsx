import { Avatar, Button, Typography, Card, Space, Popconfirm, Modal, Form, Select, Input } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Option } = Select;

function TaskDetail() {
  const task = {
    id: "task1",
    title: "Complete the React Project",
    description: "Ensure all components are working and integrated properly.",
    assigneeInitials: "JS",
    status: "To-Do",
  };

  const [comments, setComments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [assignees, setAssignees] = useState([
    { initials: "JS", name: "John Smith" },
    { initials: "JD", name: "Jane Doe" },
    { initials: "MK", name: "Mike K" },
    { initials: "SS", name: "Sarah S" }
  ]);
  const [selectedAssignees, setSelectedAssignees] = useState([task.assigneeInitials]);

  useEffect(() => {
    const storedComments =
      JSON.parse(localStorage.getItem(`comments_${task.id}`)) || [];
    setComments(storedComments);
  }, [task.id]);

  useEffect(() => {
    localStorage.setItem(`comments_${task.id}`, JSON.stringify(comments));
  }, [comments, task.id]);

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    setSelectedAssignees(values.assignees);
    setIsModalVisible(false);
  };

  return (
    <div className="md:m-5 md:px-4 my-6 mx-4 w-full overflow-x-hidden">
      <Title level={1} className="text-center md:mt-5 my-8 text-lg md:text-2xl">
        {task.id.replace(
          /([a-zA-Z]+)(\d+)/,
          (match, p1, p2) =>
            p1.charAt(0).toUpperCase() + p1.slice(1) + " " + p2
        )}
      </Title>
      <Paragraph className="text-2xl md:text-4xl my-6 font-semibold">
        {task.title}
      </Paragraph>
      <Paragraph className="text-base md:text-xl mb-4 md:w-[85%] w-full">
        {task.description}
      </Paragraph>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h3 className="text-base md:text-lg font-semibold">
          Status :{" "}
          <span className="text-base md:text-lg font-normal">
            {task.status}
          </span>
        </h3>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h3 className="text-base md:text-lg font-semibold">Assignees :</h3>
        <div className="flex items-center gap-2">
          {selectedAssignees.map(initials => {
            const assignee = assignees.find(a => a.initials === initials);
            return assignee ? (
              <Avatar key={initials} className="bg-blue-500">{assignee.initials}</Avatar>
            ) : null;
          })}
          <Button
            icon={<PlusOutlined />}
            className="ml-2 rounded-full"
            onClick={showModal}
          >
          </Button>
        </div>
      </div>

      <div className="mt-8 p-1">
        <Title level={3} className="text-lg md:text-xl mb-4 font-semibold">
          Faculty Comments
        </Title>

        {comments.length === 0 ? (
          <Paragraph className="text-base text-gray-500">
            No comments yet.
          </Paragraph>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {comments.map((comment, index) => (
              <Card
                key={index}
                className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                hoverable
              >
                <div className="flex items-center mb-2">
                  <Avatar className="mr-3">{comment.facultyName[0]}</Avatar>
                  <div>
                    <div className="font-semibold">{comment.facultyName}</div>
                    <div className="text-sm text-gray-500">{comment.date}</div>
                  </div>
                </div>
                <p>{comment.text}</p>
                <Space className="absolute top-2 right-2">
                  <Popconfirm
                    title="Are you sure to delete this comment?"
                    onConfirm={() => handleDeleteComment(index)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        title="Select Assignees"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="assignees"
            label="Select Assignees"
            rules={[{ required: true, message: 'Please select at least one assignee!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select assignees"
              defaultValue={selectedAssignees}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskDetail;
