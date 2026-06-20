import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Card,
  CardContent,
  Collapse,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LinkText from "../../../../../components/link";
import SubOrderItem from "../SubOrderItem";
import classes from "../_OrderList.module.scss";

function SubOrder({ orderType, orderItems, subOrderData, renderColoredLabel }) {
  const [expandProducts, setExpandProducts] = useState(false);
  const { delivery_order } = subOrderData;
  const {
    delivery_type,
    tracking_number,
    items: subOrderItems,
  } = delivery_order;
  const { delivery_service } = delivery_type;
  const { delivery_service_price } = delivery_service;
  const { name: deliveryServiceName, total_amount: deliveryFee } =
    delivery_service_price;
  const otherFirstProductItem = orderItems?.find(
    (item) =>
      item.id === subOrderItems[0].checkout_item_id ||
      item._id === subOrderItems[0].checkout_item_id
  );
  const firstProductItem = {
    ...otherFirstProductItem,
    ...subOrderItems[0],
  };

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <CardContent
        sx={{
          paddingRight: "32px !important",
          paddingBottom: "22px !important",
        }}
        className={classes.cardHeader}
        component={Stack}
        direction="column"
        spacing={1}
      >
        <Grid container className={classes.cardHeaderLeft}>
          <Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              {renderColoredLabel({
                order_type: orderType,
                coloredLabelProps: {
                  typographyStyles: { margin: "-3px 0" },
                },
              })}
            </Stack>
          </Typography>
        </Grid>
        {/* {renderProductItem({
          productIdx: 0,
          productItem: firstProductItem,
          orderData,
        })} */}
        <SubOrderItem
          productIdx={0}
          productItem={firstProductItem}
          packageType={deliveryServiceName}
          trackingCode={tracking_number}
          deliveryFee={deliveryFee}
        />
        {subOrderItems?.length > 1 && (
          <Collapse sx={{ marginTop: "0 !important" }} in={expandProducts}>
            {subOrderItems.map((subOrderItem, subOrderItemIdx) => {
              const otherItemData = orderItems?.find(
                (orderItem) => orderItem.id === subOrderItem.checkout_item_id
              );

              const productItem = {
                ...otherItemData,
                ...subOrderItem,
              };
              return (
                subOrderItemIdx !== 0 && (
                  <SubOrderItem
                    key={subOrderItemIdx}
                    productIdx={subOrderItemIdx}
                    productItem={productItem}
                    packageType={deliveryServiceName}
                    trackingCode={tracking_number}
                    deliveryFee={deliveryFee}
                  />
                )
              );
            })}
          </Collapse>
        )}
        <Stack direction="column" spacing={2}>
          {subOrderItems?.length > 1 && (
            <LinkText
              display="flex"
              underline="none"
              alignItems="center"
              ml="124px"
              onClick={(e) => {
                e.stopPropagation();
                setExpandProducts(!expandProducts);
              }}
            >
              {expandProducts
                ? "Show Less Products "
                : `Show ${subOrderItems?.length - 1} ${
                    subOrderItems?.length - 1 > 1
                      ? "Others Products"
                      : "Other Product"
                  } `}
              {expandProducts ? (
                <ExpandLessIcon sx={{ fontSize: "18px", mx: 1 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: "18px", mx: 1 }} />
              )}
            </LinkText>
          )}
          {/* <LinkText
            display="flex"
            alignSelf="flex-end"
            underline="none"
            onClick={openOrderDetail}
          >
            See Order Details
          </LinkText> */}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SubOrder;
