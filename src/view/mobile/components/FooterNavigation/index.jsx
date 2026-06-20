import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

// Helper
import redirectToMarketPlace from "../../../../helper/redirectToMarketplace";

// Cookiees
import Cookies from "universal-cookie";

// Styles
import classes from "./FooterNavbar.module.scss";

// Assets
import HomeActiveIcon from "../../../../assets/icons/home-active.svg";
import HomeIcon from "../../../../assets/icons/home-outlined.svg";
import OrderActiveIcon from "../../../../assets/icons/order-active.svg";
import OrderIcon from "../../../../assets/icons/order.svg";
import ProfileActiveIcon from "../../../../assets/icons/profile-active.svg";
import ProfileIcon from "../../../../assets/icons/profile-outlined.svg";
import WishlistActiveIcon from "../../../../assets/icons/wishlist-active.svg";
import WishlistIcon from "../../../../assets/icons/wishlist-outlined.svg";

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
    value: "order-list",
    label: "Order",
    iconSrc: OrderIcon,
    iconActiveSrc: OrderActiveIcon,
    imageProps: {
      width: 19,
      height: 19,
    },
  },
  {
    sx: bottomNavigationActionStyles,
    value: "wishlist",
    label: "Wishlist",
    iconSrc: WishlistIcon,
    iconActiveSrc: WishlistActiveIcon,
  },
  {
    sx: bottomNavigationActionStyles,
    value: "",
    label: "Profile",
    iconSrc: ProfileIcon,
    iconActiveSrc: ProfileActiveIcon,
  },
];

export const urlGoToMarketplace = {
  home: "",
  wishlist: "wishlist",
};

function FooterNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();

  const isLogin = cookies.get("access_token");

  /**
   * @param {'home' | 'orders' | 'wishlist' } value
   */
  const changeBottomNavigation = (value) => {
    const isMarketplaceUrl = value === "home" || value === "wishlist";

    if (!isLogin) {
      return navigate("/unauthenticated");
    }

    if (isMarketplaceUrl) {
      return redirectToMarketPlace(urlGoToMarketplace[value], true);
    }

    return navigate(`/${value}`);
  };

  return (
    <Paper className={classes.footerNavbar} elevation={3}>
      <BottomNavigation
        showLabels
        value={location.pathname.split("/")[1]}
        onChange={(_, value) => changeBottomNavigation(value)}
      >
        {menuNavigation.map(
          ({ iconSrc, iconActiveSrc, imageProps, value, ...otherProps }) => (
            <BottomNavigationAction
              {...otherProps}
              value={value}
              key={value}
              icon={
                <img
                  src={
                    location.pathname.split("/")[1] === value
                      ? iconActiveSrc
                      : iconSrc
                  }
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

export default FooterNavigation;
