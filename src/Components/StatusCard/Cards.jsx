import PropTypes from "prop-types";
import "./status.css";
import { HiDotsHorizontal } from "react-icons/hi";
import { deleteTodo } from "../../Store/apiSlices/TodosSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import UpdateTodo from "../AddTodosForms/UpdateTodo";
import PreviewTodo from "./PreviewTodo";
import { VscPinned } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { TbPinnedFilled } from "react-icons/tb";
import {
  favoritesIds,
  addFavorite,
  removeFavorite,
} from "../../Store/apiSlices/favoriteSlice";

export default function Cards({ data }) {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [showMenu, setShowMenu] = useState(false);
  const fav = useSelector(favoritesIds);
  const isFav = fav.includes(data._id) ? true : false;
  async function handleDelete() {
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
          await dispatch(deleteTodo(data._id)).unwrap();
          MySwal.fire("Deleted!", "Your Todo has been deleted.", "success");
        }
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState(false);
  const handlePreview = () => setPreview(true);
  async function handleRemFav() {
    try {
      await dispatch(removeFavorite(data._id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  }
  async function handleAddToFavs() {
    try {
      await dispatch(addFavorite(data._id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="todosCards" onClick={handlePreview}>
        <span className="header" onClick={(evt) => evt.stopPropagation()}>
          {isFav == true ? (
            <TbPinnedFilled onClick={handleRemFav} />
          ) : (
            <VscPinned onClick={handleAddToFavs} />
          )}
          {showMenu ? (
            <IoClose
              onClick={(evt) => {
                evt.stopPropagation();
                setShowMenu(!showMenu);
              }}
            />
          ) : (
            <HiDotsHorizontal
              onClick={(evt) => {
                evt.stopPropagation();
                setShowMenu(!showMenu);
              }}
            />
          )}
        </span>
        {data.img?.url && <img src={data.img?.url} alt={data.title} />}
        <h3>{data.title.substring(0, 40)}</h3>
        {showMenu && (
          <div className="menu" onClick={(evt) => evt.stopPropagation()}>
            <p onClick={handleShow}>Update Todo</p>
            <p onClick={handleDelete}>Delete Todo</p>
          </div>
        )}
      </div>
      <UpdateTodo show={show} setShow={setShow} todo={data} />
      <PreviewTodo show={preview} setShow={setPreview} todoId={data._id} />
    </>
  );
}
Cards.propTypes = {
  data: PropTypes.object,
};
