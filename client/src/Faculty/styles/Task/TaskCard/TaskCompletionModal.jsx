import { Modal } from "antd";

const TaskCompletionModal = ({ isModalVisible, handleOk, handleCancel }) => {
  return (
    <Modal
      title="Are you sure?"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Yes, Approve"
      cancelText="Cancel"
    >
      <p>Are you sure to mark this task as completed?</p>
    </Modal>
  );
};

export default TaskCompletionModal;
