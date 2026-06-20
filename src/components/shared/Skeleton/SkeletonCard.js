//Material UI
import { Card, Typography, Divider, Skeleton } from "@mui/material";

const SkeletonCard = () => {
  return (
    <Card className="Card">
      <div>
        <Skeleton variant="rectangular" width={250} height={200} />
      </div>
      <div className="Details">
        <Typography className="CardTitle">
          <Skeleton variant="text" />
        </Typography>
        <div className="CardScores">
          <Skeleton variant="text" />
        </div>
        <div className="CardDiscount">
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

export default SkeletonCard;
