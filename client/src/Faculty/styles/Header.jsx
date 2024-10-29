import { Avatar, Typography, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Header() {
  return (
    <Flex align="center" justify="space-between" className="w-full h-full">
      <Typography.Title level={3} type="secondary" className="m-0">
        Welcome back!
      </Typography.Title>

      <div className="flex items-center">
        <Avatar icon={<UserOutlined />} />
      </div>
    </Flex>
  );
}

export default Header;
