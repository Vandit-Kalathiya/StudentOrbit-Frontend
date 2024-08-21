import {
  AntDesignOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";

const TaskAssignees = () => {
  return (
    <>
      {/* <Divider /> */}
      <div className="flex items-center mb-4">
        {/* <p>Assign to</p> */}
        <Avatar.Group>
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          <a>
            <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          </a>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{ backgroundColor: "#1677ff" }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
      </div>
    </>
  );
};

export default TaskAssignees;
