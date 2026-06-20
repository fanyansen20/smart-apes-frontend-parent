// React
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/brand.svg";
import { handleLogoutRedux } from "../../store/user/userSlice";

// Cookies
import Cookies from "universal-cookie";

// MUI
import { CircularProgress } from "@mui/material";

const Unauthenticated = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = cookies.get("access_token");

  useEffect(() => {
    if (isLogin) {
      return navigate("/");
    }

    // For production environment
    cookies.set("is_parent_log_out", true, {
      path: "/",
      domain: "smartapes.sg",
    });

    // For dev env
    if (process.env.NODE_ENV === "development") {
      cookies.set("is_parent_log_out", true, { path: "/" });
    }

    dispatch(handleLogoutRedux());

    const timeOutId = setTimeout(() => {
      window.location.href = process.env.REACT_APP_MARKETPLACE_URL;
    }, 3000);
    return () => clearTimeout(timeOutId);
  }, [isLogin]); // eslint-disable-line

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        gap: "3em",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo style={{ width: "300px", height: "100px" }} />
      <p style={{ textAlign: "center" }}>
        Please login from Smart Apes marketplace app. Redirecting...
      </p>
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Unauthenticated;
