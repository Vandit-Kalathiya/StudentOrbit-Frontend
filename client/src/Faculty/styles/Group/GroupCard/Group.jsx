import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupHeader from "./GroupHeader";
import GroupList from "./GroupList";
import axios from "axios";

const Group = () => {
  const [data, setData] = useState([]);
  const { batch } = useParams();
  
  
  useEffect(() => {
    
    axios
    .post(`http://localhost:1818/faculty/groups/${batch}`)
    .then((res) => {
        const demo = res.data;
        console.log(demo);
        setData(demo);
      })
      .catch((error) => {
        console.error("There was an error while getting all batches: ", error);
      });
  }, [batch]);

  const handleAddGroup = (newGroup) => {
    setData((prevData) => [...prevData, newGroup]); 
  };

  return (
    <div className="my-4 mx-3 md:m-8 md:pl-0 pl-3">
      <GroupHeader batch={batch} onGroupAdded={handleAddGroup}/>
      <GroupList data={data} batch={batch}/>
    </div>
  );
};

export default Group;