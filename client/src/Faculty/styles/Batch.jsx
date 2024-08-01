// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, Typography, Button, Flex } from "antd";
import { Plus } from 'lucide-react';
import Modal from "./Modal";
import { useState } from "react";
import { Link } from "react-router-dom";

const data = [
  {
    batch: "A1",
    sem: "5",
    id: "22ce001 - 22ce022",
  },
  {
    batch: "B1",
    sem: "3",
    id: "22ce023 - 22ce045",
  },
  {
    batch: "C1",
    sem: "5",
    id: "22ce046 - 22ce068",
  },
  {
    batch: "A1",
    sem: "3",
    id: "22ce001 - 22ce022",
  },
  {
    batch: "B1",
    sem: "5",
    id: "22ce023 - 22ce045",
  },
  {
    batch: "C2",
    sem: "5",
    id: "22ce141 - 22ce164",
  },
  
];

function Batch() {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="m-8">
      <Typography.Title
        level={2}
        className="text-center"
        style={{ marginBottom: "2vw" }}
      >
        Batches
      </Typography.Title>
      <Flex className="md:justify-end justify-center p-2 mt-5">
        <Button
          type="primary"
          shape="round"
          icon={<Plus />}
          className="bg-[#5B6DF3] hover:bg-[#4859da] p-5 text-center mb-5"
          onClick={() => setShowModal(true)}
        >
          Add Batch
        </Button>
      </Flex>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-8 mt-4 md:ml-7">
        {data.map((item, index) => (
          <Link to={`/dashboard/batches/groups`} key={index}>
          <Card
            key={index}
            title={`Batch ${item.batch}`}
            bordered={false}
            style={{ width: 300, cursor: "pointer" }}
            headStyle={{ fontSize: 'clamp(1rem, 1.5vw, 2rem)' }}
          >
            <p className="p-1 pt-0 md:text-lg inline font-semibold">Semester : </p><p className="inline md:text-lg">{item.sem}</p> <br />
            <p className="p-1 md:text-lg inline font-semibold">Id :</p> <p className="inline md:text-lg"> {item.id}</p>
          </Card>
          </Link>
        ))}
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Batch;
