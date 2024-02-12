import "./Loading.css";
export default function Loading() {
  return (
    <div
      style={{ width: "100%", height: "calc(100vh - 60px)" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
