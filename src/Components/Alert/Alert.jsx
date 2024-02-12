import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const useAlert = (icons, title, text) => {
  const MySwal = withReactContent(Swal);
  return MySwal.fire({
    icon: icons,
    title: title,
    text: text,
  });
};
export default useAlert;
