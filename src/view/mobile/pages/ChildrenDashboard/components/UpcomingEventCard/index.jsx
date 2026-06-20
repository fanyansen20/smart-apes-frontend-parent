import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_UpcomingEventCard.module.scss";

// Dummy Data
const UPCOMINGEVENT_DATA = [
  { title: "Math Tuition for Primary 2", date: "1 October 2023 15:00 - 16:00" },
  {
    title: "English Tuition for Primary 2",
    date: "2 October 2023 15:00 - 16:00",
  },
];

/**
 * @param {{
 * upcomingEventData: [];
 * }} param0
 */

const UpcomingEventCard = ({ upcomingEventData }) => {
  // for dummy purpose
  upcomingEventData = UPCOMINGEVENT_DATA;

  return (
    <div>
      <Grid className={classes.title} xs={12}>
        {/* Section Title */}
        <Grid className={classes.upcomingEventTitle}>
          <Typography>Upcoming Events</Typography>
        </Grid>
      </Grid>
      {upcomingEventData.length > 0 ? (
        <Grid container xs={12} gap={1}>
          {/* Upcoming Event List */}
          {upcomingEventData.map((eventItem, index) => (
            <Grid
              item
              key={index}
              xs={12}
              className={classes.classCardContainer}
            >
              <Grid xs={12} className={classes.classCard}>
                <div className={classes.classCardContent}>
                  <Grid
                    xs={12}
                    container
                    className={classes.classCardTextContainer}
                    gap={1.5}
                  >
                    <Grid item>
                      <h5>{eventItem.date}</h5>
                    </Grid>
                    <Grid item className={classes.classCardContentLeft}>
                      <h3>{eventItem.title}</h3>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid xs={12} className={classes.noClass}>
          <p>No Upcoming Event</p>
        </Grid>
      )}
    </div>
  );
};

export default UpcomingEventCard;
