import CategoryList from "../CategoryList/CatgeoryList";
import "./addCat.css";
import { FaCheck } from "react-icons/fa6";
import { createCategory } from "../../Store/apiSlices/categorySlice";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
export default function AddCategory() {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [newCategory, setNewCategory] = useState("");
  async function handleAddToCategory() {
    if (newCategory != "") {
      try {
        await dispatch(createCategory({ title: newCategory })).unwrap();
        setNewCategory("");
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      }
    }
  }
  return (
    <div className="addCategory">
      <span>
        <input
          type="text"
          name="addCategory"
          placeholder="add new category"
          value={newCategory}
          onChange={(evt) => setNewCategory(evt.target.value)}
        />
        <FaCheck onClick={handleAddToCategory} />
      </span>
      <CategoryList mode={"edit"} />
    </div>
  );
}
