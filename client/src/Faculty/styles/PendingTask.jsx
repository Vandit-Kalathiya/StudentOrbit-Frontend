import { Flex, Typography, Button, List, Avatar } from "antd";

const batches = ["A1", "B1", "C1"];
const totalItems = 23; // Total number of items

// Generate IDs and assign to batches
const data = Array.from({ length: totalItems }, (_, index) => {
  const batchIndex = Math.floor(index / 8); // Distribute items to batches
  const batch = batches[batchIndex % batches.length]; // Cycle through batches
  const idNumber = index + 1; // ID number starting from 1
  return {
    Batch: batch,
    Group: (index % 5) + 1, // Example: group numbers from 1 to 5
    Task: (index % 4) + 1, // Example: task numbers from 1 to 4
    Id: `22ce${String(idNumber).padStart(3, '0')}` // Generate ID
  };
});

function PendingTask() {
  return (
    <div className="relative w-full">
      <Flex vertical gap="small">
        <Flex align="center" justify="space-between" gap="large">
          <Typography.Title level={3} strong>
            Pending Tasks
          </Typography.Title>
          {/* <Button type="link">View All</Button> */}
        </Flex>
        <List
          pagination={{
            pageSize: 7, 
            showSizeChanger: false, 
            showTotal: (total) => `Total ${total} items`,
          }}
          dataSource={data}
          renderItem={(user, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2d7bF1q2WBQnHUhqaR2OuxjFiv_EIWBwqow&s"
                  />
                }
                title={<a href="#">Batch: {user.Batch}</a>}
                description={user.Id}
              />
              <div>
                <span>
                  Project: Task Management System <br /> Task: Basic set up
                </span>
              </div>
            </List.Item>
          )}
        />
      </Flex>
    </div>
  );
}

export default PendingTask;
