// material UI
// import { Container, Menu, MenuItem, Typography } from "@mui/material";
import { Container, Grid, Stack, Typography } from "@mui/material";

// image
import singapore from "../../../../assets/images/singapore.png";

// icons
import { ReactComponent as InstagramIcon } from "../../../../assets/icons/instagram.svg";
import { ReactComponent as FacebookIcon } from "../../../../assets/icons/facebook.svg";

const UpperNavigation = () => {
  return (
    <nav className="navigationUpper">
      <Container>
        <Grid container direction="row" justifyContent="space-between">
          <Stack direction="row" gap={6} alignItems="center">
            <a href={process.env.REACT_APP_MARKETPLACE_URL}>
              <Typography className="upperNavTitle">
                Back to Marketplace
              </Typography>
            </a>
            <a href={process.env.REACT_APP_SELLER_URL}>
              <Typography className="upperNavTitle">Be a Seller</Typography>
            </a>
            <Stack direction="row" gap={1.2} alignItems="center">
              <Typography className="upperNavTitle">Follow Us on </Typography>
              <InstagramIcon />
              <FacebookIcon />
            </Stack>
          </Stack>
          <Grid className="countryDiv">
            <Typography className="upperNavTitle">Country:</Typography>
            <img src={singapore} alt="singapore" />
            <Typography className="upperNavTitle">Singapore</Typography>
          </Grid>
        </Grid>
      </Container>
    </nav>
  );
};

export default UpperNavigation;
