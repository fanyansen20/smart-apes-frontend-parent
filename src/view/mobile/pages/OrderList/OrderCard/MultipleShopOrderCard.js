import React, { useState } from "react";

// MUI
import { Collapse, Divider, Grid, Stack, Typography } from "@mui/material";

// Styles
import classes from "../_OrderList.module.scss";
import { styles } from "../styles";

// Components
import LinkText from "../../../../../components/link";

// Icon
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactComponent as StoreIcon } from "../../../../../assets/icons/store.svg";

// Constants
import { STATUS } from "../constants";

const MultipleShopOrderCard = ({
  shop,
  getCurrentStatus,
  renderItem,
  orderData,
  handleClickTotalSummary,
  handleCloseTotalSummary,
  openTotalSummary,
  order_type,
  products,
  id,
  status,
  category,
  user_payment,
  cancellation,
  shops,
}) => {
  const [expandProducts, setExpandProducts] = useState(false);

  const isMultipleItems = shop?.items?.length > 1;

  return (
    <>
      <Grid item xs={12} key={shop.id}>
        <Grid className={`${classes.cardHeader} ${classes.cardHeaderDivider}`}>
          <Stack direction="row" alignItems="center" spacing={0.7}>
            <StoreIcon />
            <Typography>
              <span className={classes.cardDate}>{shop?.name}</span>
            </Typography>
          </Stack>

          <Grid>
            {STATUS.find((item) =>
              item.status.includes(getCurrentStatus)
            )?.renderColoredLabel({
              status,
              order_type,
              coloredLabelProps: {
                typographyStyles: { margin: "-3px 0" },
              },
            })}
          </Grid>
        </Grid>

        {/* Return Data For First Index */}
        {renderItem(
          shop?.items[0],
          orderData,
          0,
          {
            open,
            handleClickTotalSummary,
            handleCloseTotalSummary,
            openTotalSummary,
          },
          {
            // For Item Header
            id,
            status,
            order_type,
            category,
            user_payment,
            cancellation,
            shops,
            isSplitedOrder: products.length > 1 ? true : false,
          }
        )}

        {isMultipleItems && (
          <>
            {/* Return Data On Collapse Components */}
            <Collapse in={expandProducts}>
              {shop?.items?.map(
                (item, index) =>
                  index !== 0 &&
                  renderItem(
                    item,
                    orderData,
                    index,
                    {
                      open,
                      handleClickTotalSummary,
                      handleCloseTotalSummary,
                      openTotalSummary,
                    },
                    {
                      // For Item Header
                      id,
                      status,
                      order_type,
                      category,
                      user_payment,
                      cancellation,
                      shops,
                      isSplitedOrder: products.length > 1 ? true : false,
                    }
                  )
              )}
            </Collapse>
            <LinkText
              sx={styles.expandProductsText}
              underline="none"
              onClick={() => setExpandProducts(!expandProducts)}
            >
              {expandProducts ? "Show Less Products " : "Show More Products "}
              {expandProducts ? (
                <ExpandLessIcon sx={{ fontSize: "18px", mx: 1 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: "18px", mx: 1 }} />
              )}
            </LinkText>
          </>
        )}
      </Grid>

      <Grid item md={2.2} className={classes.grandTotalSection}>
        <Typography className={classes.titleContent}>Total</Typography>
        <Typography className={classes.contentGrandTotal}>
          {shop?.sub_total_price_string}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider fullWidth orientation="horizontal" />
      </Grid>
    </>
  );
};

export default MultipleShopOrderCard;
