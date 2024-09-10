import { useLocation, useParams } from "react-router-dom";
import GroupLeft from "./GroupLeft";
import GroupRight from "./GroupRight/GroupRight";

function GroupDetailsNew({ collapsed }) {
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

  // console.log("GroupDetails Data:", {
  //   title,
  //   description,
  //   groupLeader,
  //   members,
  //   category,
  //   technologies,
  //   progress,
  // });

  if (!location.state) {
    return <div className="p-24">No data available</div>;
  }

  return (
    <div className="flex flex-col m-[none] h-auto w-[100%] md:h-[100%] md:overflow-hidden bg-[#F5F5F5]">
      <div className="w-full mt-10">
        <h1 className="text-5xl font-semibold text-center">
          {batch || "22ce047"}
        </h1>
      </div>

      <div className="md:flex-1 md:overflow-hidden flex flex-col md:flex-row h-auto md:max-h-[100%] md:py-4 px-5">
        <div
          className="md:flex-1"
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

        <div className="md:flex-1 md:overflow-auto md:max-h-[100%] py-4 no-scrollbar">
          <div className="block">
            <GroupRight members={members} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailsNew;
