import { Skeleton } from "antd";
import { MdOutlineEdit } from "react-icons/md";

const ProfileSkeleton = () => {
  return (
    <div className="mt-10 px-8 md:mt-8 md:px-8">
      {/* Profile Section Skeleton */}
      <div className="relative font-poppins">
        <div className="bg-white p-5 md:p-0 md:mb-7 w-full md:h-[30vh] rounded-xl flex flex-col md:flex-row items-center justify-evenly">
          <Skeleton.Image active className="w-24 h-24 rounded-full" />
          <div className="flex flex-col items-center space-y-4">
            <Skeleton.Input active style={{ width: 150 }} />
            <Skeleton.Input active style={{ width: 100 }} />
            <Skeleton.Input active style={{ width: 200 }} />
          </div>
          <div className="divider"></div>
          <div className="flex flex-col space-y-4">
            <Skeleton.Input active style={{ width: 200 }} />
            <Skeleton.Input active style={{ width: 150 }} />
          </div>
          <div className="divider"></div>
          <div className="flex space-x-4">
            <Skeleton.Input active style={{ width: 100 }} />
            <Skeleton.Input active style={{ width: 100 }} />
            <Skeleton.Input active style={{ width: 100 }} />
          </div>
        </div>

        <button
          className="absolute top-4 right-4 bg-[#5B6DF3] text-white p-2 rounded-md flex items-center"
          disabled
        >
          <MdOutlineEdit size={16} />
        </button>
      </div>

      <div className="flex md:flex-row flex-col mt-5 md:mt-0 mb-5 w-full justify-between gap-7">
        <div className="left md:w-[66%]">
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
        <div className="right md:w-[33%]">
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton.Input active style={{ width: 150 }} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
