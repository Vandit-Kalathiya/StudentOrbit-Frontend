import { Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const ProjectCard = () => {
  const projects = [
    {
      title: "AI-Powered Chatbot",
      description:
        "An AI-powered chatbot designed to assist with customer service queries, featuring natural language processing and machine learning.",
      semester: "5",
      members: ["22CE001", "22CE002", "22CE003", "22CE004"],
      groupLeader: "22CE002",
      category: "AI / Machine Learning",
      technologies: ["Python", "TensorFlow", "Natural Language Processing", "Chatbot Framework"],
      progress: "100",
      year: "2024",
    },
    {
      title: "E-Commerce Website",
      description:
        "A full-fledged e-commerce website built using React and Node.js, featuring user authentication, product management, and a shopping cart.",
      semester: "6",
      members: ["22CE021", "22CE022", "22CE018", "22CE017"],
      groupLeader: "22CE021",
      category: "Web Development",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      progress: "90",
      year: "2023",
    },
    {
      title: "Mobile Fitness App",
      description:
        "A cross-platform mobile fitness application built with Flutter, offering personalized workout plans, progress tracking, and social sharing features.",
      semester: "4",
      members: ["22CE024", "22CE025", "22CE027", "22CE026"],
      groupLeader: "22CE024",
      category: "Mobile Development",
      technologies: ["Flutter", "Dart", "Firebase", "Health APIs"],
      progress: "95",
      year: "2024",
    },
    {
      title: "Smart Home Automation",
      description:
        "An IoT-based smart home automation system enabling remote control of home appliances via a mobile app and voice commands.",
      semester: "5",
      members: ["22CE030", "22CE029", "22CE028"],
      groupLeader: "22CE029",
      category: "IoT / Automation",
      technologies: ["IoT", "Arduino", "Android", "Voice Recognition"],
      progress: "93",
      year: "2023",
    },
  ];
  

  const navigate = useNavigate();

  const getInitials = (name) => {
    const id = name.split(" ").pop();
    return id.slice(-2);
  };
  
  const handleReadMore = (project) => {
    // Dynamically create the route by replacing spaces with hyphens and making it lowercase
    const projectName = project.title.toLowerCase().split(" ").join("-");
    
    // Navigate to the dynamic route
    navigate(`/s/dashboard/projects/${projectName}`, { state: project });
  };


  return (
    <>
    <h1 className='md:text-5xl text-3xl text-center my-5 mt-10 font-semibold'>My Projects</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 my-5">
      {projects.map((project, index) => (
        <div key={index} className="flex justify-center">
          <Card
            bordered={false}
            className="max-w-sm w-full shadow-lg rounded-lg cursor-pointer"
            bodyStyle={{ padding: "20px" }}
            headStyle={{ backgroundColor: '#f5f5f5', padding: 0 }}
            onClick={() => handleReadMore(project)}
          >
            <div className="flex justify-between items-center mb-4" >
              <h2 className="text-lg font-bold">{project.title}</h2>
              <span className="text-sm text-gray-500">{project.year}</span>
            </div>
            <p className="text-gray-700 mb-4">
            {`${project.description.substring(0, 100)}... `}
              <button
                className="text-blue-500 hover:underline focus:outline-none"
                onClick={() => handleReadMore(project)}
              >
                Read More
              </button>
            </p>
            <div className="mb-2">
              <span className="font-semibold">Semester:</span> {project.semester}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Group Members:</span>
              <div className="flex space-x-2 my-2">
                {project.members.map((member, memberIndex) => (
                  <Avatar
                    key={memberIndex}
                    style={{ backgroundColor: "#5B6DF3", color: "#fff" }}
                  >
                    {getInitials(member)}
                  </Avatar>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
    </>
  );
};

export default ProjectCard;
