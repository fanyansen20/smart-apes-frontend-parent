// React
import React, { memo, useState } from "react";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/orders/orderSlice";
import {
  postCompleteOrder,
  resetStatus,
} from "../../../store/postCompleteOrder/postCompleteOrderSlice";

// MUI Components
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Menu,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

// scss
import classes from "../OrderList.module.scss";

// libs
import { paramCase } from "change-case";
import { format, isAfter, parseISO } from "date-fns";
import { SubStatusLabel } from "../lib";

// Components
import LinkText from "../../../components/link";
import BundleCard from "../BundleCard";
import MultipleBundlesOrder from "../MultipleBundlesOrder";
import SplittedOrder from "../SplittedOrder";
import { styles } from "../styles";

// Constants
import {
  CANCELLED_ORDER_STATUS,
  STATUS,
  getDeliveryServiceInfo,
} from "../constants";

// Icons
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { ReactComponent as AlertIcon } from "../../../assets/icons/alert.svg";
import { ReactComponent as StoreIcon } from "../../../assets/icons/store.svg";

// Helper
import { intToSGD } from "../../../helper/currency";

const renderItem = (
  {
    qty,
    notes,
    product,
    bundle,
    base_price,
    access_code,
    active_discount,
    productIdByShop,
    membershipData,
  },
  {
    type,
    bundles,
    shipment,
    delivery_info,
    delivery,
    price_summary,
    sub_orders,
    items,
    shops,
  },
  idx,
  {
    open,
    handleClickTotalSummary,
    handleCloseTotalSummary,
    openTotalSummary,
    onClickBundleDetails,
  }
) => {
  const isMembershipExist =
    membershipData?.memberType && membershipData?.memberType !== "none";
  const variantTitle = product?.active_variant_detail?.variant_combo
    ?.map((combo) => combo?.value)
    ?.join(", ");
  const productTitle =
    access_code?.title ||
    `${product?.title}${variantTitle ? ` - ${variantTitle}` : ""}`;
  const receiverAddress =
    delivery_info?.destination?.address ||
    `${delivery?.receiver?.address_detail}, ${delivery?.receiver?.country_name}, ${delivery?.receiver?.postal_code}`;
  const imageUrl =
    product?.active_variant_detail?.image_url ||
    product?.cover_image_url ||
    access_code?.cover_image_url;
  const basePriceProduct =
    base_price || product?.active_variant_detail?.base_price;
  const getBasePrice = basePriceProduct && intToSGD(basePriceProduct);
  const priceProduct =
    getBasePrice || intToSGD(access_code?.active_variant_detail?.base_price);
  const totalBasePriceItems =
    items
      ?.map(
        ({ base_price, product, qty }) =>
          (base_price || product?.active_variant_detail?.base_price) * qty
      )
      ?.reduce((total, num) => total + num) ||
    price_summary?.total_item_base_price ||
    price_summary?.total_item_price;
  const isDiscountActive = active_discount?.status === "ACTIVE";
  const discountPriceItems = price_summary?.total_product_discount_price;
  const isBundlesOrder = (bundles || (shops && shops[0].bundles))?.length > 0;
  const isProfilingTestOrder =
    (type || (shops && shops[0].type)) === "access_code";

  return (
    <Grid container className={classes.cardBody} justifyContent="space-between">
      <Grid
        item
        md={5}
        className={`${classes.productSection} ${
          idx === 0 && classes.productSectionDivider
        }`}
        gap={1}
      >
        {bundle ? (
          <BundleCard
            singleBundle
            bundleTitle={bundle?.name}
            bundleItems={bundle?.items}
            onClickBundleDetails={() => onClickBundleDetails(bundle)}
          />
        ) : (
          <>
            <Paper variant="outlined" className={classes.imageThumbnail}>
              <img src={imageUrl} width={75} alt="image product" />
            </Paper>
            <Stack direction="column" mr={1.5}>
              {/* {PRODUCT_TYPES.find((item) => item?.type === type)?.renderLabel()} */}
              <Typography className={classes.titleProduct}>
                {productTitle}
              </Typography>
              <Typography className={classes.priceProduct}>
                {qty} x {priceProduct}
              </Typography>
              <Typography className={classes.noteProduct}>{notes}</Typography>
            </Stack>
          </>
        )}
      </Grid>
      {idx === 0 && (
        <>
          {!access_code && (
            <>
              <Grid item md={2.6} className={classes.addressSection}>
                <Typography className={classes.titleContent}>
                  Delivery Address
                </Typography>
                <Typography className={classes.bodyContent}>
                  {receiverAddress}
                </Typography>
              </Grid>
              <Grid item md={2.3} className={classes.deliverySection}>
                <Typography className={classes.titleContent}>
                  Delivery Services
                </Typography>
                <Typography className={classes.bodyContent}>
                  {getDeliveryServiceInfo({
                    is_using_shop_fleet:
                      delivery_info?.is_using_shop_fleet ||
                      delivery?.senders[0]?.is_using_shop_fleet,
                    seller_fleet_name:
                      delivery?.senders?.[0]?.shop_fleet
                        ?.shop_fleet_delivery_fee?.short_name ||
                      sub_orders?.[0]?.delivery_order?.delivery_type?.shop_fleet
                        ?.shop_fleet_delivery_fee?.short_name,
                    delivery_service_name:
                      sub_orders?.[0]?.delivery_order?.delivery_type
                        ?.delivery_service?.code ||
                      delivery_info?.delivery_service?.code ||
                      delivery?.senders[0]?.delivery_service?.code,
                  })}
                  <br />
                  {`Delivery Fee 
                    ${
                      delivery_info?.total_delivery_fee_string ||
                      intToSGD(delivery?.senders[0]?.total_delivery_fee)
                    }`}
                </Typography>
              </Grid>

              <Grid item md={2.7} className={classes.bookingCodeSection}>
                {(shipment?.tracking_number ||
                  sub_orders?.[0]?.delivery_order?.tracking_number) && (
                  <>
                    <Typography className={classes.titleContent}>
                      Tracking Code
                    </Typography>
                    <Typography className={classes.bodyContent} maxWidth={140}>
                      {shipment?.tracking_number ||
                        sub_orders?.[0]?.delivery_order?.tracking_number}
                    </Typography>
                  </>
                )}
              </Grid>
            </>
          )}

          <Grid item md={2.2} className={classes.grandTotalSection}>
            <Typography className={classes.titleContent}>
              Grand Total
            </Typography>
            <Typography className={classes.contentGrandTotal}>
              {price_summary?.total_amount_string}
              <IconButton
                aria-label="more"
                id={`totalPriceSummaryExpand${productIdByShop}`}
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClickTotalSummary}
              >
                <ExpandMoreIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": `totalPriceSummaryExpand${productIdByShop}`,
                }}
                anchorEl={openTotalSummary}
                open={open}
                onClose={handleCloseTotalSummary}
                PaperProps={{
                  style: {
                    "& ul": {
                      padding: 0,
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                    padding: 0,
                  }}
                >
                  <ListItem>
                    <Typography sx={styles.totalPriceHeader} variant="h6">
                      Total Details
                    </Typography>
                  </ListItem>
                  <ListItem sx={styles.totalPriceItem}>
                    <Typography
                      sx={styles.totalPriceLabel}
                      className={classes.totalDetailsLabel}
                      variant="body1"
                    >
                      Product Total
                    </Typography>
                    <Typography sx={styles.totalPriceValue} variant="body1">
                      {intToSGD(totalBasePriceItems)}
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                  {isDiscountActive && (
                    <>
                      <ListItem sx={styles.totalPriceItem}>
                        <Typography
                          sx={styles.totalPriceLabel}
                          className={classes.totalDetailsLabel}
                          variant="body1"
                        >
                          Product Discount
                        </Typography>
                        <Typography sx={styles.totalPriceValue} variant="body1">
                          {discountPriceItems
                            ? `- ${intToSGD(discountPriceItems)}`
                            : "-"}
                        </Typography>
                      </ListItem>
                      <Divider component="li" />
                    </>
                  )}
                  {!isBundlesOrder && !isProfilingTestOrder && (
                    <>
                      <ListItem sx={styles.totalPriceItem}>
                        <Stack direction="row" gap={2}>
                          <Typography
                            sx={styles.totalPriceLabel}
                            className={classes.totalDetailsLabel}
                            variant="body1"
                          >
                            Member Discount (
                            {isMembershipExist
                              ? membershipData?.memberType
                              : "Free"}
                            )
                          </Typography>
                          <Typography
                            sx={styles.totalPriceValue}
                            variant="body1"
                            ml={
                              !price_summary?.total_membership_discount_price &&
                              5
                            }
                          >
                            {price_summary?.total_membership_discount_price
                              ? `- ${intToSGD(
                                  price_summary?.total_membership_discount_price
                                )}`
                              : "-"}
                          </Typography>
                        </Stack>
                      </ListItem>
                      <Divider component="li" />
                    </>
                  )}
                  <ListItem sx={styles.totalPriceItem}>
                    <Typography
                      sx={styles.totalPriceLabel}
                      className={classes.totalDetailsLabel}
                      variant="body1"
                    >
                      Shipping Cost
                    </Typography>
                    <Typography sx={styles.totalPriceValue} variant="body1">
                      {price_summary?.total_delivery_price_string ||
                        delivery_info?.total_delivery_fee_string ||
                        "-"}
                    </Typography>
                  </ListItem>
                </List>
              </Menu>
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};

function OrderCard({
  splittedOrder,
  orderData,
  onClickBundleDetails,
  onClickTransactionDetails,
  getOrderParams,
  category,
  setCategory,
  onClickCancelFormOpen,
  giveRatingAction,
  handlerOpenModalComplainOrder,
}) {
  const {
    id,
    ref_code,
    items,
    verification,
    shop,
    shops,
    status,
    user_payment,
    order_type,
    sub_status,
    cancellation,
    processing,
    delivery,
    has_review,
    created_at,
    status_history,
    bundles,
    type: productType,
    price_summary,
  } = orderData;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [expandProducts, setExpandProducts] = useState(false);
  const [openTotalSummary, setOpenTotalSummary] = useState(null);
  const [openActionMenu, setActionMenu] = useState(null);
  const getCurrentStatus =
    (status === "PROCESSING" ? processing?.processing_status : category) ||
    status;
  const products = [];
  const bundleList = [];
  const open = Boolean(openTotalSummary);
  const handleClickTotalSummary = (event) => {
    setOpenTotalSummary(event.currentTarget);
  };
  const handleCloseTotalSummary = () => {
    setOpenTotalSummary(null);
  };
  const handleClickActionMenu = (event) => {
    setActionMenu(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
    setActionMenu(null);
  };
  const membershipData = useSelector((store) => store.membership);
  const postCompleteOrderState = useSelector(
    (state) => state.postCompleteOrder
  );

  const postCompleteOrderAction = () => {
    dispatch(postCompleteOrder({ order_id: id })).then(() =>
      dispatch(getOrders(getOrderParams)).then(() => {
        setCategory("ORDER_COMPLETE");
      })
    );
  };

  if (postCompleteOrderState.status === "succeeded") {
    dispatch(resetStatus());
    enqueueSnackbar("Your order has been complete!", {
      autoHideDuration: 3000,
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }

  shops?.map((shop) => shop?.items?.map((item) => products.push(item))) ||
    items?.map((item) => products.push(item));

  shops?.map((shop) =>
    shop?.bundles?.map((bundle) => bundleList.push(bundle))
  ) || bundles?.map((bundle) => bundleList.push(bundle));

  const isUsingNinjavan =
    Array.isArray(delivery?.senders) &&
    (delivery?.senders[0]?.delivery_service?.is_package_split ||
      delivery?.senders[0]?.delivery_service?.company_name === "ninjavan");

  const packageCount =
    delivery?.senders[0]?.delivery_service?.package_split_count;

  const orderDate =
    order_type === "CHECKOUT" && status === "PENDING"
      ? user_payment?.start_date
      : created_at;

  const renderProductsListSection = () => {
    const calculateSummaryProductsPriceByShop = (shop) => {
      const totalProductsPrice =
        shop?.items?.length > 0 &&
        shop?.items
          ?.map((item) => item?.price * item?.qty)
          ?.reduce((total, num) => total + num);
      const totalProductsBasePrice =
        shop?.items?.length > 0 &&
        shop?.items
          ?.map((item) => item?.base_price * item?.qty)
          ?.reduce((total, num) => total + num);
      const shippingCost =
        delivery?.senders?.find(
          ({ checkout_shop_id }) => checkout_shop_id === shop?.id
        )?.total_delivery_fee || 0;

      return {
        total_amount_string: intToSGD(totalProductsPrice + shippingCost),
        total_item_price: totalProductsPrice,
        total_item_base_price: totalProductsBasePrice,
        total_item_base_price_string: intToSGD(totalProductsPrice),
        total_delivery_price_string: intToSGD(shippingCost),
      };
    };

    const renderProductsByShop = (shop, shopId) => {
      const finalOrderData = {
        ...orderData,
        price_summary: {
          ...price_summary,
          ...calculateSummaryProductsPriceByShop(shop),
          items: shop?.items,
        },
      };

      return (
        <Stack direction="column">
          <Stack direction="row" gap={1.75}>
            <StoreIcon />
            <Typography className={classes.storeName}>{shop.name}</Typography>
          </Stack>
          {renderItem(
            {
              ...shop?.items?.[0],
              productIdByShop: `${shopId}0`,
              membershipData,
            },
            finalOrderData,
            0,
            {
              open:
                openTotalSummary?.id === `totalPriceSummaryExpand${shopId}0`,
              handleClickTotalSummary,
              handleCloseTotalSummary,
              openTotalSummary,
            }
          )}
          <Collapse in={expandProducts}>
            {shop?.items?.length > 1 &&
              shop?.items?.map(
                (productItem, productIdx) =>
                  productIdx > 0 &&
                  renderItem(
                    {
                      ...productItem,
                      membershipData,
                      productIdByShop: `${shopId}${productIdx}`,
                    },
                    finalOrderData,
                    productIdx,
                    {
                      open:
                        openTotalSummary?.id ===
                        `totalPriceSummaryExpand${shopId}${productIdx}`,
                      handleClickTotalSummary,
                      handleCloseTotalSummary,
                      openTotalSummary,
                    }
                  )
              )}
          </Collapse>
        </Stack>
      );
    };
    // Split Products by Shops
    if (shops?.length > 1) {
      return (
        <Stack direction="column" gap={expandProducts && 3} p={2}>
          {renderProductsByShop(shops?.[0], shops?.[0]?.shop_id)}
          {expandProducts && (
            <Collapse in={expandProducts}>
              <Stack direction="column" gap={3}>
                <Divider />
                {shops?.map(
                  (shop, shopIdx) =>
                    shopIdx > 0 && (
                      <>
                        {renderProductsByShop(shop, shop?.shop_id)}
                        {shopIdx !== shops?.length - 1 && shops?.length > 1 && (
                          <Divider />
                        )}
                      </>
                    )
                )}
              </Stack>
            </Collapse>
          )}
          {shops?.length > 1 && (
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
          )}
        </Stack>
      );
    }

    const finalOrderData = {
      ...orderData,
      items: shops?.length === 1 ? shops?.[0]?.items : items,
    };

    // Render Products List as usual
    return (
      <>
        {renderItem(
          { ...(products?.[0] || ""), membershipData },
          finalOrderData,
          0,
          {
            open,
            handleClickTotalSummary,
            handleCloseTotalSummary,
            openTotalSummary,
          }
        )}
        {products?.length > 1 && (
          <>
            <Collapse in={expandProducts}>
              {products.map(
                (item, idx) =>
                  idx !== 0 &&
                  renderItem({ ...item, membershipData }, finalOrderData, idx, {
                    open,
                    handleClickTotalSummary,
                    handleCloseTotalSummary,
                    openTotalSummary,
                  })
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
      </>
    );
  };

  return (
    <Card
      key={id}
      className={`${classes.cardContainer} ${classes.cardElevation}`}
    >
      <CardContent>
        <Grid
          container
          className={`${classes.cardHeader} ${classes.cardHeaderDivider}`}
        >
          <div className={classes.blueLabel}></div>
          <Grid item className={classes.cardHeaderLeft}>
            <Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                {STATUS.find((item) =>
                  item.status.includes(getCurrentStatus)
                )?.renderColoredLabel({
                  status,
                  order_type,
                  coloredLabelProps: {
                    typographyStyles: { margin: "-3px 0" },
                  },
                })}{" "}
                <span className={classes.cardId}>{ref_code}</span>
                {(shops?.length <= 1 || !shops?.length) && (
                  <Stack direction="row" alignItems="center" spacing={0.7}>
                    <StoreIcon />
                    <span className={classes.cardDate}>
                      {(shops && shops[0]?.name) || shop?.name}
                    </span>
                  </Stack>
                )}
                <Stack direction="row" alignItems="center" spacing={0.7}>
                  <WatchLaterIcon sx={{ color: "#19E9D0" }} />
                  <span className={classes.cardDate}>
                    {format(parseISO(orderDate), "dd MMMM yyyy. HH:mm")}
                  </span>
                </Stack>
              </Stack>
            </Typography>
          </Grid>
          <Grid item className={classes.cardHeaderRight}>
            {status === "PENDING" && (
              <>
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "21px",
                  }}
                >
                  {(order_type === "CHECKOUT" || category === "PENDING") &&
                    (isAfter(new Date(), parseISO(user_payment?.deadline_date))
                      ? ""
                      : "Pay Before")}
                </Typography>
                {(order_type === "CHECKOUT" || category === "PENDING") && (
                  <Box
                    sx={{
                      backgroundColor: "#FF0000",
                      color: "#FFFFFF",
                      padding: "4px 8px",
                      fontWeight: "500",
                    }}
                  >
                    <Typography sx={{ fontSize: "10px" }}>
                      {user_payment?.deadline_date &&
                        (isAfter(
                          new Date(),
                          parseISO(user_payment?.deadline_date)
                        )
                          ? "Expired"
                          : format(
                              parseISO(user_payment?.deadline_date),
                              "dd MMMM yyyy. HH:mm"
                            ))}
                    </Typography>
                  </Box>
                )}
              </>
            )}
            {CANCELLED_ORDER_STATUS.includes(status) && cancellation && (
              <SubStatusLabel
                cancelledBy={[
                  cancellation?.created_by,
                  cancellation?.approved_by,
                ]}
              />
            )}
          </Grid>
        </Grid>
        {splittedOrder ? (
          <SplittedOrder
            category={category}
            orderData={orderData}
            totalDetailProps={{
              open,
              handleClickTotalSummary,
              handleCloseTotalSummary,
              openTotalSummary,
            }}
            postCompleteOrderAction={postCompleteOrderAction}
            openOrderDetail={(subOrderIdx = 0) =>
              onClickTransactionDetails({
                ...orderData,
                selectedSubOrderIdx: subOrderIdx,
              })
            }
            onClickCancelFormOpen={() => onClickCancelFormOpen(orderData)}
            giveRatingAction={() => giveRatingAction(orderData)}
            openModalComplainOrder={() =>
              handlerOpenModalComplainOrder(orderData)
            }
            handleCloseActionMenu={handleCloseActionMenu}
          />
        ) : (
          <>
            {isUsingNinjavan && packageCount > 1 && (
              <Paper
                variant="outlined"
                className={classes.noteInfo}
                component={Grid}
                md={6.1}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AlertIcon />
                  <Typography className={classes.noteMsg}>
                    This order has been split into {packageCount} package
                    because using
                    <span className={classes.ninjaVanText}> NinjaVan. </span>
                    {/* <LinkText underline="none">Learn More</LinkText> */}
                  </Typography>
                </Stack>
              </Paper>
            )}

            {/* UI for Single Bundle */}
            {bundleList?.length === 1 &&
              !(isUsingNinjavan && packageCount) &&
              renderItem({ bundle: bundleList?.[0] }, orderData, 0, {
                open,
                handleClickTotalSummary,
                handleCloseTotalSummary,
                openTotalSummary,
                onClickBundleDetails,
              })}

            {/* UI for Multiple Bundle */}
            {bundleList?.length > 1 && (
              <MultipleBundlesOrder
                category={category}
                orderData={orderData}
                bundleList={bundleList}
                postCompleteOrderAction={postCompleteOrderAction}
                openOrderDetails={(subOrderIdx = 0) =>
                  onClickTransactionDetails({
                    ...orderData,
                    selectedSubOrderIdx: subOrderIdx,
                  })
                }
                onClickBundleDetails={onClickBundleDetails}
                onClickCancelFormOpen={() => onClickCancelFormOpen(orderData)}
                giveRatingAction={() => giveRatingAction(orderData)}
                openModalComplainOrder={() =>
                  handlerOpenModalComplainOrder(orderData)
                }
                handleCloseActionMenu={handleCloseActionMenu}
              />
            )}

            {/* UI for Order without Bundle */}
            {(!bundleList?.length || (isUsingNinjavan && packageCount)) &&
              renderProductsListSection()}

            {!(bundleList?.length > 1) &&
              STATUS.find((item) =>
                item.status.includes(getCurrentStatus)
              )?.renderFooter({
                orderId: id,
                openOrderDetails: (subOrderIdx = 0) =>
                  onClickTransactionDetails({
                    ...orderData,
                    selectedSubOrderIdx: subOrderIdx,
                  }),
                postCompleteOrderState,
                postCompleteOrderAction,
                hitpay_payment_url:
                  user_payment?.hitpay?.hitpay_payment_url ||
                  user_payment?.paypal?.payment_url,
                isLoading:
                  postCompleteOrderState.status === "loading" &&
                  postCompleteOrderState.currentId === id,
                isExpired:
                  (verification?.deadline_date &&
                    isAfter(
                      new Date(),
                      parseISO(verification?.deadline_date)
                    )) ||
                  (user_payment?.deadline_date &&
                    isAfter(new Date(), parseISO(user_payment?.deadline_date))),
                order_type: orderData.order_type,
                openActionMenu,
                handleClickActionMenu,
                handleCloseActionMenu,
                category,
                onClickCancelFormOpen: () => onClickCancelFormOpen(orderData),
                hasCancelStatus:
                  CANCELLED_ORDER_STATUS.includes(status) && sub_status,
                isReviewed: has_review,
                shopId: shop?.shop_id || (items && items[0]?.product?.shop_id),
                shopName: paramCase(shop?.name || ""),
                productId: items && items[0]?.product?.id,
                productSlug: items && items[0]?.product?.slug,
                giveRatingAction: () => giveRatingAction(orderData),
                productType,
                status_history,
                openModalComplainOrder: () =>
                  handlerOpenModalComplainOrder(orderData),
              })}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(OrderCard);
