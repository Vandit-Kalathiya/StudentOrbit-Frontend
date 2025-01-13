import { Card, Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getRole } from "../../../../authToken";
import AddBatchModal from "./AddBatchModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const BatchCard = ({ batch, sem, id1, id2, id, setTemp }) => {
  const role = getRole();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = () => {
    axios.delete(`http://localhost:1818/faculty/batches/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setDeleteModalVisible(false);
        setTemp((p) => !p)
        message.success("Batch deleted successfully!");
      })
      .catch((err) => console.log('Batch not deleted', err))
  };

  // useEffect(() => {
  //   axios.get(`http://localhost:1818/faculty/batches/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err))
  // }, [batch])

  return (
    <>
      <NavLink to={`/f/dashboard/batches/${sem}${batch}`}>
        <Card
          title={`Batch ${batch?.toUpperCase()}`}
          bordered={false}
          className="mx-auto w-[100%]"
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
        <p>Are you sure you want to delete the batch <strong>{sem}{batch}</strong>?</p>
      </Modal>

      <Modal
        title="Edit Batch"
        open={isEditModalVisible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleEdit(values);
            })
            .catch((info) => {
              console.error("Validation Failed:", info);
            });
        }}
        onCancel={() => setEditModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Semester"
            name="semester"
            rules={[{ required: true, message: "Please enter the semester" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Batch Name"
            name="batchName"
            rules={[{ required: true, message: "Please enter the batch name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start ID"
            name="startId"
            rules={[{ required: true, message: "Please enter the start ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="End ID"
            name="endId"
            rules={[{ required: true, message: "Please enter the end ID" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* <AddBatchModal
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
      /> */}

    </>
  );
};

export default BatchCard;
