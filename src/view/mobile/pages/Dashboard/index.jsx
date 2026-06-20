// React
import React, { Fragment, useEffect, useState } from "react";
import { API } from "../../../../config/api";

// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getAllChildren } from "../../../../store/children/getAllChildren";
import { getTestTracker } from "../../../../store/profilingTest/getTestTracker";
import {
  getProfile,
  handleLogoutRedux,
  setProfile,
} from "../../../../store/user/userSlice";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Components
import PrimaryButton from "../../../../components/PrimaryButton";
import SecondaryButton from "../../../../components/button/SecondaryButton";
import Event from "../../../../components/dashboard/event/Event";
import AccountDetailsButton from "../../components/AccountDetailsButton";
import HeaderNavigation from "../../components/HeaderNavigation";
import ProfileCard from "../../components/ProfileCard";
import ChildrenItem from "./components/ChildrenItem";
import ModalQuickTips from "./components/ModalQuickTips";
import TestTracker from "./components/TestTracker";

// Helper
import Cookies from "universal-cookie";
import { useGetWalletBalanceQuery } from "../../../../api/rtkQueryApi";
import TourPage from "../../../../components/shared/TourPage";
import { intToSGD } from "../../../../helper/currency";
import usePageUrlQuery from "../../../../hooks/usePageUrlQuery";

// Hooks
import { useNavigate } from "react-router-dom";

// Styles
import classes from "./_Dashboard.module.scss";

// Constant
import { maxChildren } from "../../../../constants/children";

// Assets
import { ReactComponent as SettingsIcon } from "../../../../assets/icons/settings.svg";
import { ReactComponent as WalletIcon } from "../../../../assets/icons/wallet.svg";
import { ReactComponent as NoChild } from "../../../../assets/images/no-children.svg";
import { ReactComponent as NoEvent } from "../../../../assets/images/no-event.svg";

