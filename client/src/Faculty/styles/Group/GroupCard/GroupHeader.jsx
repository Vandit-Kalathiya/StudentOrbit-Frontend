import { Button, Typography } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddGroupModal from "./AddGroupModal";

const GroupHeader = ({ batch, onAddGroup }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="relative flex md:flex-row items-center justify-center p-2">
      <Typography className="md:m-0 mt-5 text-center text-3xl md:text-5xl flex-grow font-semibold">
        Batch-{batch}
      </Typography>
      <div className="p-2">
        <Button
          shape="round"
          icon={<Plus />}
          className="bg-[#5B6DF3] text-white hover:bg-[#4859da] py-5 text-center my-5"
          onClick={handleOpenModal}
          block // Makes the button full-width on small screens
        >
          <span className="hidden md:inline">Add Group</span>
        </Button>
      </div>
      <AddGroupModal batch={batch} visible={showModal} onClose={handleCloseModal} onAddGroup={onAddGroup} />
    </div>
  );
};

export default GroupHeader;
