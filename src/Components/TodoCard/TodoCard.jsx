import PropTypes from "prop-types";
export default function TodoCard({ img, title, description }) {
  return (
    <div className="TodosCard">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
TodoCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};
