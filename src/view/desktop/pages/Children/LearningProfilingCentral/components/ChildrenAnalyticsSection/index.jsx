import React, { Fragment, useEffect } from "react";

// helper
import { useParams } from "react-router-dom";

// styles
import classes from "./_ChildrenAnalyticsSection.module.scss";

// assets
import { ReactComponent as NoAnalytics } from "../../../../../../../assets/images/ChildrenDashboard/illustration-no-children-analitycs.svg";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getChildProfilingTestAnalytic } from "../../../../../../../store/profilingTest/getChildProfilingTestAnalytic";

// hooks
import useModalDetailAnalytics from "../../../../../../../hooks/learningProfilingCentral/useModalDetailAnalytics";

// components
import { API_FETCH_STATUS } from "../../../../../../../constants/api";
import IllustrationBox from "../../../../../components/IllustrationBox";
import AnalyticDetailsModal from "./components/AnalyticDetailsModal";
import CareerInterest from "./components/CareerInterest";
import KeyLearningDimensionSection from "./components/KeyLearningDimensionSection";
import MultipleIntelligenceSection from "./components/MultipleIntelligenceSection";
import SensorySection from "./components/SensorySection";
import TypologySection from "./components/TypologySection";

const ChildrenAnalyticsSection = () => {
  const dispatch = useDispatch();
  const { childrenId } = useParams();

  const { selectedDetailDescription, handleSelectDetail, closeModal } =
    useModalDetailAnalytics();

  const { analyticsResults, status, errorCode, childrenIdResult } = useSelector(
    (store) => store.resChildrenAnalytics
  );

  useEffect(() => {
    if (
      status === API_FETCH_STATUS.IS_IDLE &&
      childrenIdResult !== childrenId
    ) {
      dispatch(getChildProfilingTestAnalytic({ childrenId }));
    }
  }, []);

  const { mbti, kld, mi, sensory, career } = analyticsResults;

  if (errorCode !== 200) {
    return (
      <div className={classes.containerChildrenAnalytics}>
        <IllustrationBox
          illustration={<NoAnalytics />}
          title="No Children Analytics"
          subTitle="To access children`s analytics, completing the test is"
          subTitle2="required. Assign
        the test to your children and start"
        />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.containerChildrenAnalytics}>
        <div className={classes.headerAnalytics}>
          <h6>Children Analytics</h6>
          <p>See your children result after taking profiling test</p>
        </div>

        <TypologySection
          icon={mbti?.content?.icon}
          header={mbti?.content?.summary?.header}
          body={mbti?.content?.summary?.description}
          personalityText={mbti?.content?.personality}
          score={mbti?.score}
          onClick={() => handleSelectDetail("typology")}
        />

        {kld && (
          <KeyLearningDimensionSection
            score={kld?.score}
            summaryText={kld.content?.summary}
            onClick={() => handleSelectDetail("keyLearningDimension")}
          />
        )}

        {mi && (
          <MultipleIntelligenceSection
            score={mi?.score}
            content={mi?.content}
            onClick={() => handleSelectDetail("multipleIntelligence")}
          />
        )}

        {sensory && (
          <SensorySection
            score={sensory.score}
            content={sensory.content}
            onClick={() => handleSelectDetail("sensory")}
          />
        )}

        {career && (
          <CareerInterest
            score={career.score}
            content={career.content}
            onClick={() => handleSelectDetail("careerInterest")}
          />
        )}
      </div>

      <AnalyticDetailsModal
        open={Boolean(selectedDetailDescription)}
        type={selectedDetailDescription}
        closeModal={closeModal}
      />
    </Fragment>
  );
};

export default ChildrenAnalyticsSection;
