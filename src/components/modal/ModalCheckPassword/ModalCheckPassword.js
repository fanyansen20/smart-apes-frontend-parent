//React
import { useState } from "react";
import { API } from "../../../config/api";
import useNotification from "../../../hooks/useNotification";

//MUI
import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";

//Styles
import classes from "./ModalCheckPassword.module.scss";

//Components
import InputTextField from "../../../components/form/InputTextField/InputTextField";

const ModalCheckPassword = ({
  open,
  handleClose,
  handleOpenModalLevel,
  password,
  setPassword,
  isMobileDevice = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [_msg, sendNotification] = useNotification();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await API.post("/user-auth/confirm-password", {
        password,
      });

      handleClose();
      handleOpenModalLevel();
    } catch (error) {
      sendNotification({
        msg: error?.response?.data?.message || "Please try again later",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade className={classes.modal} in={open}>
        <Box>
          <Grid container>
            <Grid item md={12} xs={12}>
              <p className={classes.modalTitle}>Confirmation Password</p>
              <Divider />
              {isMobileDevice && (
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item md={12} xs={12}>
              <div className={classes.content}>
                <h6>
                  You need to insert your password before change the children
                  level
                </h6>
                <form>
                  <InputTextField
                    autoComplete="current-password"
                    value={password}
                    placeholder="Password"
                    handleChange={(e) => setPassword(e.target.value)}
                    type="password"
                    passwordHelper
                  />
                </form>
              </div>
            </Grid>
            <Grid item md={12} xs={12}>
              <div className={classes.btnGroup}>
                <Button
                  disabled={!password}
                  onClick={handleSubmit}
                  fullWidth
                  className={classes.btnSubmit}
                  startIcon={
                    isLoading && (
                      <CircularProgress color="inherit" size="1rem" />
                    )
                  }
                >
                  Confirm
                </Button>

                {!isMobileDevice && (
                  <Button
                    onClick={handleClose}
                    fullWidth
                    className={classes.btnCancel}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalCheckPassword;
