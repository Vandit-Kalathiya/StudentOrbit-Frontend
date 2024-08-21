import { Button, Typography } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddGroupModal from "./AddGroupModal";

const GroupHeader = ({ batch, onAddGroup }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="relative flex md:flex-row flex-col items-center justify-between p-2">
      <Typography.Title level={2} className="m-0 text-center text-xl md:text-3xl flex-grow">
        Batch-{batch}
      </Typography.Title>
      <div className="flex justify-end p-2">
        <Button
          type="primary"
          shape="round"
          icon={<Plus />}
          className="bg-[#5B6DF3] hover:bg-[#4859da] p-5 text-center mb-5"
          onClick={handleOpenModal}
        >
          Add Group
        </Button>
      </div>
      <AddGroupModal visible={showModal} onClose={handleCloseModal} onAddGroup={onAddGroup} />
    </div>
  );
};

export default GroupHeader;
