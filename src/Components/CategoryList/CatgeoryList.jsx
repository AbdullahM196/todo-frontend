import { useSelector } from "react-redux";
import { selectCategoryIds } from "../../Store/apiSlices/categorySlice";
import CategoryCard from "./categoryCard";
import PropTypes from "prop-types";
export default function CategoryList({
  mode,
  style,
  active,
  setActive,
  isOpen,
}) {
  const categoryIds = useSelector(selectCategoryIds);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        cursor: "pointer",
        width: "100%",
      }}
    >
      {categoryIds.map((id) => {
        return (
          <CategoryCard
            key={id}
            id={id}
            mode={mode}
            style={style}
            active={active}
            setActive={setActive}
            isOpen={isOpen}
          />
        );
      })}
    </div>
  );
}
CategoryList.propTypes = {
  mode: PropTypes.string,
  style: PropTypes.string,
  active: PropTypes.string,
  setActive: PropTypes.func,
  isOpen: PropTypes.bool,
};
