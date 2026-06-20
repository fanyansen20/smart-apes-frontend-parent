import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getAssignedProfilingTestHistory,
  handleChangePage,
} from "../../../../../store/profilingTest/getAssignedProfilingTestHistory";
import { getCountProfilingTest } from "../../../../../store/profilingTest/getCountProfilingTest";
import { getTestTracker } from "../../../../../store/profilingTest/getTestTracker";

// Components
import PrimaryButton from "../../../../../components/PrimaryButton";
import IllustrationBox from "../../../../desktop/components/IllustrationBox";
import ModalConfirmationAssign from "../../../../desktop/pages/Children/LearningProfilingCentral/components/ModalConfirmationAssign";
import HeaderNavigation from "../../../components/HeaderNavigation";
import TopTabNavigation, {
  TopTabPanel,
} from "../../../components/TopTabNavigation";
import AssignHistoryItem from "../components/AssignHistoryItem";
import AssignModal from "../components/AssignModal";

// Hooks
import useActionTableAssignHistory from "../../../../../hooks/learningProfilingCentral/useActionTableAssignHistory";
import useModalAssignProfilingTest from "../../../../../hooks/learningProfilingCentral/useModalAssignProfilingTest";
import useOpenModalAssignTest from "../../../../desktop/pages/Children/LearningProfilingCentral/hooks/useOpenModalAssignTest";
import useOpenModalConfirmationAssign from "../../../../desktop/pages/Children/LearningProfilingCentral/hooks/useOpenModalConfirmationAssign";
import useChangeTabsAssignHistory from "../hooks/useChangeTabsAssignHistory";

// Constants
import { AssignHistoryEmptyListConstant } from "./AssignHistoryEmptyListConstant";

// Styles
import classes from "./_AssignHistoryList.module.scss";

const AssignHistoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { childrenId: childId } = useParams();

  // #region list
  const [historyList, setHistoryList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  // #endregion

  // #region redux state
  const { assignHistoryData, page, totalPages } = useSelector(
    (store) => store.resAssignHistory
  );
  const { dataTestTracker } = useSelector((store) => store.resTestTrackerSlice);
  const { dataCountProfilingTests } = useSelector(
    (store) => store.resCountProfilingTest
  );
  // #endregion

  // #region hooks
  const { inTab, changeTab } = useChangeTabsAssignHistory();
  const { redirectToTakeTest, redirectToDownloadReport, handleSeeSummary } =
    useActionTableAssignHistory();
  const { checkedData, handleSelectPackage, assignOnTest } =
    useModalAssignProfilingTest();
  const { isOpenModalTest, handleOpenModalTest, handleCloseModalTest } =
    useOpenModalAssignTest();
  const {
    isOpenModalConfirmation,
    handleOpenModalConfirmation,
    handleCloseModalConfirmation,
  } = useOpenModalConfirmationAssign();
  // #endregion

  // #region function
  const goBack = () => {
    navigate(`/children/${childId}/learning-profiling-central?tab=history`);
  };

  const handleScroll = (e) => {
    // check for scrolled to bottom
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (page < totalPages && isBottom) {
      dispatch(handleChangePage({ page: page + 1 }));
    }
  };

  const handleSubmit = () => {
    if (dataCountProfilingTests > 0) {
      handleCloseAssignModal({ isChangeTab: false });
      return handleOpenModalConfirmation();
    }
    submit();
  };

  const submit = () => {
    assignOnTest({
      successCallback: () => handleCloseAssignModal({ isChangeTab: true }),
    });
  };

  const redirectToSeeSummary = ({ referenceId }) => {
    handleSeeSummary({ childrenId: childId, referenceId });
  };
  /**
   *
   * @param {{
   * isChangeTab?: boolean;
   * }} param0
   */
  const handleCloseAssignModal = ({ isChangeTab }) => {
    if (isChangeTab) {
      changeTab("pending");
    }
    handleCloseModalTest();
  };

  // #endregion

  // #region useEffect
  useEffect(() => {
    setIsMounted(true);
    dispatch(getAssignedProfilingTestHistory({ childId }));

    dispatch(getTestTracker({ providerName: "Grip Learning" }));

    dispatch(
      getCountProfilingTest({
        childId,
        status: "Pending",
        testName: "Profiling Test Basic",
      })
    );
  }, []);

  useEffect(() => {
    if (isMounted) {
      dispatch(getAssignedProfilingTestHistory({ childId, page }));
    }
  }, [page]);

  useEffect(() => {
    if (isMounted) {
      const historyData =
        page === 1 ? assignHistoryData : historyList.concat(assignHistoryData);

      setHistoryList(historyData);
    }
  }, [assignHistoryData]);
  // #endregion

  // #region jsx
  /**
   * @param {{
   * type: 'pending' | 'complete'
   * }} param0
   */
  const RenderHistoryList = ({ type }) => {
    const filteredHistoryList = historyList.filter(
      (item) => item.status?.toLowerCase() === type
    );

    return (
      <Container>
        {filteredHistoryList?.length > 0 ? (
          <>
            <Grid mt={2} mb={2}>
              <Typography className={classes.title}>Profiling Test</Typography>
            </Grid>
            <Grid
              container
              xs={12}
              gap={1}
              className={classes.listContainer}
              onScroll={handleScroll}
            >
              {filteredHistoryList?.map((item, index) => (
                <AssignHistoryItem
                  key={index}
                  item={item}
                  variant="button"
                  redirectToTakeTest={redirectToTakeTest}
                  redirectToDownloadReport={redirectToDownloadReport}
                  redirectToSeeSummary={redirectToSeeSummary}
                />
              ))}
            </Grid>
            <Grid className={classes.buttonContainer}>
              <PrimaryButton
                fullWidth
                disabled={!(dataTestTracker.availableTest > 0)}
                onClick={handleOpenModalTest}
              >
                Assign Now
              </PrimaryButton>
            </Grid>
          </>
        ) : (
          <div className={classes.emptyContainer}>
            <IllustrationBox
              illustration={AssignHistoryEmptyListConstant[type].illustration}
              title={AssignHistoryEmptyListConstant[type].title}
              subTitle={AssignHistoryEmptyListConstant[type].subtitle}
            />
            <PrimaryButton
              fullWidth
              disabled={!(dataTestTracker.availableTest > 0)}
              onClick={handleOpenModalTest}
            >
              Assign Now
            </PrimaryButton>
          </div>
        )}
      </Container>
    );
  };
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation
        title="Go To Learning Profiling Central"
        goBack={goBack}
      />
      <Container className={classes.container}>
        <TopTabNavigation
          tabList={[
            { title: "Pending", value: "pending" },
            { title: "Completed", value: "complete" },
          ]}
          variant="fullWidth"
          selectedTab={inTab}
          onChange={changeTab}
        >
          <TopTabPanel value="pending" selectedTab={inTab}>
            <RenderHistoryList type="pending" />
          </TopTabPanel>
          <TopTabPanel value="complete" selectedTab={inTab}>
            <RenderHistoryList type="complete" />
          </TopTabPanel>
        </TopTabNavigation>
      </Container>
      <AssignModal
        open={isOpenModalTest}
        closeModal={handleCloseAssignModal}
        checkedData={checkedData}
        handleSelectPackage={handleSelectPackage}
        handleSubmit={handleSubmit}
      />
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

export default AssignHistoryList;
