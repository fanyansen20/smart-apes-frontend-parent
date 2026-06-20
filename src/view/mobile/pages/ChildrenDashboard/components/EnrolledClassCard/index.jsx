import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import ClassItem from "../ClassItem";

// Styles
import classes from "./_EnrolledClassCard.module.scss";

// Assets
import { ReactComponent as NoClass } from "../../../../../../assets/images/no-class.svg";

// Dummy data
const CLASS_DATA = [
  { title: "Math Tuition for Primary 2", date: "1 October 2023 15:00 - 16:00" },
  {
    title: "English Tuition for Primary 2",
    date: "2 October 2023 15:00 - 16:00",
  },
];

/**
 * @param {{
 * classData: [];
 * }} param0
 */

const EnrolledClassCard = ({ classData }) => {
  const navigate = useNavigate();

  // #region function
  const navigateToSeeAll = () => {
    navigate(`classes`);
  };
  // #endregion

  // for dummy purpose
  classData = CLASS_DATA;

  return (
    <div>
      <Grid className={classes.title} xs={12}>
        {/* Section Title */}
        <Grid className={classes.classTitle}>
          <Typography>Enrolled Classes</Typography>
          {classData?.length > 0 && (
            <div onClick={navigateToSeeAll} className={classes.seeMoreTitle}>
              <p>See All</p>
            </div>
          )}
        </Grid>
      </Grid>
      {classData.length > 0 ? (
        <Grid container xs={12} gap={1}>
          {/* Class List */}
          {classData?.slice(0, 3)?.map((classItem, index) => (
            <ClassItem key={index} data={classItem} />
          ))}
        </Grid>
      ) : (
        <Grid xs={12} className={classes.noClass}>
          <NoClass />
          <p>No Classes Yet</p>
        </Grid>
      )}
    </div>
  );
};

export default EnrolledClassCard;
