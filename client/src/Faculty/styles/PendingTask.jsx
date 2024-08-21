// eslint-disable-next-line no-unused-vars
import React from "react";
import { Flex, Typography, Button, List, Avatar } from "antd";

const data = [
  {
    Batch: "A1",
    Group: 3,
    Task: 1,
    Id: "22ce001",
  },
  {
    Batch: "C1",
    Group: 5,
    Task: 2,
    Id: "22ce061",
  },
  {
    Batch: "B1",
    Group: 1,
    Task: 3,
    Id: "22ce032",
  },
  {
    Batch: "A1",
    Group: 2,
    Task: 1,
  },
];

function PendingTask() {
  return (
    <div className="relative w-full">
      <Flex vertical gap="small" className="fixed">
        <Flex align="center" justify="space-between" gap="large">
          <Typography.Title level={3} strong>
            Pending Tasks
          </Typography.Title>
          <Button type="link">View All</Button>
        </Flex>
        <List
          pagination
          dataSource={data}
          renderItem={(user, index) => {
            return (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4FbpvZh5jwaDNTSer_Ac03nhI6PVoYV400A&s`}
                    />
                  }
                  title={<a href="#">Batch: {user.Batch}</a>}
                  description={user.Id}
                ></List.Item.Meta>
                <span>
                  Group: {user.Group} <br /> Task: {user.Task}
                </span>
              </List.Item>
            );
          }}
        />
      </Flex>
    </div>
  );
}

export default PendingTask;
