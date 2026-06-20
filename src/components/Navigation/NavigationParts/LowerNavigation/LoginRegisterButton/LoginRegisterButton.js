//React
import { Link } from "react-router-dom";

//Image
import signIcon from "../../../../../assets/logo/navbarIcon/sign-in-icon.svg";
import becomeMemberIcon from "../../../../../assets/logo/navbarIcon/become-member-icon.svg";

//Material UI
import { Box, Button, Typography, Grid } from "@mui/material";

const LoginRegisterButton = () => {
  return (
    <Box className="loginRegisterDiv">
      <Link href="/login">
        <a>
          <Button className="buttonAuthNavBar">
            <div className="imgAuthNavBarIcon">
              <img src={signIcon} alt="auth" />
            </div>
            <Grid container direction="column" alignItems="flex-start">
              <Typography className="titleButtonUp">ACCOUNT</Typography>
              <Typography className="titleButtonBottom">Sign In</Typography>
            </Grid>
          </Button>
        </a>
      </Link>
      <Link href="/">
        <a>
          <Button className="buttonAuthNavBar">
            <div className="imgAuthNavBarIcon">
              <img src={becomeMemberIcon} alt="become member" />
            </div>
            <Grid container direction="column" alignItems="flex-start">
              <Typography className="titleButtonUp">MEMBER</Typography>
              <Typography className="titleButtonBottom">
                Become Member
              </Typography>
            </Grid>
          </Button>
        </a>
      </Link>
    </Box>
  );
};

export default LoginRegisterButton;
