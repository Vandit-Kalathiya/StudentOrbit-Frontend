import { Avatar } from "antd"; // You can use Ant Design's Avatar component or any other library
import "antd/dist/reset.css"; // Import Ant Design styles

const mentors = [
  {
    name: "Ronak R. Patel",
    semester: "3",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Ronak N. Patel",
    semester: "4",
    imageUrl: "https://via.placeholder.com/150",
  },
];

function Mentors() {
  return (
    <div className="mentors p-5 bg-white rounded-lg mt-5">
      <h2 className="text-xl font-bold mb-4">Mentors</h2>
      <div className="gap-4">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="mentor-card flex flex-row items-center justify-between px-3 py-2 rounded-lg border-[1px] border-[#8694ff] mb-2"
          >
            <div className="flex items-center justify-center gap-2">
              <Avatar src={mentor.imageUrl} size={50} />
              <h2 className="md:text-lg font-semibold">{mentor.name}</h2>
            </div>
            <p className="text-gray-600 md:text-sm text-xs">
              <span className="hidden md:inline">Semester: {mentor.semester}</span>
              <span className="inline md:hidden">Sem: {mentor.semester.split(' ')[0]}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mentors;
