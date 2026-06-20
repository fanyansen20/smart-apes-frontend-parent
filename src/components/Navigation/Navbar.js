//React
import { Fragment } from "react";

//Material UI
import { Box } from "@mui/material";

//Components
import UpperNavigation from "./NavigationParts/UpperNavigation/UpperNavigation";
import LowerNavigation from "./NavigationParts/LowerNavigation/LowerNavigation";
import { useLocation } from "react-router-dom";
import { needLogoOnly } from "../../helper/services";
import ListMenu from "../menu/ListMenu";

const Navbar = (props) => {
  // const [openBackdrop, setOpenBackdrop] = useState(false);

  // const handleCloseBackdrop = () => {
  //   setOpenBackdrop(false);
  // };

  // const handleToggleBackdrop = () => {
  //   setOpenBackdrop(!openBackdrop);
  // };

  const { pathname } = useLocation();

  return (
    <Fragment>
      {/* <div
        className={
          "navigationWrapper " + (needLogoOnly(pathname) && "logoOnlyNavbar")
        }
      > */}
      <div className="navigationBar">
        {!needLogoOnly(pathname) && (
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <UpperNavigation />
          </Box>
        )}

        <LowerNavigation
          // handleBackdrop={handleToggleBackdrop}
          search={props}
        />
        {!needLogoOnly(pathname) && <ListMenu />}
      </div>
      {/* </div> */}
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: 9999 }}
        open={openBackdrop}
      >tes</Backdrop> */}
    </Fragment>
  );
};

export default Navbar;
