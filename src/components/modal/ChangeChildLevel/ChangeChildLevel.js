//React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import classes from "./ChangeChildLevel.module.scss";

//Components
import SelectSearch from "../../form/SelectSearch/SelectSearch";

const ChangeChildLevel = ({
  open,
  handleClose,
  password,
  setPassword,
  childLevel,
  isMobileDevice = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, _setError] = useState(false);
  const [level, setLevel] = useState();
  const [levelOptions, setLevelOptions] = useState();
  const params = useParams();
  const [_msg, sendNotification] = useNotification();

  // Onload
  useEffect(() => {
    getSchoolLevel();
  }, []);

  // Get level options
  const getSchoolLevel = async () => {
    try {
      const res = await API.get(
        `/children/${params?.id}/school_education_category`
      );

      const options = res?.data?.map((level) => {
        return {
          value: level,
          label: level,
        };
      });

      setLevelOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (level?.value === childLevel) {
        return sendNotification({
          msg: "Cannot change with the same children level",
          variant: "error",
        });
      }

      const payload = {
        school_education_category: level?.value,
        password,
      };

      await API.post(
        `/children/${params?.id}/school_education_category`,
        payload
      );

      sendNotification({
        msg: "Child level changed successfully",
        variant: "success",
      });

      window.location.reload();
    } catch (error) {
      sendNotification({
        msg: error?.response?.data?.message || "Please try again later",
        variant: "error",
      });
    } finally {
      setPassword();
      setIsLoading(false);
      setLevel();
      handleClose();
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
              <p className={classes.modalTitle}>Change Child Level</p>
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
                  Please select level for this child. Level can only select one
                  year before or after and once
                </h6>
                <SelectSearch
                  options={levelOptions}
                  selected={level}
                  setSelected={setLevel}
                  placeholder="Select your child level"
                  helperText={error}
                  getOptionDisabled={(option) => option.value === childLevel}
                />
              </div>
            </Grid>
            <Grid item md={12} xs={12}>
              <div className={classes.btnGroup}>
                <Button
                  disabled={!level}
                  onClick={handleSubmit}
                  fullWidth
                  className={classes.btnSubmit}
                  startIcon={
                    isLoading && (
                      <CircularProgress color="inherit" size="1rem" />
                    )
                  }
                >
                  Save Changes
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

export default ChangeChildLevel;
