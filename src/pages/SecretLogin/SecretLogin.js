import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { API } from "../../config/api";

const SecretLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const captcha = useRef();
  const cookies = new Cookies();
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    // TODO condition if using sandbox endpoint
    const captchaToken =
      process.env.NODE_ENV === "development" && !captcha.current.getValue()
        ? "pasti bisa"
        : captcha.current.getValue();

    try {
      setIsLoading(true);

      const config = {
        headers: {
          "captcha-token": captchaToken,
        },
      };

      const data = {
        email: email.current.value,
        password: password.current.value,
      };

      const res = await API.post("/user-auth/login", data, config);

      // Set cookies from login data
      cookies.set("parent_id", res.data.user.id);
      cookies.set("access_token", res.data.tokens.access.token);
      cookies.set("refresh_token", res.data.tokens.refresh.token);

      // remove cookies
      cookies.remove("disable_page_tour");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  const handleRefreshToken = async () => {
    try {
      const refreshToken = cookies.get("refresh_token");
      const resRefresh = await API.post("/user-auth/refresh-tokens", {
        refresh_token: refreshToken,
      });

      // cookies.set("access_token", resRefresh.data.access.token, { path: "/" });
      cookies.set("refresh_token", resRefresh.data.refresh.token, {
        path: "/",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="text" ref={email}></input>
          <label>Password</label>
          <input type="password" ref={password}></input>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            ref={captcha}
          />
          <button type="submit">Login</button>
        </form>
        {isLoading && <div>Loading...</div>}
      </div>
      <button onClick={handleRefreshToken}>Simulate refresh token</button>
    </div>
  );
};

export default SecretLogin;
