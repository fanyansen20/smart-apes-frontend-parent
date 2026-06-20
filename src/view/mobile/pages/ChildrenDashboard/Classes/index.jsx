import React, { Fragment, useState } from "react";

// MUI
import { Container, Grid } from "@mui/material";

// Component
import HeaderNavigation from "../../../components/HeaderNavigation";
import ClassItem from "../components/ClassItem";

// Styles
import classes from "./_Classes.module.scss";

const ChildrenDashboardClasses = () => {
  // #region useState
  const [classData] = useState([
    {
      title: "Math Tuition for Primary 2",
      date: "1 October 2023 15:00 - 16:00",
    },
    {
      title: "English Tuition for Primary 2",
      date: "2 October 2023 15:00 - 16:00",
    },
  ]);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Classes" />
      <Container className={classes.containerChildrenClasses}>
        <Grid container xs={12} gap={1}>
          {classData.map((classItem, index) => (
            <ClassItem key={index} data={classItem} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ChildrenDashboardClasses;
