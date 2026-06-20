import React from "react";

// MUI
import { Avatar, Grid, LinearProgress, Typography } from "@mui/material";

// Styles
import classes from "./_CourseCard.module.scss";

/**
 * @typedef {{
 * thumbnail: string;
 * title: string;
 * level: string;
 * totalLesson: number;
 * time: number;
 * progress: number;
 * }} Course
 */

/**
 * @param {{
 * courses: Course[];
 * seeMore: () => void;
 * }} param0
 */

const CourseCard = ({ courses, seeMore }) => {
  return (
    <div>
      <Grid className={classes.title} xs={12}>
        {/* Section Title */}
        <Grid container className={classes.courseTitle}>
          <Typography>Your Courses</Typography>
          {courses?.length > 0 && (
            <div onClick={seeMore} className={classes.seeMoreTitle}>
              <p>See All</p>
            </div>
          )}
        </Grid>
      </Grid>
      {courses?.length > 0 ? (
        <Grid container xs={12} gap={1}>
          {/* Course List */}
          {courses?.slice(0, 2)?.map((item, index) => {
            return (
              <Grid
                item
                key={index}
                xs={12}
                className={classes.courseContainer}
              >
                {/* Course Thumbnail */}
                <Avatar
                  alt={item?.title}
                  src={item?.thumbnail}
                  sx={{ width: 80, height: 80 }}
                  variant="rounded"
                  style={{ borderRadius: 8 }}
                />
                {/* Course Detail */}
                <Grid xs={12} className={classes.contentContainer}>
                  <Typography className={classes.name}>
                    {item?.title}
                  </Typography>
                  <Typography
                    className={classes.time}
                  >{`${item?.totalLesson} | ${item?.time}`}</Typography>
                  <div className={classes.progressCourse}>
                    <LinearProgress
                      className={classes.progressBar}
                      variant="determinate"
                      value={item.progress}
                    />
                    <p>{item?.progress}%</p>
                  </div>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid xs={12} className={classes.noClass}>
          <p>No Courses Yet</p>
        </Grid>
      )}
    </div>
  );
};

export default CourseCard;
