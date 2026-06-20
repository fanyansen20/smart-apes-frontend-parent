import { Grid, Stack } from "@mui/material";

const FooterDetail = (props) => {
  return (
    <Grid item xs={12} md={6} lg={3} sx={{}}>
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        {props.children}
      </Stack>
    </Grid>
  );
};

export default FooterDetail;
