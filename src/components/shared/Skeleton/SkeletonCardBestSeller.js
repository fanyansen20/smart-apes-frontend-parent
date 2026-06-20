//Material UI
import { Card, Typography, Divider, Skeleton } from "@mui/material";

const SkeletonCardBestSeller = () => {
  return (
    <Card className="bestSellerCard">
      <div>
        <Skeleton variant="rectangular" width={205} height={200} />
      </div>
      <div className="Details">
        <Typography className="bestSellerCardTitle">
          <Skeleton variant="text" />
        </Typography>
        <div className="bestSellerCardScores">
          <Skeleton variant="text" />
        </div>
        <div className="bestSellerCardDiscount">
          <Skeleton variant="text" />
        </div>
        <Divider className="divider" />
        <Typography className="price">
          <Skeleton variant="text" />
        </Typography>
      </div>
    </Card>
  );
};

export default SkeletonCardBestSeller;
