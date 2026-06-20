// React
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

// MUI
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";

// Assets
import { ReactComponent as Logo } from "../../../assets/images/brand.svg";

/**
 *
 * @param {{
 * showLogoTitle : boolean
 * isGoToLearningProfilingCentral : boolean
 * }} props
 * @returns
 */

const ChildrenNavigation = ({
  showLogoTitle,
  isGoToLearningProfilingCentral,
}) => {
  const { pathname } = useLocation();
  const { childrenId } = useParams();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [activePath, setActivePath] = useState();

  useEffect(() => {
    // Get base path url
    let fullPath = pathname.split("/");
    let currentPath = fullPath[1] ?? null;

    setActivePath(currentPath);
  }, [pathname]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //Content
  const pages = [
    // { label: "Dashboard", icon: <DashboardLogo />, path: "children" },
    // { label: "Calendar", icon: <CalendarLogo />, path: "calendar" },
    // { label: "Programs", icon: <NotificationLogo />, path: "program" },
    // { label: "Notification", icon: <NotificationLogo />, path: "notification" },
  ];

  return (
    <AppBar className="childrenNav" position="fixed">
      <Container maxWidth="xl" disableGutters>
        <Toolbar>
          <Stack direction="row" alignItems="center" gap={1}>
            <Link to="/">
              <Logo />
            </Link>

            {showLogoTitle && (
              <h4 className="title-navbar">Children Dashboard</h4>
            )}
          </Stack>

          {/* Mobile view */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <p>{page.label}</p>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop view */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
            }}
          >
            {pages.map((page, index) => (
              <Button
                className={
                  page.path === activePath ? "childNavBtnActive" : "childNavBtn"
                }
                key={index}
                startIcon={page.icon}
              >
                <p>{page.label}</p>
              </Button>
            ))}
          </Box>
          {!isGoToLearningProfilingCentral && (
            <Link to="/">
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                }}
                className="btnParent"
              >
                Go to Parent Dashboard
              </Button>
            </Link>
          )}

          {isGoToLearningProfilingCentral && (
            <Link
              to={`/children/${childrenId}/learning-profiling-central?tab=analytic`}
            >
              <Button
                sx={{
                  display: { xs: "none", md: "block" },
                }}
                className="btnParent"
              >
                Go to Learning Profile Central
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ChildrenNavigation;
