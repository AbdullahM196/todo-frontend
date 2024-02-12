import PropTypes from "prop-types";
import "./status.css";
import Cards from "./Cards";

export default function StatusCard({ title, body }) {
  return (
    <div className="statusCard">
      <h3 className="title">{title}</h3>

      <div className="statusContent">
        {body?.map((item) => {
          return <Cards key={item._id} data={item} />;
        })}
      </div>
    </div>
  );
}
StatusCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.array,
};
