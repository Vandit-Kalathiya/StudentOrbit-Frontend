import Banner from "./Banner";

const GroupList = ({ data, batch }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:mt-4 md:grid-cols-2 lg:grid-cols-2">
      {data.map((item, index) => (
        <Banner
          key={index}
          title={item.title}
          description={item.description}
          technologies={item.technologies}
          batch={batch}
          projectName={item.title.toLowerCase().replace(/\s+/g, "-")} // Assuming projectName is derived from title
          groupLeader={item.groupLeader}
          members={item.members}
          category={item.category}
          progress={item.progress}
        />
      ))}
    </div>
  );
};

export default GroupList;
