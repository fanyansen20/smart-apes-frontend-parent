import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Grid, Typography } from "@mui/material";

// Component
import AssessmentItem from "../AssessmentItem";

// Hooks
import useNotification from "../../../../../../hooks/useNotification";

// Styles
import { API } from "../../../../../../config/api";
import classes from "./_EAssessmentCard.module.scss";

/**
 * @param {{
 * childrenId : string,
 * assessmentData : [];
 * }} param0
 */

const EAssessmentCard = ({ childrenId, assessmentData }) => {
  const navigate = useNavigate();
  const [_msg, sendNotification] = useNotification();

  // #region function

  // Create assessment attempt
  const createAssessment = async (assessmentId) => {
    try {
      // Create assessment attempt
      const res = await API.post(
        `/children/${childrenId}/free-assessments/${assessmentId}/attempts`
      );

      navigate(
        `/children/${childrenId}/free-assessment/${assessmentId}/attempt/${res.data.id}`
      );
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        handleAttemptExist(assessmentId);
      }
    }
  };

  // Handle if assessment not taken but attempt already created
  const handleAttemptExist = async (assessmentId) => {
    try {
      const res = await API.get(`/children/${childrenId}/free-assessments`);

      // Get last attempt
      const lastAttemptSubject = res.data.filter(
        (item) => item.id === assessmentId
      );
      const lastAttempt = lastAttemptSubject[0].FreeAssessmentAttempts.filter(
        (item) => item.canAttempt
      );

      navigate(
        `/children/${childrenId}/free-assessment/${assessmentId}/attempt/${lastAttempt[0].id}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleTakeTest = ({ assessmentAttempt, assessmentId }) => {
    if (assessmentAttempt.length === 0 || !assessmentId) {
      sendNotification({
        msg: "Cannot take this test. Please try again later",
        variant: "error",
      });
    }

    const availableTest = assessmentAttempt.find(
      (assessment) => assessment.canAttempt
    );

    if (availableTest) {
      // navigate(`/children/${availableTest?.child_id}/assessment-central`);
      createAssessment(assessmentId);
    } else {
      sendNotification({
        msg: "You have completed this assessment",
        variant: "error",
      });
    }
  };

  const navigateToSeeAll = () => {
    navigate(`assessment-central`);
  };
  // #endregion

  return (
    <div>
      <Grid className={classes.title} xs={12}>
        {/* Section Title */}
        <Grid className={classes.assessmentTitle}>
          <Typography>E-Assessment</Typography>
          {assessmentData?.length > 0 && (
            <div onClick={navigateToSeeAll} className={classes.seeMoreTitle}>
              <p>See All Assessment</p>
            </div>
          )}
        </Grid>
      </Grid>
      {assessmentData.length > 0 ? (
        <Grid container xs={12} gap={1}>
          {/* Assessment List */}
          {assessmentData?.slice(0, 3)?.map((assessment, index) => (
            <AssessmentItem
              key={index}
              childrenId={childrenId}
              assessmentData={assessment}
              handleTakeTest={handleTakeTest}
            />
          ))}
        </Grid>
      ) : (
        <Grid xs={12} className={classes.noClass}>
          <p>No E-Assessment Yet</p>
        </Grid>
      )}
    </div>
  );
};

export default EAssessmentCard;
