import React, { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getTestProduct } from "../../../../store/profilingTest/getTestProduct";
import { getTestTracker } from "../../../../store/profilingTest/getTestTracker";
import { getChildrenProfile } from "../../../../store/user/childSlice";

// MUI
import { Avatar, Container, Grid, Typography } from "@mui/material";

// Components
import SecondaryButton from "../../../../components/button/SecondaryButton";
import HeaderNavigation from "../../components/HeaderNavigation";
import TopTabNavigation, {
  TopTabPanel,
} from "../../components/TopTabNavigation";
import AssignHistory from "./AssignHistory";
import ChildrenAnalytics from "./ChildrenAnalytics";
import PackageList from "./components/PackageList";

// Helper
import { dateFormatter } from "../../../../helper/dateFormat";
import useChangeTabsProfilingCentral from "../../../../hooks/learningProfilingCentral/useChangeTabsProfilingCentral";

// Style
import classes from "./_ProfilingCentral.module.scss";

// Assets
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/calendar-4.svg";
import { ReactComponent as ProfileIcon } from "../../../../assets/icons/profile-3.svg";
import ProfileBannerIllustration from "../../../../assets/images/ChildrenDashboard/illustration-banner-profile-child-mobile.svg";

const LearningProfilingCentral = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { childrenId } = useParams();

  // #region Hooks
  const { inTab, changeTab } = useChangeTabsProfilingCentral();
  // endregion

  // #region redux state
  const { dataTestTracker, status: statusTestTracker } = useSelector(
    (store) => store.resTestTrackerSlice
  );
  const { status, childData } = useSelector((store) => store.child);
  const { status: productProfilingTestStatus } = useSelector(
    (store) => store.productProfilingTest
  );
  // #endregion

  // #region function
  const goBack = () => {
    navigate(`/children/${childrenId}`);
  };

  const navigateToEditProfile = () => {
    navigate(`/children/${childrenId}/edit`);
  };

  const navigateToAssignTest = () => {
    navigate(`/children/${childrenId}/learning-profiling-central/assign-test`);
  };
  // #endregion

  // #region data
  const availableTest = dataTestTracker.availableTest;

  const {
    full_name: childName,
    profile_pic: profileChild,
    level: childLevel,
    dob: birthDate,
    gender: childGender,
  } = childData || {};
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (status === "idle") {
      dispatch(getChildrenProfile(childrenId));
    }

    if (statusTestTracker === "idle") {
      dispatch(getTestTracker({ providerName: "Grip Learning" }));
    }

    if (productProfilingTestStatus === "idle") {
      dispatch(getTestProduct());
    }
  }, []);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Go To Children Dashboard" goBack={goBack} />
      <Grid>
        <Grid xs={12} className={classes.bannerProfileChild}>
          <img src={ProfileBannerIllustration} />
        </Grid>
        <Container>
          <Grid xs={12} className={classes.imageProfileSection}>
            <Avatar src={profileChild} className={classes.avatarProfile} />
            <SecondaryButton onClick={navigateToEditProfile}>
              Edit Profile
            </SecondaryButton>
          </Grid>
          <Grid container xs={12} gap={1}>
            <Grid item xs={12} className={classes.nameContainer}>
              <Typography className={classes.childName}>{childName}</Typography>
              <Typography className={classes.childLevel}>
                {childLevel}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              gap={1}
              display="flex"
              alignItems="center"
              className={classes.childDetailContainer}
            >
              <CalendarIcon />
              <Typography className={classes.childDetailText}>
                {dateFormatter({
                  date: birthDate,
                  formatting: "MMMM, do. yyyy",
                })}
              </Typography>
              <Typography className={classes.childDetailText}>|</Typography>
              <ProfileIcon />
              <Typography className={classes.childDetailText}>
                {childGender}
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} className={classes.assignCard}>
            <Typography className={classes.title}>
              There are <b>{availableTest > 0 ? availableTest : "no test"}</b>{" "}
              to be assign
            </Typography>
            <Typography className={classes.subTitle}>
              Purchase the package and assign to children
            </Typography>
            <SecondaryButton
              fullWidth
              disabled={!(availableTest > 0)}
              onClick={navigateToAssignTest}
            >
              Assign Now
            </SecondaryButton>
          </Grid>
        </Container>
      </Grid>
      <Container className={classes.container}>
        <TopTabNavigation
          tabList={[
            { title: "Children Analytics", value: "analytic" },
            { title: "Assign History", value: "history" },
          ]}
          variant="fullWidth"
          selectedTab={inTab}
          onChange={changeTab}
        >
          <TopTabPanel value="analytic" selectedTab={inTab}>
            <Container>
              <ChildrenAnalytics />
            </Container>
          </TopTabPanel>
          <TopTabPanel value="history" selectedTab={inTab}>
            <AssignHistory />
            <PackageList />
          </TopTabPanel>
        </TopTabNavigation>
      </Container>
    </Fragment>
  );
};

export default LearningProfilingCentral;
