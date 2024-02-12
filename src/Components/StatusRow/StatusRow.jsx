import StatusCard from "../../Components/StatusCard/StatusCard";
import "./statusRow.css";
import PropTypes from "prop-types";

export default function StatusRow({ data }) {
  return (
    <div className="statusRow">
      <StatusCard
        title={"Todo"}
        body={data?.filter((item) => item.status === "toDo")}
      />
      <StatusCard
        title={"inProgress"}
        body={data?.filter((item) => item.status === "inProgress")}
      />
      <StatusCard
        title={"done"}
        body={data?.filter((item) => item.status === "done")}
      />
    </div>
  );
}
StatusRow.propTypes = {
  data: PropTypes.array,
};
