// React
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Helper
import Cookies from "universal-cookie";

// MUI
import { Backdrop, CircularProgress } from "@mui/material";

function AuthRoute() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [isLoading, setIsLoading] = useState(true);
  const authToken = cookies.get("access_token");

  useEffect(() => {
    if (!authToken) {
      navigate("/unauthenticated");
    }

    setIsLoading(false);
    //eslint-disable-next-line
  }, [authToken]);

  return isLoading ? (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  ) : (
    <Outlet />
  );
}

export default AuthRoute;
