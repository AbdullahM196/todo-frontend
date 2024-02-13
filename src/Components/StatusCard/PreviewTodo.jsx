import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { selectTodoById } from "../../Store/apiSlices/TodosSlice";
import { useSelector } from "react-redux";
export default function PreviewTodo({ show, setShow, todoId }) {
  const todo = useSelector((state) => selectTodoById(state, todoId));
  const handleClose = () => setShow(false);
  const updatedAt = todoId && formatDistanceToNow(new Date(todo.updatedAt));
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{todo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {todo?.img?.url && (
          <img className="w-100 h-100" src={todo?.img?.url} alt={todo.title} />
        )}
        <p className="my-2 fs-3 fw-bold"> {todo.body}</p>
        <p className="my-2 fs-4 fw-medium">Status: {todo.status}</p>
        <p className="my-2 text-secondary">Last Update: {updatedAt}</p>
      </Modal.Body>
    </Modal>
  );
}
PreviewTodo.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  todoId: PropTypes.string,
};
