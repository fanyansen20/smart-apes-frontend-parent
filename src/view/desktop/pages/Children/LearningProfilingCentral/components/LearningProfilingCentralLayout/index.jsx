import React, { memo, useEffect } from "react";

// mui material
import { Avatar, Container, Grid } from "@mui/material";

// helper
import { Link, Outlet, useParams } from "react-router-dom";
import { dateFormatter } from "../../../../../../../helper/dateFormat";

// styles
import classes from "./_LearningProfilingCentralLayout.module.scss";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getAssignAbleTest } from "../../../../../../../store/profilingTest/getAssignAbleTest";
import { getCountProfilingTest } from "../../../../../../../store/profilingTest/getCountProfilingTest";
import { getTestTracker } from "../../../../../../../store/profilingTest/getTestTracker";
import { getChildrenProfile } from "../../../../../../../store/user/childSlice";

// components
import SecondaryButton from "../../../../../../../components/button/SecondaryButton";
import ModalEditChildren from "../../../../../../../components/modal/ModalEditChildren/ModalEditChildren";
import ModalAssignProfilingTest from "../ModalAssignProfilingTest";
import ModalConfirmationAssign from "../ModalConfirmationAssign";

// hooks
import useChangeTabsProfilingCentral from "../../../../../../../hooks/learningProfilingCentral/useChangeTabsProfilingCentral";
import useModalAssignProfilingTest from "../../../../../../../hooks/learningProfilingCentral/useModalAssignProfilingTest";
import useOpenModalChildren from "../../../../../hooks/useOpenModalChildren";
import useOpenModalAssignTest from "../../hooks/useOpenModalAssignTest";
import useOpenModalConfirmationAssign from "../../hooks/useOpenModalConfirmationAssign";

const LearningProfilingCentralLayout = () => {
  const dispatch = useDispatch();
  const { childrenId } = useParams();

  const { inTab, changeTab } = useChangeTabsProfilingCentral();

  const { openModalChildren, closeModalChildren, isOpenModalChild } =
    useOpenModalChildren();

  const { isOpenModalTest, handleOpenModalTest, handleCloseModalTest } =
    useOpenModalAssignTest();

  const {
    isOpenModalConfirmation,
    handleOpenModalConfirmation,
    handleCloseModalConfirmation,
  } = useOpenModalConfirmationAssign();

  const { dataTestTracker, status: statusTestTracker } = useSelector(
    (store) => store.resTestTrackerSlice
  );
  const { assignAbleData, status: statusAssignAbleTest } = useSelector(
    (store) => store.resAssignAbleTest
  );

  const { assignOnTest, checkedData, handleSelectPackage } =
    useModalAssignProfilingTest();

  const hasTest = dataTestTracker.availableTest >= 1;
  const availableTest = hasTest ? dataTestTracker.availableTest : "no test";

  const { status, childData } = useSelector((store) => store.child);

  const {
    full_name: childName,
    profile_pic: profileChild,
    level: childLevel,
    dob: birthDate,
    gender: childGender,
  } = childData || {};

  useEffect(() => {
    if (status === "idle") {
      dispatch(getChildrenProfile(childrenId));
    }

    if (statusTestTracker === "idle") {
      dispatch(getTestTracker({ providerName: "Grip Learning" }));
    }

    if (statusAssignAbleTest === "idle") {
      dispatch(getAssignAbleTest({ providerName: "Grip Learning" }));
    }
  }, []);

  const openModalAssign = () => {
    dispatch(
      getCountProfilingTest({
        childId: childrenId,
        status: "Pending",
        testName: "Profiling Test Basic",
      })
    );

    handleOpenModalTest();
  };

  /**
   * @param { 'analytic' |'history'} tab
   * @returns
   */
  const isActive = (tab) => {
    if (tab === inTab) {
      return classes.activeTab;
    }

    return classes.tabSection;
  };

  return (
    <div className={classes.container}>
      <>
        <div className={classes["ellipse-blue"]} />
        <div className={classes["ellipse-purple"]} />
      </>

      {status === "idle" ? (
        <>loading...</>
      ) : (
        <Container maxWidth="xl">
          <Grid container gap={3} direction="column">
            <div className={classes.headerLayoutProfiling}>
              <div className={classes.breadcrumb}>
                <Link to={`children/${childrenId}`}>
                  <p>Dashboard</p>
                </Link>
                <p>/</p>
                <p className={classes.activeLink}>Learning Profile Central</p>
              </div>
              <h5>Learning Profile Central</h5>
            </div>
            <Grid container justifyContent="space-between">
              <Grid
                item
                md={8.8}
                container
                direction="column"
                className={classes.profileSection}
              >
                <Grid>
                  <div className={classes.bannerProfileChild}></div>
                </Grid>

                <Grid
                  container
                  justifyContent="space-around"
                  className={classes.detailProfileChild}
                >
                  <Grid item md={3} className={classes.imageProfileSection}>
                    <Avatar
                      src={profileChild}
                      className={classes.avatarProfile}
                    />
                  </Grid>

                  <Grid item md={3} container gap={2} direction="column">
                    <h5>{childName}</h5>
                    <p className={classes["child-level"]}>{childLevel}</p>
                  </Grid>

                  <Grid item md={3} container gap={2} direction="column">
                    <p>
                      {dateFormatter({
                        date: birthDate,
                        formatting: "MMMM, do. yyyy",
                      })}
                    </p>
                    <p>{childGender}</p>
                  </Grid>

                  <Grid item md={2} alignSelf="center" justifySelf="flex-start">
                    <SecondaryButton
                      onClick={() => openModalChildren(`tab=${inTab}`)}
                    >
                      Edit Profile
                    </SecondaryButton>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={3} className={classes.assignCard}>
                <p className={classes.title}>
                  There are <b>{availableTest}</b> to be assign
                </p>
                <p className={classes.subTitle}>
                  Purchase the package and assign to children
                </p>
                <SecondaryButton disabled={!hasTest} onClick={openModalAssign}>
                  Assign Now
                </SecondaryButton>
              </Grid>
            </Grid>
            <Grid>
              <div className={classes.containerTabs}>
                <div
                  className={isActive("analytic")}
                  onClick={() => changeTab("analytic")}
                >
                  Children Analytics
                </div>
                <div
                  className={isActive("history")}
                  onClick={() => changeTab("history")}
                >
                  Assign History
                </div>
              </div>
              <Outlet />
            </Grid>
          </Grid>
        </Container>
      )}

      <ModalAssignProfilingTest
        isOpen={isOpenModalTest}
        onClose={handleCloseModalTest}
        assignAbleData={assignAbleData}
        openModalConfirmationAssign={handleOpenModalConfirmation}
        assignOnTest={assignOnTest}
        checkedData={checkedData}
        handleSelectPackage={handleSelectPackage}
      />

      <ModalConfirmationAssign
        open={isOpenModalConfirmation}
        onClose={handleCloseModalConfirmation}
        assignOnTest={assignOnTest}
        handleSelectPackage={handleSelectPackage}
      />

      <ModalEditChildren
        open={isOpenModalChild}
        handleClose={() => closeModalChildren(`tab=${inTab}`)}
      />
    </div>
  );
};

export default memo(LearningProfilingCentralLayout);
