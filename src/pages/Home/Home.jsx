import { useState } from "react";
import StatusRow from "../../Components/StatusRow/StatusRow";
import "./home.css";
import { IoMdAdd } from "react-icons/io";
import AddTodos from "../../Components/AddTodos/AddTodos";
import { selectAllTodos } from "../../Store/apiSlices/TodosSlice";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loding";
export default function Home() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const todos = useSelector(selectAllTodos);
  const TodoStatus = useSelector((state) => state.todo);
  return (
    <div id="home">
      <div className="container-fluid">
        {TodoStatus.status === "loading" && <Loading />}
      </div>
      {TodoStatus.status === "succeeded" && <StatusRow data={todos} />}
      <button className="addTodo" onClick={handleShow}>
        <IoMdAdd />
      </button>
      <AddTodos show={show} setShow={setShow} />
    </div>
  );
}
