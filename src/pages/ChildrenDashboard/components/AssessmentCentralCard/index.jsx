import React from "react";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import classes from "./_AssessmentCentralCard.module.scss";

/**
 *
 * @param {{
 * childrenId : string
 * pathname?: string
 * }} props
 * @returns
 */

const AssessmentCentralCard = ({ childrenId, pathname }) => {
  return (
    <div className={classes.assessmentTestContent}>
      <h4>Assessment Test</h4>
      <div>
        <p>SMART APES provide you the best Assessment Central</p>
        <p> for your children. Take the test and find out now!</p>
      </div>
      <Link to={pathname || `/children/${childrenId}/assessment-central`}>
        <Button className={classes.btnAssessmentCentral}>
          Go To Assessment Central
        </Button>
      </Link>
    </div>
  );
};

export default AssessmentCentralCard;
