// React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { CircularProgress } from "@mui/material";

// Assets
import { ReactComponent as NoPage } from "../../assets/images/no-children.svg";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <div className="container404">
      <NoPage className="notFoundImage" />
      <h1>Sorry, page not found.</h1>
      <div>
        <CircularProgress size={20} color="inherit" />
        <h3> Redirecting to homepage...</h3>
      </div>
    </div>
  );
};

export default NotFound;
