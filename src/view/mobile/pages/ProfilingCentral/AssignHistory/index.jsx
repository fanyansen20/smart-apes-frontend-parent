import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAssignedProfilingTestHistory } from "../../../../../store/profilingTest/getAssignedProfilingTestHistory";

// Components
import AssignHistoryItem from "../components/AssignHistoryItem";

// Hooks
import useActionTableAssignHistory from "../../../../../hooks/learningProfilingCentral/useActionTableAssignHistory";

// Styles
import classes from "./_AssignHistory.module.scss";

const AssignHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { childrenId: childId } = useParams();

  // #region hooks
  const { redirectToTakeTest, redirectToDownloadReport, handleSeeSummary } =
    useActionTableAssignHistory();
  // endregion

  // #region redux state
  const { assignHistoryData } = useSelector((store) => store.resAssignHistory);
  // #endregion

  // #region function
  const seeMore = () => {
    navigate("assign-history?tab=pending");
  };

  const redirectToSeeSummary = ({ referenceId }) => {
    handleSeeSummary({ childrenId: childId, referenceId });
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    dispatch(getAssignedProfilingTestHistory({ childId }));
  }, []);
  // #endregion

  return (
    <Container className={classes.container}>
      <Grid className={classes.titleContainer} xs={12}>
        {/* Section Title */}
        <Grid className={classes.title}>
          <Typography>Profiling Test</Typography>
          {assignHistoryData?.length > 0 && (
            <div onClick={seeMore} className={classes.seeMoreTitle}>
              <p>See More</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Grid container xs={12} gap={1}>
        {/* History List */}
        {assignHistoryData.slice(0, 3).map((item, index) => (
          <AssignHistoryItem
            key={index}
            item={item}
            variant="modal"
            redirectToTakeTest={redirectToTakeTest}
            redirectToSeeSummary={redirectToSeeSummary}
            redirectToDownloadReport={redirectToDownloadReport}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default AssignHistory;
