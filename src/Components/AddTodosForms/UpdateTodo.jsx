import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { updateExistingTodo } from "../../Store/apiSlices/TodosSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  // fetchCategories,
  selectAllCategories,
} from "../../Store/apiSlices/categorySlice";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loding";
export default function UpdateTodo({ show, setShow, todo }) {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [image, setImage] = useState(todo.img);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(todo.title);
  const [body, setBody] = useState(todo.body);
  const [status, setStatus] = useState(todo.status);
  const [category, setCategory] = useState(todo.category);
  const categories = useSelector(selectAllCategories);
  const todosStatus = ["toDo", "inProgress", "done"];
  const handleClose = () => setShow(false);
  const { status: state } = useSelector((state) => state.category);
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);
  async function handleUpdateTodo() {
    if (!title && !body && !status && !category && !image) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please add Data To update",
      });
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("status", status);
      if (category) {
        formData.append("categoryId", category);
      }
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (allowedTypes.includes(file.type) && file.size <= 1024 * 1024) {
          formData.append("img", file);
        } else {
          MySwal.fire({
            icon: "error",
            title: "Enter a valid image",
            text: "Enter an image with these types: image/jpeg, image/png, image/jpg, and the image size should not be greater than 1MB",
          });
          return;
        }
      }
      try {
        await dispatch(
          updateExistingTodo({ id: todo._id, body: formData })
        ).unwrap();
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
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="addTodoForm">
          <label htmlFor="imgInput">
            <img
              src={file ? image : image?.url}
              alt={todo.title}
              className="w-100 h-100"
            />
            <input
              type="file"
              id="imgInput"
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              name="todoImage"
              placeholder="uploadImage"
              style={{ display: "none" }}
            />
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
            <option value="">Select Category</option>
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
          {state == "loading" ? (
            <Loading />
          ) : (
            <button className="btn btn-dark" onClick={handleUpdateTodo}>
              Update Todo
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
UpdateTodo.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  todo: PropTypes.object,
};
