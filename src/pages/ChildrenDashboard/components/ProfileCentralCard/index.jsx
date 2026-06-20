import React from "react";

// component
import { Button } from "@mui/material";

// style
import classes from "./_ProfileCentralCard.module.scss";

// hooks
import useRedirectToLearningProfilingCentral from "../../../../hooks/children/useRedirectToLearningProfilingCentral";

/**
 * @param {{
 * childrenId : string
 * }} props
 * @returns
 */
const ProfileCentralCard = ({ childrenId }) => {
  const { handleRedirectToLearningProfileCentral } =
    useRedirectToLearningProfilingCentral(childrenId);

  return (
    <div className={classes.learningProfileContent}>
      <h4>Learning Profile</h4>
      <div>
        <p>Discover your child’s personality! Take the learning</p>
        <p>test now to unlock your child`s potential!</p>
      </div>
      <Button
        onClick={handleRedirectToLearningProfileCentral}
        className={classes.btnProfileCentral}
      >
        Go To Profile Central
      </Button>
    </div>
  );
};

export default ProfileCentralCard;
