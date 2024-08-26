import { useState } from "react";
import { useParams } from "react-router-dom";
import GroupHeader from "./GroupHeader";
import GroupList from "./GroupList";

const initialData = [
  {
    title: "To Do App",
    description: "A simple to-do app to manage your tasks.",
    technologies: ["React", "Node", "Express", "MongoDB"],
    groupLeader: "22ce002",
    members: ["22ce001", "22ce002"],
    progress: 20,
    category: "Category",
  },
  {
    title: "Weather App",
    description: "An app to check the weather forecast.",
    technologies: ["React", "Node", "Weather API"],
    groupLeader: "22ce012",
    members: ["22ce003", "22ce004", "22ce005", "22ce012"], 
    progress: 10, 
    category: "Full Stack",
  },
  {
    title: "Expense Tracker",
    description: "Track your expenses and manage your budget.",
    technologies: ["React", "Node", "MongoDB"],
    groupLeader: "22ce021",
    members: ["22ce006", "22ce009", "22ce021"], 
    progress: 10, 
    category: "Stack",
  },
  {
    title: "Chat Application",
    description: "A real-time chat application.",
    technologies: ["React", "Node", "Socket.IO"],
    groupLeader: "22ce007",
    members: ["22ce008", "22ce010", "22ce007"], 
    progress: 10, 
    category: "Full Stack",
  },
  {
    title: "E-Commerce Site",
    description: "An online store to buy and sell products.",
    technologies: ["React", "Node", "Express", "MongoDB"],
    groupLeader: "22ce018",
    members: ["22ce011", "22ce022", "22ce018"], 
    progress: 10, 
    category: "Full Stack",
  }
];

const Group = () => {
  const [data, setData] = useState(initialData);
  const { batch } = useParams();

  const handleAddGroup = (newGroup) => {
    setData([...data, newGroup]);
  };

  return (
    <div className="my-4 mx-3 md:m-8">
      <GroupHeader batch={batch} onAddGroup={handleAddGroup} />
      <GroupList data={data} batch={batch} />
    </div>
  );
};

export default Group;
