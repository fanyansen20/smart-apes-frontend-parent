// React
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useNotification from "../../../hooks/useNotification";

// MUI
import { Grid, Button } from "@mui/material";

// Components
import InputTextField from "../../form/InputTextField/InputTextField";

// Helper
import { API } from "../../../config/api";
import { object, string } from "yup";

const PasswordAndSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  });
  const [_msg, sendNotification] = useNotification();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  // Init first render
  const firstRender = useRef(true);

  // Validate Input
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    handleValidation();
    //eslint-disable-next-line
  }, [currentPassword, newPassword, repeatNewPassword]);

  //Yup Schema
  let validationSchema = object({
    currentPassword: string().required("Please insert your current password"),
    newPassword: string()
      .min(8, "Password must be at least 8 characters")
      .required("Please insert your new password")
      .test(
        "passwords-different",
        "New password couldn't be same with current password",
        function (value) {
          return this.parent.currentPassword !== value;
        }
      )
      .test(
        "contain-number",
        "Your password should contain number",
        function (value) {
          return /\d/.test(value);
        }
      ),
    repeatNewPassword: string()
      .required("Please confirm your new password")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.newPassword === value;
      }),
  });

  //Handle validation
  const handleValidation = async () => {
    try {
      setErrors({});
      // Validate input
      await validationSchema
        .validate(
          { currentPassword, newPassword, repeatNewPassword },
          { abortEarly: false }
        )
        .catch(function (e) {
          let _errors = {};

          for (let i = 0; i < e.inner.length; i++) {
            _errors[e.inner[i].path] = e.inner[i].message;
          }

          setErrors(_errors);
          throw new Error(e);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const userId = userData.userData.id;
      const data = {
        old_password: currentPassword,
        new_password: newPassword,
        confirm_password: repeatNewPassword,
      };
      await API.patch(`/users/${userId}/password`, data);

      // Send alert
      sendNotification({
        msg: "Password changed successfully",
        variant: "success",
      });

      // Redirect
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        const messages = error.response.data.message.split(",");
        sendNotification({
          msg: messages[0],
          variant: "error",
        });
      }
    }
  };

  return (
    <div className="container-profile-content" style={{ minHeight: "0" }}>
      <p className="title">Change Password</p>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <InputTextField
            label="Current Password"
            value={currentPassword}
            handleChange={(e) => setCurrentPassword(e.target.value)}
            error={false}
            type="password"
            helperText={errors?.currentPassword}
            passwordHelper
          />
        </Grid>
        <Grid item md={12}>
          <InputTextField
            label="New Password"
            value={newPassword}
            handleChange={(e) => setNewPassword(e.target.value)}
            error={false}
            type="password"
            helperText={errors?.newPassword}
            passwordHelper
          />
        </Grid>
        <Grid item md={12}>
          <InputTextField
            label="Confirm New Password"
            value={repeatNewPassword}
            handleChange={(e) => setRepeatNewPassword(e.target.value)}
            error={false}
            type="password"
            helperText={errors?.repeatNewPassword}
            passwordHelper
          />
        </Grid>
        <Grid item md={12}>
          <div className="btn-group">
            <Link to="/">
              <Button>Back</Button>
            </Link>
            <Button
              disabled={Object.keys(errors).length !== 0}
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PasswordAndSecurity;
