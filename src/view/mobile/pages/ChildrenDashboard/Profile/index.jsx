import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { getChildrenProfile } from "../../../../../store/user/childSlice";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Component
import AccountDetailsButton from "../../../components/AccountDetailsButton";
import HeaderNavigation from "../../../components/HeaderNavigation";
import ProfileCard from "../../../components/ProfileCard";
import UpcomingEventCard from "../components/UpcomingEventCard";

// Styles
import classes from "./_Profile.module.scss";

// Assets
import { ReactComponent as ActivityIcon } from "../../../../../assets/icons/activity-2.svg";
import { ReactComponent as CalendarIcon } from "../../../../../assets/icons/calendar-3.svg";
import { ReactComponent as EventIcon } from "../../../../../assets/icons/event.svg";
import { ReactComponent as ProfileIcon } from "../../../../../assets/icons/profile-2.svg";

const ChildrenDashboardProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { childrenId } = useParams();

  // #region useState
  const [profile, setProfile] = useState();
  // #endregion

  // #region fetch function
  const getProfile = async () => {
    const res = await dispatch(getChildrenProfile(childrenId));
    setProfile(res.payload);
  };
  // #endregion

  // #region function
  const navigateToCalendar = () => {
    navigate("calendars");
  };

  const naviteToEvent = () => {
    navigate("events");
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    getProfile();
  }, []);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Profile" />
      <Container className={classes.containerChildrenProfile}>
        <Grid container direction="column">
          <ProfileCard
            data={{ isLoading: !profile, userData: profile }}
            type="children"
          />
          <UpcomingEventCard />
        </Grid>
      </Container>
      <Grid
        xs={12}
        className={classes.accountDetailContainer}
        sx={{
          paddingLeft: "20px !important",
          paddingRight: "20px !important",
        }}
      >
        <Grid className={classes.title} xs={12}>
          <Typography>Account Details</Typography>
        </Grid>
        <AccountDetailsButton
          title="Calendars"
          icon={<CalendarIcon />}
          onClick={navigateToCalendar}
        />
        <AccountDetailsButton
          title="Events"
          icon={<EventIcon />}
          onClick={naviteToEvent}
        />
        <AccountDetailsButton title="Programs" icon={<ActivityIcon />} />
        <AccountDetailsButton
          title="Personal Information"
          icon={<ProfileIcon />}
        />
      </Grid>
    </Fragment>
  );
};

export default ChildrenDashboardProfile;
