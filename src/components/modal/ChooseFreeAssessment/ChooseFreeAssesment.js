// React
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../config/api";

// MUI & Styles
import {
  Modal,
  Box,
  Fade,
  Backdrop,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import classes from "./ChooseFreeAssessment.module.scss";

const ChooseFreeAssesment = ({ open, handleClose, data }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Handle select
  const handleSelect = (id) => {
    setSelectedTest(id);
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // Check if no selected assessment
      if (!selectedTest) {
        setIsLoading(false);
        return;
      }

      // Create assessment attempt
      const res = await API.post(
        `/children/${params.id}/pre-assessments/${selectedTest}/attempts`
      );

      const attemptsList = res.data.PreAssessmentAttempts;

      // Get last attempt
      const lastAttempt = attemptsList.filter(
        (item) =>
          item.number_of_attempt ===
          Math.max(...attemptsList.map((value) => value.number_of_attempt))
      );
      navigate(
        `/children/${params.id}/free-assessment/${selectedTest}/attempt/${lastAttempt[0].id}`
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response.status) {
        handleAttemptExist();
      }
    }
  };

  // Handle if assessment not taken but attempt already created
  const handleAttemptExist = async () => {
    try {
      const res = await API.get(
        `/children/${params.id}/pre-assessments/${selectedTest}/attempts`
      );

      // Get last attempt
      const lastAttempt = res.data.filter(
        (item) =>
          item.number_of_attempt ===
          Math.max(...res.data.map((value) => value.number_of_attempt))
      );
      navigate(
        `/children/${params.id}/free-assessment/${selectedTest}/attempt/${lastAttempt[0].id}`
      );
    } catch (error) {
      console.error(error);
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
              <p className={classes.modalTitle}>Choose Free Assessment Test</p>
              {data?.map((item, index) => (
                <div
                  onClick={() => handleSelect(item.id)}
                  key={index}
                  className={classes.testItem}
                >
                  <div className={classes.testTitle}>
                    <h3>{item.subject}</h3>
                    <h5>{item.title}</h5>
                  </div>
                  {item.id === selectedTest ? <CheckCircleOutlineIcon /> : ""}
                </div>
              ))}
            </Grid>
            <Grid item md={12} xs={12}>
              <div className={classes.btnGroup}>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  className={classes.btnSubmit}
                  startIcon={
                    isLoading && (
                      <CircularProgress color="inherit" size="1rem" />
                    )
                  }
                >
                  Submit
                </Button>
                <Button
                  onClick={handleClose}
                  fullWidth
                  className={classes.btnCancel}
                >
                  Cancel
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChooseFreeAssesment;
