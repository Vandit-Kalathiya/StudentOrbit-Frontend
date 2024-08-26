import { useLocation, useParams } from "react-router-dom";
import GroupLeft from "./GroupLeft";
import GroupRight from "./GroupRight/GroupRight";

function GroupDetails({ collapsed }) {
  const { batch } = useParams();
  const location = useLocation();

  const {
    title,
    description,
    groupLeader,
    members,
    category,
    technologies,
    progress,
  } = location.state || {};

  console.log("GroupDetails Data:", {
    title,
    description,
    groupLeader,
    members,
    category,
    technologies,
    progress,
  });

  return (
    <div className="flex flex-col bg-[#f5f5f5] md:m-9 m-3">
      <div className="sticky mx-auto w-full md:top-0 top-3 z-20 bg-[#f5f5f5]">
        <h1 className="md:text-5xl text-3xl text-center md:pb-6 md:pt-0 py-3 mt-3 md:mt-4 font-semibold z-20 bg-[#f5f5f5]">
          {batch}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div
          className="w-full md:w-1/2 md:fixed md:top-[12rem] top-[1rem] left-[3rem] z-10"
          style={{
            left: collapsed ? "3rem" : "11rem",
            transition: "left 0.2s linear",
          }}
        >
          <GroupLeft
            title={title}
            description={description}
            groupLeader={groupLeader}
            members={members}
            category={category}
            technologies={technologies}
            progress={progress}
          />
        </div>

        <div className="w-full md:w-1/2 md:mt-4 my-10 md:ml-[50%]">
          <GroupRight members={members} />
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;
