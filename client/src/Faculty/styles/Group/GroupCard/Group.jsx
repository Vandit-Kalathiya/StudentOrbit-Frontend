import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupHeader from "./GroupHeader";
import GroupList from "./GroupList";
import axios from "axios";
import SkeletonCardGrid from "../../../../skeleton/SkeletonCardGrid";

const Group = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { batch } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:1818/faculty/groups/b/${batch}`, {
        withCredentials: true,
      })
      .then((res) => {
        const demo = res.data;
        setData(demo);
      })
      .catch((error) => {
        console.error("There was an error while getting all batches: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [batch]);

  const handleAddGroup = (newGroup) => {
    setData((prevData) => [...prevData, newGroup]);
  };

  return (
    <div className="my-4 mx-3 md:m-8 md:pl-0 pl-3">
      <GroupHeader batch={batch} onGroupAdded={handleAddGroup} />

      {loading ? (
        <SkeletonCardGrid />
      ) : data.length === 0 ? (
        <div className="col-span-full text-center p-10 text-gray-500 text-xl font-medium">
          <p className="bg-gray-100 rounded-lg p-5 shadow-sm ">
            You don't have any groups yet..! Start by creating one to see it
            here.🚀
          </p>
        </div>
      ) : (
        <GroupList data={data} batch={batch} />
      )}
    </div>
  );
};

export default Group;
