import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

// Styles
import classes from "./_ChildrenFooterNavigation.module.scss";

// Assets
import AssessmentActiveIcon from "../../../../assets/icons/assessment-active.svg";
import AssessmentIcon from "../../../../assets/icons/assessment-outlined.svg";
import ClassesActiveIcon from "../../../../assets/icons/classes-active.svg";
import ClassesIcon from "../../../../assets/icons/classes-outlined.svg";
import HomeActiveIcon from "../../../../assets/icons/home-active.svg";
import HomeIcon from "../../../../assets/icons/home-outlined.svg";
import ProfileActiveIcon from "../../../../assets/icons/profile-active.svg";
import ProfileIcon from "../../../../assets/icons/profile-outlined.svg";

const bottomNavigationActionStyles = {
  ".MuiBottomNavigationAction-label.Mui-selected": {
    fontSize: "0.75rem",
  },
};

export const menuNavigation = [
  {
    sx: bottomNavigationActionStyles,
    value: "home",
    label: "Home",
    iconSrc: HomeIcon,
    iconActiveSrc: HomeActiveIcon,
  },
  {
    sx: bottomNavigationActionStyles,
    value: "classes",
    label: "Classes",
    iconSrc: ClassesIcon,
    iconActiveSrc: ClassesActiveIcon,
    imageProps: {
      width: 19,
      height: 19,
    },
  },
  {
    sx: bottomNavigationActionStyles,
    value: "assessment-central",
    label: "Assessment",
    iconSrc: AssessmentIcon,
    iconActiveSrc: AssessmentActiveIcon,
  },
  {
    sx: bottomNavigationActionStyles,
    value: "profile",
    label: "Profile",
    iconSrc: ProfileIcon,
    iconActiveSrc: ProfileActiveIcon,
  },
];

function ChildrenFooterNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // #region useState
  const [activeBottomTab, setActiveBottomTab] = useState("home");
  // #endregion

  // #region function
  /**
   * @param {string} value
   */
  const handleNavigate = (value) => {
    let pathnameArray = location.pathname?.split("/");

    let childrenDashboardPath = pathnameArray.slice(0, 3).join("/");
    if (value !== "home") {
      childrenDashboardPath += `/${value}`;
    }
    navigate(childrenDashboardPath);
  };

  /**
   * check current path and set active bottom tab value
   *
   * @param {string} pathname
   */
  const handleActiveBottomTab = (pathname) => {
    let pathnameArray = pathname?.split("/");
    if (pathnameArray?.length) {
      let currentMenu = menuNavigation.find(
        (el) => el.value === pathnameArray[3] // classes / assessment / profile
      );
      setActiveBottomTab(currentMenu ? currentMenu.value : "home");
    }
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    handleActiveBottomTab(location.pathname);
  }, [location.pathname]);
  // #endregion

  return (
    <Paper className={classes.footerNavbar} elevation={3}>
      <BottomNavigation
        showLabels
        value={activeBottomTab}
        onChange={(_, newValue) => {
          if (typeof newValue === "string" && activeBottomTab !== newValue) {
            handleNavigate(newValue);
            setActiveBottomTab(newValue);
          }
        }}
      >
        {menuNavigation.map(
          ({ iconSrc, iconActiveSrc, imageProps, value, ...otherProps }) => (
            <BottomNavigationAction
              {...otherProps}
              value={value}
              key={value}
              icon={
                <img
                  src={activeBottomTab === value ? iconActiveSrc : iconSrc}
                  width={18}
                  height={18}
                  alt="navigation-icon"
                  {...(imageProps || {})}
                />
              }
            />
          )
        )}
      </BottomNavigation>
    </Paper>
  );
}

export default ChildrenFooterNavigation;
