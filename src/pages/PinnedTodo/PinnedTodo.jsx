import { useSelector } from "react-redux";
import StatusRow from "../../Components/StatusRow/StatusRow";
import { favoritesIds } from "../../Store/apiSlices/favoriteSlice";
import { selectAllTodos } from "../../Store/apiSlices/TodosSlice";
export default function PinnedTodo() {
  const todosIds = useSelector(favoritesIds);
  const allTodos = useSelector(selectAllTodos);
  const todos = allTodos.filter((todo) => todosIds.includes(todo._id));
  return (
    <div>
      <StatusRow data={todos} />
    </div>
  );
}
