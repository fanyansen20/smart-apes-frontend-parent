// react
import { memo } from "react";

// mui material
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Grid, Stack } from "@mui/material";

// components
import SecondaryButton from "../../../../../../components/button/SecondaryButton";

// styles
import classes from "./_TestTrackerSection.module.scss";

// constant
import { testTrackerConstant } from "./TestTrackerConstant";

// skeleton
import SkeletonTestTracker from "../../../../../../components/shared/Skeleton/SkeletonTestTracker";

/**
 * @typedef {{
 * availableTest : number
 * assignedTest : number
 * expiredTest : number
 * }} TestTracker
 */

/**
 * @param {{
 * openModalQuickTIps : () => {}
 * openModalAccessCode : () => {}
 * dataTestTracker : TestTracker
 * isSkeleton : boolean
 * isQuickTips : boolean
 * }} param0
 * @returns
 */

const TestTrackerSection = ({
  dataTestTracker,
  openModalQuickTIps,
  openModalAccessCode,
  isQuickTips,
  isSkeleton,
}) => {
  if (isSkeleton) {
    return <SkeletonTestTracker />;
  }

  return (
    <div id="access-code-section" className={classes.containerPageTour}>
      {isQuickTips && (
        <div className={classes.tipsSection}>
          <div className={classes.titleTipsSection}>
            <h6>
              In order to use available GRIP Learning test, you have to create
              at least 1 children profile.
            </h6>
            <p>Please click the button to see explanation tips</p>
          </div>
          <SecondaryButton
            id="btn-see-quick-tips"
            onClick={openModalQuickTIps}
            fullWidth
            startIcon={<HelpOutlineIcon />}
          >
            See Quick Tips
          </SecondaryButton>
        </div>
      )}

      <Grid container justifyContent="space-between">
        <Grid item md={8} className={classes.TestTrackerSection}>
          {testTrackerConstant.map((value, key) => (
            <div key={key} className={classes.accessCodeCard}>
              <img src={value.imgUrl} alt={value.title} />
              <Stack direction="column" gap={1}>
                <Stack direction="column" gap={isQuickTips && 1}>
                  <p>{value.title}&ensp;</p>
                  <p>{value.subTitle}</p>
                </Stack>
                <h5>{dataTestTracker[value.slug]}</h5>
              </Stack>
            </div>
          ))}
        </Grid>

        <Grid item md={3.9} className={classes.redeemTestTrackerSection}>
          <h4>Redeem Access Code </h4>
          <p>Get new available GRIP Learning test</p>
          <SecondaryButton onClick={openModalAccessCode}>
            Redeem Now
          </SecondaryButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(TestTrackerSection);
