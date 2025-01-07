import { Card, Button, Modal, Form, message } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getRole } from "../../../../authToken";
import AddBatchModal from "./AddBatchModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const BatchCard = ({ batch, sem, id1, id2, onEdit, onDelete }) => {
  const role = getRole();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = () => {
    // onDelete(batch);
    setDeleteModalVisible(false);
    message.success("Batch deleted successfully!");
  };

  return (
    <>
      <NavLink to={`/f/dashboard/batches/${sem}${batch}`}>
        <Card
          title={`Batch ${batch?.toUpperCase()}`}
          bordered={false}
          className="mx-auto w-[100%] hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 shadow-sm hover:shadow-lg transition-all duration-100 hover:border-l-4 hover:border-blue-400 to-purple-400"
          headStyle={{ fontSize: "clamp(1.4rem, 1.5vw, 1.75rem)" }}
          extra={
            role === "faculty" && (
              <div className="flex space-x-2">
                <Button
                  type="text"
                  size="medium"
                  icon={<EditOutlined style={{ color: "blue" }} />}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditModalVisible(true);
                    form.setFieldsValue({
                      semester: sem,
                      batchName: batch,
                      startId: id1,
                      endId: id2,
                    });
                  }}
                />
                <Button
                  type="text"
                  size="medium"
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteModalVisible(true);
                  }}
                />
              </div>
            )
          }
        >
          <p className="p-1 pt-0 text-sm sm:text-base md:text-lg inline font-semibold">
            Semester :
          </p>
          <p className="inline text-sm sm:text-base md:text-lg">{sem}</p>{" "}
          <br />
          <p className="p-1 text-sm sm:text-base md:text-lg inline font-semibold">
            Id :
          </p>
          <p className="inline text-sm sm:text-base md:text-lg">
            {id1?.toUpperCase()} - {id2?.toUpperCase()}
          </p>
        </Card>
      </NavLink>

      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete the batch <strong>{sem}{batch}</strong>?
        </p>
      </Modal>
      
      <AddBatchModal
        visible={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        form={form}
        mode="edit"
        batchDetails={{
          id: batch.id,
          batchName: batch,
          semester: sem,
          startId: id1,
          endId: id2,
        }}
        onBatchEdited={(updatedBatch) => {
          onEdit(updatedBatch); 
          setEditModalVisible(false);
        }}
      />
    </>
  );
};

export default BatchCard;
