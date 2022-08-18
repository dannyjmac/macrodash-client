import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: 100,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link to="/"></Link>
    </div>
  );
};
