// React
import { memo } from "react";

// MUI
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Grid, Stack } from "@mui/material";

// Components
import SecondaryButton from "../../../../../../components/button/SecondaryButton";
import SkeletonTestTracker from "../../../../../../components/shared/Skeleton/SkeletonTestTracker";

// Styles
import classes from "./_TestTrackerSection.module.scss";

// Constant
import { testTrackerConstant } from "./TestTrackerConstant";

/**
 * @typedef {{
 * availableTest : number
 * assignedTest : number
 * expiredTest : number
 * }} TestTracker
 */

/**
 * @param {{
 * openModalQuickTips : () => void
 * dataTestTracker : TestTracker
 * isSkeleton : boolean
 * isQuickTips : boolean
 * navigateToRedeemCode: () => void
 * }} param0
 * @returns
 */

const TestTrackerSection = ({
  dataTestTracker,
  openModalQuickTips,
  isQuickTips,
  isSkeleton,
  navigateToRedeemCode,
}) => {
  if (isSkeleton) {
    return <SkeletonTestTracker />;
  }

  return (
    <div className={classes.containerPageTour}>
      {isQuickTips && (
        <div id="btn-see-quick-tips" className={classes.tipsSection}>
          <div className={classes.titleTipsSection}>
            <h6>
              In order to use available GRIP Learning test, you have to create
              at least 1 children profile.
            </h6>
            <p>Please click the button to see explanation tips</p>
          </div>
          <SecondaryButton
            onClick={openModalQuickTips}
            fullWidth
            startIcon={<HelpOutlineIcon />}
          >
            See Quick Tips
          </SecondaryButton>
        </div>
      )}
      <Grid xs={12} className={classes.redeemTestTrackerSection}>
        <h4>Redeem Access Code </h4>
        <p>Get new available GRIP Learning test</p>
        <SecondaryButton onClick={navigateToRedeemCode}>
          Redeem Now
        </SecondaryButton>
      </Grid>

      <Grid
        id="access-code-section"
        xs={12}
        className={classes.TestTrackerSection}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {testTrackerConstant.map((value, key) => (
          <div key={key} className={classes.accessCodeCard}>
            <img src={value.imgUrl} alt={value.title} />
            <Stack direction="column" gap={1}>
              <Stack direction="row" gap={isQuickTips && 1}>
                <p>
                  {value.title} {value.subTitle}
                </p>
              </Stack>
              <h5>{dataTestTracker[value.slug]}</h5>
            </Stack>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default memo(TestTrackerSection);
