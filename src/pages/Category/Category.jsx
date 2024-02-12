import { useParams } from "react-router-dom";
import { selectTodosByCategoryId } from "../../Store/apiSlices/categorySlice";
import { useSelector } from "react-redux";
import StatusRow from "../../Components/StatusRow/StatusRow";
export default function Category() {
  const { id } = useParams();
  const todos = useSelector((state) => selectTodosByCategoryId(state, id));
  const status = useSelector((state) => state.category.status);
  return <div>{status == "succeeded" && <StatusRow data={todos} />}</div>;
}
