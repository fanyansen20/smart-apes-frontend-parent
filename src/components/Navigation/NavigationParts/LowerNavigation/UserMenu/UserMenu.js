//React
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { API } from "../../../../../config/api";

//Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getMembershipData } from "../../../../../store/membership/membershipSlice";
import {
  getProfile,
  handleLogoutRedux,
  setProfile,
} from "../../../../../store/user/userSlice";

//Material UI
import {
  // Button,
  // Grid,
  Avatar,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";

// icon MUI
import {
  AccountBalanceWallet,
  FavoriteBorder,
  Login,
  Logout,
  Person,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// images
// import becomeMemberIcon from "../../../../../assets/logo/navbarIcon/become-member-icon.svg";
// import memberIcon from "../../../../../assets/logo/navbarIcon/member-icon.svg";
import cartIcon from "../../../../../assets/logo/navbarIcon/carts.svg";

// helper
import handlerRedirectToMarketPlace from "../../../../../helper/redirectToMarketplace";

const UserMenu = (props) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [quantityCart, setQuantityCart] = useState(0);
  const location = useLocation();

  // Redux
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const membership = useSelector((store) => store?.membership);
  // const statusMember = membership?.status;

  useEffect(() => {
    if (!membership?.status) {
      dispatch(getMembershipData());
    }
  }, [cookies.access_token]);

  // Get cart
  const fetchCart = useCallback(async () => {
    try {
      const response = await API.get("/carts/total-qty");
      const { total_qty: totalQuantity } = response.data;
      setQuantityCart(totalQuantity);
    } catch (error) {
      return error;
    }
  }, []);

  // Get profile
  const getProfileData = async () => {
    try {
      const res = await dispatch(getProfile());
      const data = unwrapResult(res);
      dispatch(setProfile(data));
    } catch (error) {
      console.error(error);
    }
  };

  // Get data on mount
  useEffect(() => {
    fetchCart();
    getProfileData();
  }, [cookies.access_token, fetchCart]);

  // Close dropdown
  useEffect(() => {
    setAnchorElUser(null);
  }, [location.pathname]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Clear user data
  const clearUserData = () => {
    //Erase access token cookie
    cookies.set("access_token", "", { path: "/", domain: "smartapes.sg" });
    cookies.set("refresh_token", "", { path: "/", domain: "smartapes.sg" });
    cookies.set("parent_id", "", { path: "/", domain: "smartapes.sg" });

    // remove cookies
    cookies.remove("disable_page_tour");

    // Local env
    if (process.env.NODE_ENV === "development") {
      cookies.set("access_token", "", { path: "/" });
      cookies.set("refresh_token", "", {
        path: "/",
      });
      cookies.set("parent_id", "", { path: "/" });
    }

    //Erase localstorage
    localStorage.clear();
  };

  // Sign out, clear token cookie
  const handleLogout = async () => {
    try {
      //Hit logout api
      const refreshToken = cookies.get("refresh_token");
      await API.post("/user-auth/logout", {
        refresh_token: refreshToken,
      });

      // Clear cache & localstorage
      clearUserData();
      dispatch(handleLogoutRedux());

      navigate("/unauthenticated");
    } catch (error) {
      console.error(error);
      if (error.response.status === 404) {
        clearUserData();
        navigate("/unauthenticated");
      }
    }
  };

  return (
    <div className="menus">
      {props.search !== false && (
        <a className="cartDiv" href={handlerRedirectToMarketPlace("/cart")}>
          <div className="cartImageIcon">
            <img src={cartIcon} alt="cart icon" />
          </div>
          <div className="divider"></div>
          {quantityCart > 0 && (
            <span className="cartNumber">
              {quantityCart > 99 ? "99+" : quantityCart}
            </span>
          )}
        </a>
      )}

      <div onClick={handleOpenUserMenu} className="userMenu">
        {user.isLoading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar
            alt={user?.userData?.full_name}
            src={user?.userData?.profile_pic}
          />
        )}
        <KeyboardArrowDownIcon className="iconArrowDown" />
      </div>

      {/* {statusMember === "ACTIVE" ? (
        <a href={handlerRedirectToMarketPlace("/membership/member-details")}>
          <Button className="buttonMember">
            <div className="imgAuthNavBarIcon">
              <img src={memberIcon} alt="member icon" />
            </div>
            <Grid container direction="column" alignItems="flex-start">
              <Typography className="titleButtonBottom">
                Go to Member Page
              </Typography>
            </Grid>
          </Button>
        </a>
      ) : (
        <a href={handlerRedirectToMarketPlace("/membership")}>
          <Button className="buttonBecomeMember">
            <div className="imgAuthNavBarIcon">
              <img src={becomeMemberIcon} alt="become member" />
            </div>
            <Grid container direction="column" alignItems="flex-start">
              <Typography className="titleButtonBottom">
                Become Member
              </Typography>
            </Grid>
          </Button>
        </a>
      )} */}

      {/* modal menu item */}
      <Menu
        className="menuUser"
        sx={{ mt: "45px", zIndex: 9000 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        disableScrollLock={true}
      >
        <MenuItem className="userList" disableTouchRipple divider>
          <div className="user">
            {user.isLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                alt={user?.userData?.full_name}
                src={user?.userData?.profile_pic}
              />
            )}
            <div className="profile">
              {user.isLoading ? (
                <Skeleton variant="rectangular" width={130} height={24} />
              ) : (
                <Typography className="name">
                  {user?.userData?.full_name}
                </Typography>
              )}
              {/* <Typography className="rank">Gold Member</Typography> */}
            </div>
          </div>
        </MenuItem>
        <a href={handlerRedirectToMarketPlace()}>
          <MenuItem className="menuItem" divider>
            <div className="menuList">
              <Typography textAlign="center">Go To Marketplace</Typography>
              <Login />
            </div>
          </MenuItem>
        </a>
        <Link to="/profile">
          <MenuItem className="menuItem" divider>
            <div className="menuList">
              <Person />
              <Typography textAlign="center">My Profile</Typography>
            </div>
          </MenuItem>
        </Link>
        <Link to="/order-list">
          <MenuItem className="menuItem" divider>
            <div className="menuList">
              <AccountBalanceWallet />
              <Typography textAlign="center">Orders</Typography>
            </div>
          </MenuItem>
        </Link>

        <a href={handlerRedirectToMarketPlace("/wishlist")}>
          <MenuItem className="menuItem" divider>
            <div className="menuList">
              <FavoriteBorder />
              <Typography textAlign="center">Wishlist</Typography>
            </div>
          </MenuItem>
        </a>
        {/* <MenuItem className="menuItem" divider>
          <div className="menuList">
            <NotificationsNone />
            <Typography textAlign="center">Notifications</Typography>
          </div>
        </MenuItem> */}
        <MenuItem className="menuItem" onClick={handleLogout}>
          <div className="menuList">
            <Logout />
            <Typography textAlign="center">Logout</Typography>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
