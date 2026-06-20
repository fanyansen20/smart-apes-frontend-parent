import React, { memo, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getMembershipData } from "../../../../store/membership/membershipSlice";

// MUI
import { Avatar, Grid, Skeleton, Typography } from "@mui/material";

// Components
import MemberBadge from "../../../../components/memberBadge/MemberBadge";

// Styles
import classes from "./_ProfileCard.module.scss";

/**
 * @param {{
 * data: {isLoading: boolean; userData: any};
 * type: "parent" | "children";
 * navigateToEditProfile?: () => void;
 * }} param0
 */

const ProfileCard = ({ data, type, navigateToEditProfile }) => {
  const dispatch = useDispatch();

  // #region redux state
  const membershipData = useSelector((store) => store.membership);
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (type === "parent" && !membershipData?.status) {
      dispatch(getMembershipData());
    }
  }, [data]);
  // #endregion

  return (
    <Grid xs={12} className={classes.cardContainer}>
      <Grid xs={12} className={classes.profileContainer}>
        {/* Profile Photo */}
        {data.isLoading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar
            alt={data?.userData?.full_name}
            src={data?.userData?.profile_pic}
            sx={{ width: 80, height: 80 }}
          />
        )}
        {/* Name and Detail */}
        <Grid className={classes.contentContainer}>
          {data.isLoading ? (
            <Skeleton variant="rectangular" width={130} height={24} />
          ) : (
            <Typography className={classes.name}>
              {data?.userData?.full_name}
            </Typography>
          )}
          {type === "children" && (
            <Typography className={classes.levelText}>
              {data?.userData?.level}
            </Typography>
          )}
          {type === "parent" && (
            <MemberBadge style={{ width: 25, height: 25 }} />
          )}
        </Grid>
      </Grid>
      {navigateToEditProfile && (
        <Grid xs={12} className={classes.buttonContainer}>
          <p onClick={navigateToEditProfile}>Edit Profile</p>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(ProfileCard);
