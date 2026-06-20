import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// MUI
import { CircularProgress, Container, Grid } from "@mui/material";

// Components
import PrimaryButton from "../../../../../components/PrimaryButton";
import InputTextField from "../../../../../components/form/InputTextField/InputTextField";
import HeaderNavigation from "../../../components/HeaderNavigation";

// Hooks
import useNotification from "../../../../../hooks/useNotification";

// Helper
import { API } from "../../../../../config/api";

// Schema
import { validationSchema } from "./validationSchema";

// Styles
import classes from "./_ChangePassword.module.scss";

const ChangePasswordSettings = () => {
  const navigate = useNavigate();

  const [_msg, sendNotification] = useNotification();

  // #region useState
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // #endregion

  // #region redux state
  const userData = useSelector((store) => store.user);
  // #endregion

  // #region function
  const handleValidation = async () => {
    try {
      setErrors({});
      // Validate input
      await validationSchema
        .validate(
          { currentPassword, newPassword, confirmNewPassword },
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

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const userId = userData.userData.id;
      const data = {
        old_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      };
      await API.patch(`/users/${userId}/password`, data);

      // Send alert
      sendNotification({
        msg: "Password changed successfully",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        const messages = error.response.data.message.split(",");
        sendNotification({
          msg: messages[0],
          variant: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      handleValidation();
    }
  }, [currentPassword, newPassword, confirmNewPassword]);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Change Password" goBack={goBack} />
      <Container className={classes.container}>
        <Grid container gap={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <InputTextField
              label="Confirm New Password"
              value={confirmNewPassword}
              handleChange={(e) => setConfirmNewPassword(e.target.value)}
              error={false}
              type="password"
              helperText={errors?.confirmNewPassword}
              passwordHelper
            />
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <PrimaryButton
            disabled={Object.keys(errors).length !== 0}
            className={classes.submitButton}
            fullWidth
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Confirm"
            )}
          </PrimaryButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default ChangePasswordSettings;
