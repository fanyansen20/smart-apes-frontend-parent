import axios from "axios";
import Cookies from "universal-cookie";
import { handleLogoutRedux } from "../store/user/userSlice";
import { renewToken } from "./renewToken";
import { store } from "./store";

const cookies = new Cookies();

// Create axios instance
export const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

export const refreshTokenUrl = "/user-auth/refresh-tokens";

// API.defaults.headers.common["ngrok-skip-browser-warning"] = "69"; //Enable ngrok

let refreshTokenFunction = undefined;

API.interceptors.request.use(
  (config) => {
    delete API.defaults.headers.common["Authorization"];
    const accessToken = cookies.get("access_token");

    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const originalConfig = error?.config;
    const accessToken = cookies.get("access_token");
    const refreshToken = cookies.get("refresh_token");
    const parentId = cookies.get("parent_id");
    const errorCode = error?.response?.status;

    if (!accessToken || errorCode !== 401) {
      return Promise.reject(error);
    }

    // If error 401 when refresh token
    if (errorCode === 401 && error?.config?.url === refreshTokenUrl) {
      handleLogout();
    }

    try {
      // Get refresh token
      if (!refreshTokenFunction)
        refreshTokenFunction = renewToken(refreshToken);

      const [newAccessToken, newRefreshToken] = await refreshTokenFunction;

      // Set token & refresh token in the cookie in staging & prod
      if (process.env.NODE_ENV !== "development") {
        cookies.set("access_token", newAccessToken, {
          path: "/",
          domain: "smartapes.sg",
        });

        cookies.set("refresh_token", newRefreshToken, {
          path: "/",
          domain: "smartapes.sg",
        });

        cookies.set("parent_id", parentId, {
          path: "/",
          domain: "smartapes.sg",
        });
      }

      // Local env
      if (process.env.NODE_ENV === "development") {
        cookies.set("access_token", newAccessToken, {
          path: "/",
        });
        cookies.set("refresh_token", newRefreshToken, {
          path: "/",
        });
        cookies.set("parent_id", parentId, {
          path: "/",
        });
      }

      // This is important!, retry the error request.
      try {
        return await API.request(originalConfig);
      } catch (error) {
        console.error(error);
      }
      // return API(error?.config);
    } catch (error) {
      console.error(error);

      ///Erase access token cookie///
      handleLogout();
    } finally {
      refreshTokenFunction = undefined;
    }
  }
);

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

const handleLogout = () => {
  // Staging & Prod Environment
  if (process.env.NODE_ENV !== "development") {
    cookies.set("parent_id", "", { path: "/", domain: "smartapes.sg" });
    cookies.set("access_token", "", {
      path: "/",
      domain: "smartapes.sg",
    });
    cookies.set("refresh_token", "", {
      path: "/",
      domain: "smartapes.sg",
    });
  }

  // Local env
  if (process.env.NODE_ENV === "development") {
    cookies.set("access_token", "", { path: "/" });
    cookies.set("refresh_token", "", {
      path: "/",
    });
  }

  store.dispatch(handleLogoutRedux()).then((result) => {
    if (result.meta.requestStatus === "fulfilled") {
      localStorage.clear();
      window.location.href = "/unauthenticated";
    }
  });
};
