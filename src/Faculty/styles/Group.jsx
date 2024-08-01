// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, Typography, Button, Flex } from "antd";
import { Plus } from 'lucide-react';
import Modal from "./Modal";
import { useState } from "react";

const data = [
  {
    title: "To Do App",
    member: 3,
  },
  {
    title: "To Do App",
    member: 2,
  },
  {
    title: "To Do App",
    member: 4,
  },
  {
    title: "To Do App",
    member: 2,
  },
  {
    title: "To Do App",
    member: 3,
  },
];

function Group() {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="m-8">
      <Typography.Title
        level={2}
        className="text-center"
        style={{ marginBottom: "2vw" }}
      >
        Batch-A1
      </Typography.Title>
      <Flex className="md:justify-end justify-center p-2 mt-5">
        <Button
          type="primary"
          shape="round"
          icon={<Plus />}
          className="bg-[#5B6DF3] hover:bg-[#4859da] p-5 text-center mb-5"
          onClick={() => setShowModal(true)}
        >
          Add Group
        </Button>
      </Flex>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-8 mt-4 md:ml-7">
        {data.map((item, index) => (
          <Card
            key={index}
            title={`Group ${index + 1}`}
            bordered={false}
            style={{ width: 300, cursor: "pointer" }}
            headStyle={{ fontSize: 'clamp(1rem, 1.5vw, 2rem)' }}
          >
            <p className="p-1 pt-0 md:text-lg inline font-semibold">Project Title : </p><p className="inline md:text-lg">{item.title}</p> <br />
            <p className="p-1 md:text-lg inline font-semibold">Members :</p> <p className="inline md:text-lg"> {item.member}</p>
          </Card>
        ))}
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Group;
