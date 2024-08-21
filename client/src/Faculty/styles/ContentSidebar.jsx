// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, Typography, Image } from "antd";

function ContentSidebar() {
  return (
    <div className="text-center">
      <Card style={{position: "relative"}}>
        <Image
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4FbpvZh5jwaDNTSer_Ac03nhI6PVoYV400A&s"
          alt="Background"
          style={{
            height: 150,
            width: "100%",
          }}
        />
        <Typography.Title level={2} strong className="mt-2">
            Ram Bhai
        </Typography.Title>
        <Typography.Text>
            Email : ram12@gmail.com <br />
        </Typography.Text>
        <Typography.Text>
            Total Batches : 3 <br />
        </Typography.Text>
        <Typography.Text>
            Total Groups : 8
        </Typography.Text>
      </Card>
    </div>
  );
}

export default ContentSidebar;
