import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Topic(props) {
  const { topicTitle, description, path } = props;
  return (
    <div className="d-flex m-5 justify-content-between align-items-center">
      <div>
        <h5 style={{ fontWeight: "bold" }}>{topicTitle}</h5>
        <h6>{description}</h6>
      </div>
      {path && (
        <Link to={path}>
          <button
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#131b37",
              width: "80px",
              height: "40px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            <i className="bi bi-plus-lg" /> เพิ่ม
          </button>
        </Link>
      )}
    </div>
  );
}
