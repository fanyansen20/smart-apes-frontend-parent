import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Container, Grid } from "@mui/material";

// Components
import HeaderNavigation from "../../../components/HeaderNavigation";

// Styles
import classes from "./_Event.module.scss";

const ChildrenDashboardEvent = () => {
  const navigate = useNavigate();

  // #region useState
  const [events] = useState([
    {
      type: "SMART APES Event",
      title: "Science Mock Exam Secondary 2 Assessment Test",
      thumbnail:
        "https://unsplash.com/photos/POMpXtcVYHo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Z3JhbW1hcnxlbnwwfHx8fDE2OTcwNDUwMDJ8MA&force=true&w=640",
    },
    {
      type: "SMART APES Event",
      title: "Science Mock Exam Secondary 2 Assessment Test",
      thumbnail:
        "https://unsplash.com/photos/8QrPJ3Kfie4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjk3MDc4MDU4fA&force=true&w=640",
    },
  ]);
  // #endregion

  // #region function
  const goBack = () => {
    navigate(-1);
  };
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Events" goBack={goBack} />
      <Container className={classes.containerChildrenEvent}>
        <Grid container xs={12} gap={1}>
          {events.map((eventItem, index) => (
            <Grid item xs={12} key={index} className={classes.cardContainer}>
              <Grid xs={12} className={classes.card}>
                <img src={eventItem.thumbnail} alt={eventItem.title} />
                <Grid container className={classes.cardTextContainer} gap={1}>
                  <Grid item>
                    <h5>{eventItem.type}</h5>
                  </Grid>
                  <Grid item>
                    <h3>{eventItem.title}</h3>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ChildrenDashboardEvent;
