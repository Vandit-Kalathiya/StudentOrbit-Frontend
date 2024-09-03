// import { Avatar, Button, Card, Space, Popconfirm } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";

// const FacultyComments = ({ comments, handleDeleteComment }) => {
//   return (
//     <div className="mt-8 p-1">
//       <h1 className="text-lg md:text-xl mb-4 font-semibold">
//         Faculty Comments
//       </h1>

//       {comments.length === 0 ? (
//         <p className="text-base text-gray-500">
//           No comments yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {comments.map((comment, index) => (
//             <Card
//               key={index}
//               className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
//               hoverable
//             >
//               <div className="flex items-center mb-2">
//                 <Avatar className="mr-3">{comment.facultyName[0]}</Avatar>
//                 <div>
//                   <div className="font-semibold">{comment.facultyName}</div>
//                   <div className="text-sm text-gray-500">{comment.date}</div>
//                 </div>
//               </div>
//               <p>{comment.text}</p>
//               <Space className="absolute top-2 right-2">
//                 <Popconfirm
//                   title="Are you sure to delete this comment?"
//                   onConfirm={() => handleDeleteComment(index)}
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <Button
//                     type="link"
//                     icon={<DeleteOutlined />}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </Button>
//                 </Popconfirm>
//               </Space>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultyComments;


import { Avatar, Button, Card, Space, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const FacultyComments = ({ comments, handleDeleteComment }) => {
  return (
    <div className="mt-8 p-1">
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
                <Avatar className="mr-3" style={{ backgroundColor: "#f56a00" }}>{comment.facultyName[0]}</Avatar>
                <div>
                  <div className="font-semibold">{comment.facultyName}</div>
                  <div className="text-sm text-gray-500">{comment.date}</div>
                </div>
              </div>
              <p>{comment.text}</p>
              <Space className="absolute top-2 right-2">
                <Popconfirm
                  title="Are you sure to delete this comment?"
                  onConfirm={() => handleDeleteComment(index)}
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
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const dummyComments = [
  {
    facultyName: "Dr. Smith",
    date: "2024-08-28",
    text: "This is a very insightful project. Great work!",
  },
  {
    facultyName: "Prof. Johnson",
    date: "2024-08-29",
    text: "Please review the calculations in section 3.",
  },
];

// For demonstration purposes
const App = () => {
  const handleDeleteComment = (index) => {
    // Handle comment deletion
    console.log(`Delete comment at index ${index}`);
  };

  return (
    <FacultyComments
      comments={dummyComments}
      handleDeleteComment={handleDeleteComment}
    />
  );
};

export default App;
