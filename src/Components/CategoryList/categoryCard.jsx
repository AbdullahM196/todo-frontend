import { useDispatch, useSelector } from "react-redux";
import { selectCategoryById } from "../../Store/apiSlices/categorySlice";
import PropTypes from "prop-types";
import "./category.css";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import {
  updateCategory,
  deleteCategory,
} from "../../Store/apiSlices/categorySlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BiCategoryAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({
  id,
  mode,
  style,
  active,
  setActive,
  isOpen,
}) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const category = useSelector((state) => selectCategoryById(state, id));
  const [editCat, SetEditCat] = useState(false);
  const [updatedCategory, setUpdateCategory] = useState(category.title);
  async function handleUpdateCategory() {
    console.log(updatedCategory);
    if (updateCategory !== "") {
      await dispatch(
        updateCategory({ id: id, title: updatedCategory })
      ).unwrap();
      SetEditCat(false);
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter category name",
      });
    }
  }
  async function handleDeleteCategory() {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteCategory(id)).unwrap();
          MySwal.fire("Deleted!", "Your Category has been deleted.", "success");
        }
      });
    } catch (err) {
      await MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      console.log(err);
    }
    SetEditCat(false);
  }
  return (
    <span
      onClick={() => navigate(`/category/${id}`)}
      className={mode == "edit" ? "editCategoryItems" : ""}
    >
      {mode == "edit" && (
        <BsFillTrashFill
          style={{ color: "#c33265" }}
          onClick={handleDeleteCategory}
        />
      )}
      {editCat ? (
        <span>
          <input
            type="text"
            name="addCategory"
            placeholder="add new category"
            value={updatedCategory}
            onChange={(evt) => setUpdateCategory(evt.target.value)}
          />
          <FaCheck
            style={{ color: "#7ba799" }}
            onClick={handleUpdateCategory}
          />
        </span>
      ) : (
        <>
          <span
            className={`${style} ${
              active == `/category/${id}` ? "active" : ""
            }`}
            onClick={() => setActive(`/category/${id}`)}
          >
            {mode == "display" && <BiCategoryAlt />}
            <span>
              {isOpen ? category.title : category.title.substring(0, 5)}
            </span>
          </span>
          {mode == "edit" && (
            <MdEdit
              style={{ color: "#7ba799" }}
              onClick={() => {
                SetEditCat(true);
              }}
            />
          )}
        </>
      )}
    </span>
  );
}

CategoryCard.propTypes = {
  id: PropTypes.string,
  mode: PropTypes.string,
  style: PropTypes.string,
  active: PropTypes.string,
  setActive: PropTypes.func,
  isOpen: PropTypes.bool,
};
