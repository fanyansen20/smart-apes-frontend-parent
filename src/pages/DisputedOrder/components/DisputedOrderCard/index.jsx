import { Fragment, memo, useState } from "react";

// styles
import classes from "./_DisputedOrderCard.module.scss";

// Mui Material
import {
  Card,
  CardContent,
  Collapse,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// assets
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactComponent as StoreIcon } from "../../../../assets/icons/store.svg";

// Component
import ColoredLabel from "../../../../components/ColoredLabel";
import PrimaryButton from "../../../../components/PrimaryButton";
import TextButton from "../../../../components/TextButton";
import LinkText from "../../../../components/link";

/**
 * @param  {{
 * ref_code: string
 * statusLabel: string
 * labelColor: string
 * shopName:string
 * itemsProduct: []
 * refundAmount : {}
 * complaintReason: string
 * refundDate: string
 * openModal : () => ()
 * }} props
 * @returns
 */

const DisputedOrderCard = ({
  ref_code,
  shopName,
  itemsProduct,
  refundAmount,
  complaintReason,
  refundDate,
  statusLabel,
  labelColor,
  openModal,
}) => {
  const [expandProduct, setExpandProduct] = useState(false);

  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        <Grid container className={classes.cardHeader}>
          <div className={classes.blueLabel}></div>

          <Typography>
            <ColoredLabel backgroundColor={labelColor} text={statusLabel} />
            <span className={classes.cardId}>{ref_code}</span>
            <Stack direction="row" alignItems="center" spacing={0.7}>
              <StoreIcon />
              <span className={classes.cardName}>{shopName}</span>
            </Stack>
          </Typography>

          <Grid
            container
            className={classes.cardBody}
            justifyContent="space-between"
          >
            <Grid
              item
              md={4.5}
              className={`${classes.productSection} ${classes.productSectionDivider}`}
              gap={2}
              container
            >
              <Stack direction="row" gap={2}>
                <Paper variant="outlined" className={classes.imageThumbnail}>
                  <img
                    src={itemsProduct[0]?.imageUrl}
                    width={75}
                    alt="image product"
                  />
                </Paper>

                <Stack direction="column">
                  <Typography className={classes.titleProduct}>
                    {itemsProduct[0]?.name}
                  </Typography>
                  <Typography className={classes.priceProduct}>
                    {itemsProduct[0]?.quantity} x {itemsProduct[0]?.unitPrice}
                  </Typography>
                </Stack>
              </Stack>

              {itemsProduct.length > 1 && (
                <>
                  <Collapse in={expandProduct}>
                    {itemsProduct.map(
                      (item, key) =>
                        key !== 0 && (
                          <Stack direction="row" gap={2} key={key}>
                            <Paper
                              variant="outlined"
                              className={classes.imageThumbnail}
                            >
                              <img
                                src={item.imageUrl}
                                width={75}
                                alt="image product"
                              />
                            </Paper>
                            <Stack direction="column">
                              <Typography className={classes.titleProduct}>
                                {item.name}
                              </Typography>
                              <Typography className={classes.priceProduct}>
                                {item.quantity} x {item.unitPrice}
                              </Typography>
                            </Stack>
                          </Stack>
                        )
                    )}
                  </Collapse>

                  <Grid container justifyContent="center">
                    <LinkText
                      underline="none"
                      onClick={() => setExpandProduct(!expandProduct)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {expandProduct ? (
                        <>
                          Show Less Product
                          <ExpandLessIcon sx={{ fontSize: "18px", mx: 1 }} />
                        </>
                      ) : (
                        <>
                          Show More Product
                          <ExpandMoreIcon sx={{ fontSize: "18px", mx: 1 }} />
                        </>
                      )}
                    </LinkText>
                  </Grid>
                </>
              )}
            </Grid>

            <Grid item md={5} className={classes.containerDetails}>
              <Typography className={classes.LabelDetails}>Details</Typography>
              <Stack direction="row" gap={2}>
                <Grid className={classes.detailContent}>
                  <Typography className={classes.textTitle}>
                    Refund Date
                  </Typography>
                  <Typography className={classes.textBody}>
                    {refundDate}
                  </Typography>
                </Grid>
                <Grid className={classes.detailContent}>
                  <Typography className={classes.textTitle}>
                    Refund Amount
                  </Typography>
                  <Typography className={classes.textBody}>
                    {refundAmount.totalItemPrice} + {refundAmount.deliveryFee}{" "}
                    (Delivery Fee)
                  </Typography>
                </Grid>
              </Stack>
              <Grid className={classes.detailContent}>
                <Typography className={classes.textTitle}>
                  Return Reason
                </Typography>
                <Typography className={classes.textBody}>
                  {complaintReason}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              md={2}
              gap={1}
              container
              alignContent="center"
              justifyContent="end"
            >
              {statusLabel === "RETURN_INITIATED" && (
                <PrimaryButton fullWidth>Start Returning</PrimaryButton>
              )}
              <TextButton onClick={openModal} size="small" fullWidth>
                See Disputed History
              </TextButton>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(DisputedOrderCard);
