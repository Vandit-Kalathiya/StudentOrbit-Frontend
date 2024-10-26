import { Avatar, Button, Card, Space, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const FacultyComments = ({taskId}) => {
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:1818/tasks/comments/${taskId}`)
      .then((res) => {
        setComments(res.data)
      })
      .catch((error) => {
        console.error("There was an error while fetching comments : ", error);
      });
  },[])  

  return (
    <div className="mt-8">
      <h1 className="text-lg md:text-xl mb-4 font-semibold">
        Faculty Comments
      </h1>
      {comments.length === 0 ? (
        <p className="text-base text-gray-500">
          No comments yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {comments.map((comment, index) => (
            <Card
              key={index}
              className="border rounded-lg shadow-sm hover:shadow-lg"
              hoverable
            >
              <div className="flex items-center mb-2">
                <Avatar className="mr-3" style={{ backgroundColor: "#f56a00" }}>{comment.faculty.username}</Avatar>
                {/* // aaya change karvano chhe uper */}
                <div>
                  <div className="font-semibold">{comment.faculty.username}</div>
                  <div className="text-sm text-gray-500">{comment.date}</div>
                </div>
              </div>
              <p>{comment.commentDescription}</p>
              <Space className="absolute top-2 right-2">
                <Popconfirm
                  title="Are you sure to delete this comment?"
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {comment.time.substring(0, 5)}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyComments;
