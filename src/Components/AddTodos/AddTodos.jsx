import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { useState } from "react";
import AddCategory from "../AddTodosForms/AddCategory";
import AddTodo from "../AddTodosForms/AddTodo";
import "./addTodo.css";
export default function AddTodos({ show, setShow }) {
  const handleClose = () => setShow(false);
  const [active, setActive] = useState("AddCategory");
  function getPage() {
    if (active == "AddCategory") {
      return <AddCategory />;
    } else if (active == "AddTodo") {
      return <AddTodo />;
    }
  }
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span
            className={
              active == "AddCategory" ? "formsTitle active" : "formsTitle"
            }
            onClick={() => setActive("AddCategory")}
          >
            AddCategory
          </span>
          <span
            className={active == "AddTodo" ? "formsTitle active" : "formsTitle"}
            onClick={() => setActive("AddTodo")}
          >
            AddTodo
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{getPage()}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AddTodos.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
};
