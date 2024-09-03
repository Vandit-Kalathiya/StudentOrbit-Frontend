import { Card } from "antd";
import { Link } from "react-router-dom";

const BatchCard = ({ batch, sem, id1, id2 }) => {
  return (
    <Link to={`/f/dashboard/batches/${sem}${batch}`}>
      <Card
        title={`Batch ${batch}`}
        bordered={false}
        className="mx-auto w-[100%]"
        headStyle={{ fontSize: "clamp(1.4rem, 1.5vw, 1.75rem)" }}
      >
        <p className="p-1 pt-0 text-sm sm:text-base md:text-lg inline font-semibold">
          Semester :
        </p>
        <p className="inline text-sm sm:text-base md:text-lg">{sem}</p>{" "}
        <br />
        <p className="p-1 text-sm sm:text-base md:text-lg inline font-semibold">
          Id :
        </p>
        <p className="inline text-sm sm:text-base md:text-lg">
          {id1} - {id2}
        </p>
      </Card>
    </Link>
  );
};

export default BatchCard;
