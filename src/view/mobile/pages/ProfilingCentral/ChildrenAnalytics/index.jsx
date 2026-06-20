import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getChildProfilingTestAnalytic } from "../../../../../store/profilingTest/getChildProfilingTestAnalytic";

// MUI
import { Grid, Typography } from "@mui/material";

// Component
import IllustrationBox from "../../../../desktop/components/IllustrationBox";
import ExplanationModal from "../components/AnalyticDetailsModal";
import CareerInterestSection from "./components/CareerInterestSection";
import KeyLearningDimensionSection from "./components/KeyLearningDimensionSection";
import MultipleIntelligenceSection from "./components/MultipleIntelligenceSection";
import SensorySection from "./components/SensorySection";
import TypologySection from "./components/TypologySection";

// Styles
import classes from "./_ChildrenAnalytics.module.scss";

// Assets
import { ReactComponent as NoAnalytics } from "../../../../../assets/images/ChildrenDashboard/illustration-no-children-analitycs.svg";

const ChildrenAnalytics = () => {
  const dispatch = useDispatch();
  const { childrenId } = useParams();

  const [selectedDetailDescription, setSelectedDetailDescription] = useState();

  // #region function

  /**
   * @param {('typology' | 'keyLearningDimension' | 'sensory' | 'multipleIntelligence' | 'careerInterest')} value
   */
  const handleSelectDetail = (value) => {
    setSelectedDetailDescription(value);
  };

  const closeModal = () => {
    setSelectedDetailDescription(undefined);
  };
  // #endregion

  // #region redux state
  const { analyticsResults } = useSelector(
    (store) => store.resChildrenAnalytics
  );
  // #endregion

  // #region useEffect
  useEffect(() => {
    dispatch(getChildProfilingTestAnalytic({ childrenId }));
  }, []);
  // #endregion

  if (!analyticsResults) {
    return (
      <IllustrationBox
        illustration={<NoAnalytics />}
        title="No Children Analytics"
        subTitle="To access children's analytics, completing the test is required. Assign the test to your children and start"
      />
    );
  }

  return (
    <Fragment>
      <Grid container flexDirection="column" gap={1} mt={2}>
        <Grid container flexDirection="column">
          <Typography className={classes.title}>Children Analytics</Typography>
          <Typography className={classes.subtitle}>
            See your children result after taking profiling test
          </Typography>
        </Grid>
        <TypologySection
          data={analyticsResults?.mbti}
          handleSelectDetail={handleSelectDetail}
        />
        <KeyLearningDimensionSection
          data={analyticsResults?.kld}
          handleSelectDetail={handleSelectDetail}
        />
        <MultipleIntelligenceSection
          data={analyticsResults?.mi}
          handleSelectDetail={handleSelectDetail}
        />
        <SensorySection
          data={analyticsResults?.sensory}
          handleSelectDetail={handleSelectDetail}
        />
        <CareerInterestSection
          data={analyticsResults?.career}
          handleSelectDetail={handleSelectDetail}
        />
      </Grid>
      <ExplanationModal
        open={Boolean(selectedDetailDescription)}
        type={selectedDetailDescription}
        closeModal={closeModal}
      />
    </Fragment>
  );
};

export default ChildrenAnalytics;
