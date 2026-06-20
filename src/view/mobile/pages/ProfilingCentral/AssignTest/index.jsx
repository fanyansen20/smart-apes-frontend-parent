import React, { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAssignAbleTest } from "../../../../../store/profilingTest/getAssignAbleTest";
import { getCountProfilingTest } from "../../../../../store/profilingTest/getCountProfilingTest";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Components
import PrimaryButton from "../../../../../components/PrimaryButton";
import ModalConfirmationAssign from "../../../../desktop/pages/Children/LearningProfilingCentral/components/ModalConfirmationAssign";
import HeaderNavigation from "../../../components/HeaderNavigation";
import AssignTestItem from "../components/AssignTestItem";

// Hooks
import useModalAssignProfilingTest from "../../../../../hooks/learningProfilingCentral/useModalAssignProfilingTest";
import useOpenModalConfirmationAssign from "../../../../desktop/pages/Children/LearningProfilingCentral/hooks/useOpenModalConfirmationAssign";

// Styles
import classes from "./_AssignTest.module.scss";

const AssignTest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { childrenId } = useParams();

  // #region hooks
  const { checkedData, handleSelectPackage, assignOnTest } =
    useModalAssignProfilingTest();

  const {
    isOpenModalConfirmation,
    handleOpenModalConfirmation,
    handleCloseModalConfirmation,
  } = useOpenModalConfirmationAssign();
  // #endregion

  // #region redux state
  const { assignAbleData } = useSelector((store) => store.resAssignAbleTest);
  const { dataCountProfilingTests } = useSelector(
    (store) => store.resCountProfilingTest
  );
  // #endregion

  // #region function
  const handleSubmit = () => {
    if (dataCountProfilingTests > 0) {
      return handleOpenModalConfirmation();
    }

    submit();
  };

  const submit = () => {
    assignOnTest({ successCallback: navigateOnAssignTestSuccess });
  };

  const navigateOnAssignTestSuccess = () => {
    navigate(`/children/${childrenId}/learning-profiling-central?tab=history`);
  };

  const goBack = () => {
    navigate(-1);
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    dispatch(getAssignAbleTest({ providerName: "Grip Learning" }));

    dispatch(
      getCountProfilingTest({
        childId: childrenId,
        status: "Pending",
        testName: "Profiling Test Basic",
      })
    );
  }, []);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Learning Profiling Central" goBack={goBack} />
      <Container className={classes.container}>
        {/* Title */}
        <Grid container gap={1} mb={2} direction="column">
          <Typography className={classes.title}>
            Assign Profiling Test
          </Typography>
          <Typography className={classes.subtitle}>
            Make sure you redeem all the test before expired
          </Typography>
        </Grid>
        <Grid container xs={12} gap={1}>
          {/* Profiling Test List */}
          {assignAbleData.map((item, index) => {
            const itemSelected = checkedData === item;
            if (item.qty > 0) {
              return (
                <AssignTestItem
                  key={index}
                  item={item}
                  itemSelected={itemSelected}
                  handleSelectPackage={handleSelectPackage}
                />
              );
            }
          })}
        </Grid>
        <div className={classes.buttonContainer}>
          <PrimaryButton
            disabled={!checkedData}
            fullWidth
            className={classes.submitButton}
            onClick={handleSubmit}
          >
            Assign On
          </PrimaryButton>
        </div>
      </Container>
      <ModalConfirmationAssign
        confirmTitle="Submit"
        open={isOpenModalConfirmation}
        onClose={handleCloseModalConfirmation}
        assignOnTest={submit}
        handleSelectPackage={handleSelectPackage}
      />
    </Fragment>
  );
};

export default AssignTest;
