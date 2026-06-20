import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Container, Grid, Typography } from "@mui/material";

// Component
import CalendarComp from "../../../../../components/calendar/CalendarComp";
import HeaderNavigation from "../../../components/HeaderNavigation";

// Helper
import { format } from "date-fns";

// Styles
import classes from "./_Calendar.module.scss";

const ChildrenDashboardCalendar = () => {
  const navigation = useNavigate();

  // #region useState
  const [selectedDate] = useState([new Date()]);
  const [activity] = useState([
    {
      type: "Enrolled Classes",
      title: "English Tuition for Secondary 2",
      date: "1 October 2024 15:00 - 16:00",
    },
    {
      type: "SMART APES Event",
      title: "English Tuition for Primary 2",
      date: "2 October 2023 15:00 - 16:00",
    },
    {
      type: "E-Assessment",
      title: "English Tuition for Primary 2",
      date: "3 October 2023 15:00 - 16:00",
    },
  ]);
  // #endrgion

  // #region function
  const goBack = () => {
    navigation(-1);
  };
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Calendars" goBack={goBack} />
      <Container className={classes.containerChildrenCalendar}>
        <CalendarComp selectedDate={selectedDate} />
        <Grid container xs={12} gap={1}>
          {/* Section Title */}
          <Grid item className={classes.title} xs={12}>
            <Typography>Today</Typography>
            <Typography className={classes.currentDateTitle}>
              {format(new Date(), "EEEE, dd MMMM yyyy")}
            </Typography>
          </Grid>
          {activity.map((activityItem, index) => (
            <Grid item xs={12} key={index} className={classes.cardContainer}>
              <Grid xs={12} className={classes.card}>
                <div className={classes.cardContent}>
                  <Grid
                    xs={12}
                    container
                    className={classes.cardTextContainer}
                    gap={1.5}
                  >
                    <Grid item className={classes.cardContentLeft}>
                      <h3>{activityItem.type}</h3>
                    </Grid>
                    <Grid item>
                      <h5>{activityItem.date}</h5>
                    </Grid>
                    <Grid item>
                      <h3>{activityItem.title}</h3>
                    </Grid>
                  </Grid>
                  <NavigateNextIcon />
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ChildrenDashboardCalendar;
