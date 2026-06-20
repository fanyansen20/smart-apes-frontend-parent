import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";

// Component
import HeaderNavigation from "../../components/HeaderNavigation";

// Styles
import classes from "./_Settings.module.scss";

// List Menu
const ProfileMenuList = [
  {
    label: "PERSONAL INFORMATION",
    children: [
      {
        label: "Personal Information",
        pathname: "personal-information",
      },
      { label: "Your Address", pathname: "addresses" },
    ],
  },
  {
    label: "SECURITY",
    children: [{ label: "Password and Security", pathname: "change-password" }],
  },
];

const ParentSettings = () => {
  const navigate = useNavigate();

  // #region function
  const goBack = () => {
    navigate(-1);
  };

  /**
   *
   * @param {string} pathname
   */
  const navigateToScreen = (pathname) => {
    navigate(pathname);
  };
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Settings" goBack={goBack} />
      <Container className={classes.container}>
        {ProfileMenuList.map((menu, menuIndex) => (
          <Grid xs={12} key={menuIndex} mb={3}>
            <Typography className={classes.title}>{menu.label}</Typography>
            {menu.children.map((children, childrenIndex) => (
              <Grid
                container
                xs={12}
                key={childrenIndex}
                className={classes.menuButton}
                onClick={() => navigateToScreen(children.pathname)}
              >
                <Typography>{children.label}</Typography>
                <KeyboardArrowRightRounded />
              </Grid>
            ))}
          </Grid>
        ))}
      </Container>
    </Fragment>
  );
};

export default ParentSettings;