// Tour Page for Access Code
const tourPageTestTracker = [
  {
    target: "#access-code-section",
    disableBeacon: true,
    locale: {
      skip: <strong aria-label="skip">Skip</strong>,
      next: "Next Step",
    },
    title: "This is your test tracker",
    content:
      "In this section you can see and track all your purchased test, including your test status",
  },
  {
    locale: {
      skip: <strong aria-label="skip">Skip</strong>,
      last: "Finish",
    },
    target: "#btn-see-quick-tips",
    title: "Step how to redeem test",
    content:
      "Click this button to see more step by step guide, how to redeem your test",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // #region cookies
  const cookies = new Cookies();
  const notShowPageTour = cookies.get("disable_page_tour") === "true";
  // #endregion

  // #region state
  const [events] = useState([]);
  // #endregion

  // #region redux state
  const { children, totalResults, status } = useSelector(
    (store) => store.getAllChildren
  );

  const { dataTestTracker, status: statusTestTracker } = useSelector(
    (store) => store.resTestTrackerSlice
  );

  const user = useSelector((store) => store.user);
  const { data: walletBalance } = useGetWalletBalanceQuery(user?.userData?.id);
  // #endregion

  // #region function
  const openModalQuickTips = () => {
    navigate("?open-quick-tips=true");
  };

  const closeModalQuickTips = () => {
    navigate("/");
  };

  const closeTourPage = () => {
    navigate("");
  };

  const disablePageTour = () => {
    navigate("");
    cookies.set("disable_page_tour", true);
  };

  const navigateToRedeemCode = () => {
    navigate("/redeem-code");
  };

  const getProfileData = async () => {
    try {
      const res = await dispatch(getProfile());
      const data = unwrapResult(res);
      dispatch(setProfile(data));
    } catch (error) {
      console.error(error);
    }
  };

  const clearUserData = () => {
    //Erase access token cookie
    cookies.set("access_token", "", { path: "/", domain: "smartapes.sg" });
    cookies.set("refresh_token", "", { path: "/", domain: "smartapes.sg" });
    cookies.set("parent_id", "", { path: "/", domain: "smartapes.sg" });

    // remove cookies
    cookies.remove("disable_page_tour");

    // Local env
    if (process.env.NODE_ENV === "development") {
      cookies.set("access_token", "", { path: "/" });
      cookies.set("refresh_token", "", {
        path: "/",
      });
      cookies.set("parent_id", "", { path: "/" });
    }

    //Erase localstorage
    localStorage.clear();
  };

  const handleLogout = async () => {
    try {
      //Hit logout api
      const refreshToken = cookies.get("refresh_token");
      await API.post("/user-auth/logout", {
        refresh_token: refreshToken,
      });

      // Clear cache & localstorage
      clearUserData();
      dispatch(handleLogoutRedux());

      navigate("/unauthenticated");
    } catch (error) {
      if (error.response.status === 404) {
        clearUserData();
        navigate("/unauthenticated");
      }
    }
  };

  // navigation
  const navigateToAddChildren = () => {
    navigate("/children/add");
  };

  const navigateToChildren = () => {
    navigate("/children");
  };

  const navigateToSettings = () => {
    navigate("/settings");
  };

  const navigateToWallet = () => {
    navigate("/wallet");
  };
  // #endregion

  // #region condition
  const isGetChild =
    statusTestTracker === "idle" || statusTestTracker === "loading";

  const isOpenModalQuickTips =
    usePageUrlQuery().get("open-quick-tips") === "true";

  const isRunTourPage =
    dataTestTracker.assignedTest < 1 && !isOpenModalQuickTips;

  const isTourPage =
    usePageUrlQuery().get("is-tour-page") === "true" && !notShowPageTour;
  // #endregion

  // #region useEffect
  useEffect(() => {
    getProfileData();

    if (totalResults === 0 && status === "idle") {
      dispatch(getAllChildren());
    }

    if (statusTestTracker === "idle") {
      dispatch(getTestTracker({ providerName: "Grip Learning" }));
    }

    // dispatch(getWalletBalance());
  }, []);

  useEffect(() => {
    navigate("");

    if (isRunTourPage && !notShowPageTour) {
      navigate("?is-tour-page=true");
    }
  }, [isGetChild]);

  // disable body scroll when tour page is open
  useEffect(() => {
    if (isTourPage) {
      document.body.style.overflow = "hidden";
    } else {
      window.scrollTo(0, 0);
      document.body.style.overflow = "auto";
    }
  }, [isTourPage]);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Profile" />
      <Container>
        <Grid
          container
          className={classes.content}
          sx={{
            paddingLeft: "20px !important",
            paddingRight: "20px !important",
          }}
        >
          <TourPage
            closeTourPage={closeTourPage}
            disablePageTour={disablePageTour}
            disableScrollParentFix
            steps={tourPageTestTracker}
            run={isTourPage}
            continuous
            disableBeacon
            disableOverlayClose
            disableCloseOnEsc
            hideBackButton
            hideCloseButton
            showSkipButton
          />
          <ProfileCard data={user} type="parent" />

          <TestTracker
            dataTestTracker={dataTestTracker}
            isSkeleton={isGetChild}
            openModalQuickTips={openModalQuickTips}
            isQuickTips={dataTestTracker.assignedTest < 1}
            navigateToRedeemCode={navigateToRedeemCode}
          />

          <Grid className={classes.title} xs={12}>
            <div className={classes.dashboardEventTitle}>
              <Typography>Upcoming Events</Typography>
              <p className={classes.dashboardAllEvents}>See More</p>
            </div>
          </Grid>
          <Grid xs={12}>
            <Grid container spacing={1}>
              {events.length ? (
                events?.map((item, index) => (
                  <Grid item key={index} xs={12}>
                    <Event data={item} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <div
                    className={
                      (classes.dashboardEventWrapper, classes.dashboardNoEvent)
                    }
                  >
                    <NoEvent width="70%" />
                    <p>No Upcoming Event</p>
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid className={classes.title} xs={12}>
            <Grid container className={classes.dashboardEventTitle}>
              <Typography>{`My Children (${totalResults}/${maxChildren})`}</Typography>
              {totalResults > 0 && (
                <div
                  onClick={navigateToChildren}
                  className={classes.dashboardChildTitle}
                >
                  <p>See More</p>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Grid container columnSpacing={3} rowSpacing={2}>
              {totalResults ? (
                <Grid item md={12} xs={12}>
                  {children?.slice(0, 3)?.map((item, index) => (
                    <ChildrenItem key={index} data={item} type={1} />
                  ))}
                </Grid>
              ) : (
                <Grid item md={12} xs={12}>
                  <div className={classes.dashboardNoChild}>
                    <NoChild width="70%" />
                    <h3>No Children Profile Yet</h3>
                    <h5>
                      You need to create a new children profile. Click this
                      button
                    </h5>

                    <PrimaryButton
                      className={classes.button}
                      onClick={navigateToAddChildren}
                      fullWidth
                    >
                      Add New Child
                    </PrimaryButton>
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        <ModalQuickTips
          openModal={isOpenModalQuickTips}
          closeModal={closeModalQuickTips}
        />
      </Container>
      <Grid
        xs={12}
        className={classes.accountDetailContainer}
        sx={{
          paddingLeft: "40px !important",
          paddingRight: "40px !important",
        }}
      >
        <Grid className={classes.title} xs={12}>
          <Typography>Account Details</Typography>
        </Grid>
        <AccountDetailsButton
          title="Wallet"
          value={intToSGD(walletBalance?.balance)}
          icon={<WalletIcon />}
          onClick={navigateToWallet}
        />
        <AccountDetailsButton
          title="Settings"
          icon={<SettingsIcon />}
          onClick={navigateToSettings}
        />
        <SecondaryButton onClick={handleLogout} fullWidth>
          Logout
        </SecondaryButton>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;
