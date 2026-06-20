import { Card, Typography, Grid } from "@mui/material";

const FooterCard = (props) => {
  return (
    <Card className="footer-card">
      <Grid container className="footer-container">
        {props.children}
        <Grid item md={12} lg={12} className="copyright-block">
          <Typography className="copyright-text" variant="h6">
            © 2022 Smart Apes. All Right Reserved
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FooterCard;
