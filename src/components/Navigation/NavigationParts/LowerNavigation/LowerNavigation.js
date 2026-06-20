//React
import { useState } from "react";
import { useLocation } from "react-router-dom";

//Helper
import Cookies from "universal-cookie";

//Material UI
import {
  Button,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

//Components
import LoginRegisterButton from "./LoginRegisterButton/LoginRegisterButton";
import UserMenu from "./UserMenu/UserMenu";
import NavigationCategories from "./NavigationCategories/NavigationCategories";

// Images
import brand from "../../../../assets/images/brand.svg";
import menuIcon from "../../../../assets/logo/navbarIcon/menu-icon-category.svg";

// Components
import SearchInput from "../../../input/SearchInput";
import { needLogoOnly } from "../../../../helper/services";

const LowerNavigation = (props) => {
  // Need Auth Context/Redux for login authentication here (remove comment if implemented)
  const cookies = new Cookies();
  const { pathname } = useLocation();
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElCategory, setAnchorElCategory] = useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleOpenCategoryMenu = (event) => {
    setAnchorElCategory(event.currentTarget);
    if (anchorElCategory !== null) {
      setAnchorElCategory(null);
    }
  };
  const handleCloseCategoryMenu = () => {
    setAnchorElCategory(null);
  };

  return (
    <>
      <AppBar position="static" className="navBar">
        <Container maxWidth={needLogoOnly(pathname) ? "xl" : "lg"}>
          <Toolbar disableGutters>
            <div className="imageLogoBrand">
              <a href={process.env.REACT_APP_MARKETPLACE_URL}>
                <img
                  src={brand}
                  alt="brand"
                  width={155}
                  className={needLogoOnly(pathname) ? "logoOnly" : undefined}
                />
              </a>
            </div>

            {!needLogoOnly(pathname) && (
              <>
                {/* Desktop Display Start */}
                <div className="desktopNav">
                  {props.search.search !== false && (
                    <>
                      <Button
                        className="categoryButton"
                        onClick={handleOpenCategoryMenu}
                      >
                        <div className="imgMenuIconNavbar">
                          <img src={menuIcon} alt="menu icon" />
                        </div>
                        <Typography className="categoryTitle">
                          Categories
                        </Typography>
                      </Button>
                    </>
                  )}
                  {props.search.search !== false && (
                    <SearchInput placeholder="Search product / store" />
                  )}
                </div>
                {!cookies.get("access_token") && <LoginRegisterButton />}
                {cookies.get("access_token") && (
                  <UserMenu search={props.search.search} />
                )}
                {/* Desktop Display End */}

                {/* Mobile Display Start */}
                <div className="mobileNav">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    // onClick={handleOpenNavMenu}
                    className="mobileCategoryButton"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                {/* Mobile Display End */}
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />
      <Drawer
        anchor="top"
        open={Boolean(anchorElCategory)}
        onClose={handleCloseCategoryMenu}
        disableScrollLock={true}
        className="drawerMenuCategory"
      >
        <NavigationCategories handleClose={handleCloseCategoryMenu} />
      </Drawer>
    </>
  );
};

export default LowerNavigation;
