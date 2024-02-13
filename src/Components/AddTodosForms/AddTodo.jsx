import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addNewTodo } from "../../Store/apiSlices/TodosSlice";
import { useDispatch } from "react-redux";
import {
  // fetchCategories,
  selectAllCategories,
} from "../../Store/apiSlices/categorySlice";
import { useSelector } from "react-redux";
export default function AddTodo() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("toDo");
  const [category, setCategory] = useState("");
  const todosStatus = ["toDo", "inProgress", "done"];
  const categories = useSelector(selectAllCategories);
  async function handleSubmitTodo() {
    if (!title && !body && !status) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add title and body",
      });
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("status", status);
      if (image) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(image.type) && image.size <= 1024 * 1024) {
          formData.append("img", image);
        } else {
          MySwal.fire({
            icon: "error",
            title: "enter a valid image",
            text: "Enter image with these types image/jpeg, image/png, image/jpg and the images dose not be greater than 1Mb",
          });
          return;
        }
      }
      if (category) {
        formData.append("categoryId", category);
      }
      try {
        await dispatch(addNewTodo(formData)).unwrap();
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
    <div className="addTodoForm">
      <label htmlFor="imgInput">
        <input
          type="file"
          id="imgInput"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          name="todoImage"
          placeholder="uploadImage"
          style={{ display: "none" }}
        />
        Add Image
        <IoAddCircleOutline />
      </label>
      <input
        type="text"
        name="addTodo"
        placeholder="add new todo"
        onChange={(evt) => setTitle(evt.target.value)}
        value={title}
      />
      <textarea
        name="todoBody"
        rows="4"
        cols="60"
        placeholder="Add Todo Body"
        onChange={(evt) => setBody(evt.target.value)}
        value={body}
      />

      <select
        name="todoCategory"
        id="TodoCategory"
        value={category}
        onChange={(evt) => setCategory(evt.target.value)}
      >
        <option value={null}>Select Category</option>
        {categories.map((cat) => (
          <option value={cat._id} key={cat._id}>
            {cat.title}
          </option>
        ))}
      </select>
      <select
        name="todoStatus"
        id="todoStatus"
        value={status}
        onChange={(evt) => setStatus(evt.target.value)}
      >
        {todosStatus.map((status) => (
          <option value={status} key={status}>
            {status}
          </option>
        ))}
      </select>
      <button className="btn btn-dark" onClick={handleSubmitTodo}>
        Add Todo
      </button>
    </div>
  );
}
