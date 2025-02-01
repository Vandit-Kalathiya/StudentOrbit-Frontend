import { Avatar, Button, Card, Space, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getRole } from "../../../../../authToken";

const FacultyComments = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const role = getRole();

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:1818/tasks/comments/${taskId}`,
        { withCredentials: true }
      );
      setComments(response.data);
    } catch (error) {
      console.error("There was an error while fetching comments: ", error);
      toast.error("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:1818/comment/${commentId}/${taskId}`,
        { withCredentials: true }
      );

      // Update local state to remove the deleted comment
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId)
      );

      toast.success(response.data);
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="mt-2">
      {/* <h1 className="text-lg md:text-xl mb-4 font-semibold">
        Faculty Comments
      </h1> */}
      {isLoading ? (
        <p className="text-base text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-base text-gray-500">
          No comments yet.
        </p>
      ) : (
        <div className="w-full space-y-4">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="rounded-lg shadow-sm hover:shadow-lg w-full border border-[#5B6DF2] hover:border hover:border-[#5B6DF2]"
              hoverable
            >
              <div className="flex items-center mb-2">
                <Avatar
                  className="mr-3"
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                    color: "white",
                  }}
                >
                  {comment.faculty.username}
                </Avatar>

                <div>
                  <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-800">{comment.faculty.name}</div>
                  <div className="text-sm text-gray-500">{comment.date}</div>
                </div>
              </div>
              <p>{comment.commentDescription}</p>
              {role === 'faculty' && (<Space className="absolute top-1 right-1">
                <Popconfirm
                  title="Are you sure to delete this comment?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDeleteComment(comment.id)}
                >
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    className="text-red-500 hover:text-red-700"
                  >
                  </Button>
                </Popconfirm>
              </Space>)}
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