import { Fragment } from "react";

// Redux
import { useSelector } from "react-redux";

// MUI
import { Grid, Typography } from "@mui/material";

// Constants
import { memberTiers } from "../../constants/memberConstant";

// Helper
import handlerRedirectToMarketPlace from "../../helper/redirectToMarketplace";

// Styles
import classes from "./MemberBadge.module.scss";

// Assets
import { ReactComponent as ShieldIcon } from "../../assets/icons/shield.svg";

/**
 *
 * @param {{
 * style: React.CSSProperties;
 * }} param0
 * @returns
 */

const MemberBadge = ({ style }) => {
  // #region redux state
  const membershipData = useSelector((store) => store.membership);
  // #endregion

  // #region function
  const navigateToMembershipDetails = () => {
    handlerRedirectToMarketPlace("/membership/member-details", true);
  };

  const navigateToMembership = () => {
    handlerRedirectToMarketPlace("/membership", true);
  };
  // #endregion

  const activeMemberTier = memberTiers.find(
    (member) => member.title === membershipData?.memberType
  );

  return (
    <Fragment>
      {activeMemberTier ? (
        <Grid
          className={[classes.memberBadgeHeader, classes.border]}
          onClick={navigateToMembershipDetails}
        >
          <p className={classes[`memberHeading__${activeMemberTier?.title}`]}>
            {<activeMemberTier.icon style={style} className={classes.icon} />}
            {`${activeMemberTier?.title} Member`}
          </p>
        </Grid>
      ) : (
        <Grid
          className={classes.memberBadgeHeader}
          onClick={navigateToMembership}
        >
          <Typography className={classes.upgradeMemberText}>
            <ShieldIcon className={classes.icon} /> Upgrade Member
          </Typography>
        </Grid>
      )}
    </Fragment>
  );
};

export default MemberBadge;
