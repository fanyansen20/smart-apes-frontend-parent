import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Icon
import { ReactComponent as DocumentIcon } from "../../../../../../assets/icons/document.svg";
import { ReactComponent as GraphIcon } from "../../../../../../assets/icons/graph.svg";
import { ReactComponent as LockIcon } from "../../../../../../assets/icons/lock.svg";

// Component
import PrimaryButton from "../../../../../../components/PrimaryButton";

// Date-fns
import { format, parseISO } from "date-fns";

// Styles
import { Link } from "react-router-dom";
import classes from "./_AsssessmentItem.module.scss";

/**
 * @typedef {{
 * FreeAssessmentAttempts: FreeAssessmentAttempts[];
 * id: string;
 * school_education_category: string;
 * status: string;
 * subject: string;
 * title: string;
 * }} AssessmentData
 */

/**
 * @typedef {{
 * attempt_number: number;
 * canAttempt: true;
 * canSeeResult: false;
 * child_id: string;
 * free_assessment_id: string;
 * score: number;
 * status: string;
 * title: string;
 * total_questions: 20;
 * }} FreeAssessmentAttempts
 */

/**
 * @param {{
 * assessmentData: AssessmentData;
 * truncateTitle?: boolean;
 * handleTakeTest: (attempt: number, id: string);
 * }} param0
 * @returns {*}
 */

const AssessmentItem = ({
  childrenId,
  assessmentData,
  truncateTitle,
  handleTakeTest,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography
          className={classes.assessmentSubjectTitle}
        >{`${assessmentData.subject} Assessment Test`}</Typography>
      </Grid>

      {assessmentData?.FreeAssessmentAttempts?.map((assessment) => {
        const assessmentIsDone = assessment.status === "DONE";

        return (
          <Grid
            key={assessment.id}
            item
            xs={12}
            className={classes.assessmentItem}
          >
            {!assessment.canAttempt && !assessmentIsDone && (
              <Grid item sx={12} className={classes.overlay}>
                <div className={classes.overlayContent}>
                  <LockIcon />
                  <Typography>You need to take the previous test</Typography>
                </div>
              </Grid>
            )}

            <Grid
              container
              xs={12}
              className={classes.assessmentInfoContainer}
              gap={1}
            >
              {/* Assessment Info Details */}
              {assessmentIsDone && (
                <Grid item xs={12} className={classes.assessmentDone}>
                  <Typography className={classes.subtitleDone}>
                    {`${assessment.status} (${format(
                      parseISO(assessment?.submit_date),
                      "dd MMM yyyy"
                    )})`}
                  </Typography>
                </Grid>
              )}

              {!assessmentIsDone && (
                <Grid item xs={12} className={classes.assessmentInfo}>
                  <Typography className={classes.subtitle}>
                    {`${assessment?.total_questions} Questions | ${assessment?.total_questions} mins`}
                  </Typography>
                </Grid>
              )}

              {/* assessment Item Title */}
              <Grid item xs={12}>
                <Typography
                  className={
                    truncateTitle
                      ? classes.assessmentTitleTruncate
                      : classes.assessmentTitle
                  }
                >
                  {assessment?.title}
                </Typography>
              </Grid>
            </Grid>

            {/* Assessment Action Item Button */}
            {assessmentIsDone && (
              <Grid item>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link
                    to={`/children/${childrenId}/free-assessment/${assessment?.free_assessment_id}/summary/${assessment?.id}`}
                  >
                    <button className={classes.actionButton}>
                      <DocumentIcon width={16} height={16} />
                    </button>
                  </Link>

                  <Link
                    to={`/children/${childrenId}/free-assessment/${assessment?.free_assessment_id}/result/${assessment?.id}`}
                  >
                    <button className={classes.actionButton}>
                      <GraphIcon width={16} height={16} />
                    </button>
                  </Link>
                </div>
              </Grid>
            )}

            {!assessmentIsDone && (
              <PrimaryButton
                onClick={() =>
                  handleTakeTest({
                    assessmentAttempt: assessmentData?.FreeAssessmentAttempts,
                    assessmentId: assessment?.free_assessment_id,
                  })
                }
              >
                Take Test
              </PrimaryButton>
            )}
          </Grid>
        );
      })}
    </>
  );
};

export default AssessmentItem;
