// mui material
import { Grid, Skeleton } from "@mui/material";

const SkeletonTestTracker = () => {
  return (
    <Grid container direction="column" gap={2} style={{ width: "100%" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={5} direction="column">
          <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </Grid>
        <Grid item md={2}>
          <Skeleton variant="rounded" />
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between">
        <Grid item md={8}>
          <Skeleton variant="rounded" sx={{ height: "120px" }} />
        </Grid>
        <Grid item md={3.9}>
          <Skeleton variant="rounded" sx={{ height: "120px" }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SkeletonTestTracker;
