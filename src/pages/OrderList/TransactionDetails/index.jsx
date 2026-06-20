// React
import React, { Fragment, memo, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Helpers
import { capitalCase, paramCase } from "change-case";
import { format, parseISO } from "date-fns";
import { intToSGD } from "../../../helper/currency";
import { roundDiscountNumber } from "../../../helper/numberFormat";

// Components
import SmartapesDialog from "../../../components/Dialog";
import PrimaryButton from "../../../components/PrimaryButton";
import LinkText from "../../../components/link";

// MUI Components
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material";

// Icons
import ProfitIcon from "../../../assets/icons/dolar-profit.svg";
import TransactionDetailIllustration from "../../../assets/images/transaction-detail-illustration.svg";

// MUI Icons
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Constants
import { STATUS } from "../constants";

// Styles
import { styles } from "../styles";
import "./style.scss";

const renderProduct = (
  {
    image_url,
    title,
    qty,
    price,
    total_price,
    base_price,
    total_base_price,
    product,
    active_discount,
    access_code,
    type,
    membershipData,
    membership_discount,
  },
  { shop, shops }
) => {
  const productImage =
    access_code?.cover_image_url ||
    product?.active_variant_detail?.image_url ||
    image_url ||
    product?.cover_image_url;
  const variantTitle = product?.active_variant_detail?.variant_combo
    ?.map((combo) => combo?.value)
    ?.join(", ");
  const titleProduct =
    access_code?.title ||
    `${product?.title}${variantTitle ? ` - ${variantTitle}` : ""}`;

  const isDiscount = active_discount?.final_price < base_price;

  const final_price = total_price / qty;
  const isMembershipExist =
    membership_discount &&
    membershipData?.memberType &&
    membershipData?.memberType !== "none";

  return (
    <Stack sx={styles.dialogProductBox} direction="row" spacing={2}>
      <div className="order-product-img">
        <img src={productImage} alt={title} />
      </div>
      <Stack sx={{ width: "100%" }} direction="column" spacing={1}>
        <Typography sx={styles.dialogProductNameText}>
          {titleProduct}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography color="GrayText">
            {qty} x {intToSGD(final_price || price || total_price)}
          </Typography>
          {isDiscount && (
            <>
              <Typography className="basePrice">
                {` ${intToSGD(base_price || total_base_price)}`}
              </Typography>
              <Typography className="productDiscountPercent">
                {roundDiscountNumber(active_discount?.percent)}%
              </Typography>
              {isMembershipExist && (
                <Typography className="plusSymbol">+</Typography>
              )}
            </>
          )}
          {isMembershipExist && (
            <>
              {!isDiscount && (
                <Typography className="basePrice">
                  {` ${intToSGD(base_price || total_base_price)}`}
                </Typography>
              )}
              <Typography className="membershipDiscountPercent">
                <Stack direction="row" gap={1} alignItems="center">
                  {membership_discount?.discount_percent}%
                  <Tooltip
                    classes={{
                      tooltip: "membershipStatusTooltip",
                    }}
                    title={
                      <Typography>
                        This discount is from your
                        <Typography fontWeight="bold">
                          {` ${membershipData?.memberType} Membership`}
                        </Typography>
                      </Typography>
                    }
                    placement="right"
                    arrow
                  >
                    <Avatar
                      sx={{ width: 13.33, height: 13.33 }}
                      alt="Membership Plans Benefit"
                      src={ProfitIcon}
                    />
                  </Tooltip>
                </Stack>
              </Typography>
            </>
          )}
        </Stack>
        {type !== "access_code" && (
          <PrimaryButton
            sx={{ width: "60%", alignSelf: "self-end" }}
            href={`${process.env.REACT_APP_MARKETPLACE_URL}/${paramCase(
              shop?.name || (shops && shops[0].name) || ""
            )}/${paramCase(product?.slug || "")}?id=${product?.id}&shop_id=${
              product?.shop_id
            }`}
            target="_blank"
          >
            View Live Product
          </PrimaryButton>
        )}
      </Stack>
    </Stack>
  );
};

const BulletConnector = styled(StepConnector)(() => ({
  [`& .${stepConnectorClasses.line}`]: {
    minHeight: "68px",
    margin: "-21px",
    marginLeft: "0.3px",
    marginTop: "-22px",
  },
}));

const BulletStepIconRoot = styled("div")(() => ({
  color: "#eaeaf0",
  marginLeft: 6.5,
  display: "flex",
  alignItems: "center",
  zIndex: 1,
  "& .BulletStepIcon-circle": {
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function BulletStepIcon(props) {
  const { className } = props;

  return (
    <>
      <BulletStepIconRoot className={className}>
        <div className="BulletStepIcon-circle" />
      </BulletStepIconRoot>
    </>
  );
}

function TransactionDetails({
  openTransactionDetails,
  setOpenTransactionDetails,
  selectedOrderData,
  selectedCategory,
}) {
  const [openStatus, setOpenStatus] = useState(false);
  const [expandProducts, setExpandProducts] = useState(false);
  const [openProof, setOpenProof] = useState(false);
  const membershipData = useSelector((store) => store.membership);
  const isBundlesExist =
    (
      selectedOrderData?.bundles ||
      (selectedOrderData?.shops && selectedOrderData?.shops?.[0]?.bundles)
    )?.length > 0;
  const totalMembershipDiscount =
    selectedOrderData?.price_summary?.total_membership_discount_price;
  const isMembershipExist =
    Boolean(totalMembershipDiscount) &&
    membershipData?.memberType &&
    membershipData?.memberType !== "none";

  const products = [];

  const onClose = () => {
    setOpenStatus(false);
    setOpenTransactionDetails(false);
  };
  const orderItems =
    selectedOrderData?.shops?.map((shop) => shop?.items)?.flat() ||
    selectedOrderData?.items;
  orderItems?.map((item) => products.push(item));

  const isProductDiscount = orderItems
    ?.map((item) => item?.active_discount?.status)
    ?.includes("ACTIVE");

  const valueIfHasDiscount = (isDiscountValue, notDiscountValue) =>
    isProductDiscount ? isDiscountValue : notDiscountValue;

  const disabledHistoryFeatureStatus = ["PENDING", "DRAFT"];

  const totalBasePriceItems = orderItems
    ?.map((item) =>
      isProductDiscount ? item?.total_base_price : item?.total_price
    )
    ?.reduce((total, num) => total + num);

  const totalFinalPriceItems =
    selectedOrderData?.price_summary?.total_item_price;
  const savingPriceDiscount =
    selectedOrderData?.price_summary?.total_product_discount_price ||
    totalBasePriceItems - totalFinalPriceItems;

  const totalPriceItems = valueIfHasDiscount(
    totalBasePriceItems,
    totalFinalPriceItems
  );

  const hideStatusHistoryCondition =
    !disabledHistoryFeatureStatus.includes(selectedOrderData?.status) &&
    !disabledHistoryFeatureStatus.includes(
      selectedOrderData?.status_history?.[
        selectedOrderData?.status_history?.length - 1
      ]?.status
    ) &&
    selectedOrderData?.sub_orders?.[selectedOrderData?.selectedSubOrderIdx]
      ?.status_history?.length > 0;

  const proofPhoto = {
    src: selectedOrderData?.sub_orders?.[selectedOrderData?.selectedSubOrderIdx]
      ?.delivery_order?.delivered_image,
    alt: `${selectedOrderData?.ref_code}-proof`,
  };

  const deliveredProofDesc =
    selectedOrderData?.sub_orders?.[selectedOrderData?.selectedSubOrderIdx]
      ?.delivery_order?.delivered_description;

  const isProfilingTestOrder =
    (selectedOrderData?.type ||
      (selectedOrderData?.shops && selectedOrderData?.shops?.[0]?.type)) ===
    "access_code";
  return (
    <SmartapesDialog
      fullWidth
      maxWidth="md"
      open={openTransactionDetails}
      title="Transaction Details"
      titleProps={{
        sx: {
          fontSize: "19px",
        },
      }}
      onClose={onClose}
    >
      <Grid container spacing={2}>
        <Grid item md={7}>
          <Stack direction="column" spacing={2}>
            <Typography sx={styles.dialogSubTitle}>Product Status</Typography>
            <Grid container>
              <Grid item md={5}>
                <Stack direction="column" spacing={1}>
                  <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                    Product Type
                  </Typography>
                  <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                    Transaction Status
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={7}>
                <Stack direction="column" spacing={1}>
                  <Typography variant="subtitle2" sx={styles.dialogValueText}>
                    {capitalCase(
                      selectedOrderData?.type ||
                        (selectedOrderData?.shops &&
                          selectedOrderData?.shops[0].type) ||
                        ""
                    )}
                  </Typography>
                  <Typography variant="subtitle2" sx={styles.dialogValueText}>
                    {STATUS.find((item) =>
                      item.status?.includes(
                        selectedCategory || selectedOrderData?.status
                      )
                    )?.transactionStatus({
                      order_type: selectedOrderData?.order_type,
                    })}
                    {hideStatusHistoryCondition && (
                      <Button
                        sx={styles.dialogSmallButton}
                        size="small"
                        variant="contained"
                      >
                        <Typography
                          variant="caption"
                          onClick={() => setOpenStatus(!openStatus)}
                        >
                          See Status
                        </Typography>
                      </Button>
                    )}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            {!openStatus && (
              <Divider sx={{ borderStyle: "dashed" }} variant="middle" />
            )}
            <Collapse in={openStatus} sx={{ overflow: "hidden" }}>
              <Stepper orientation="vertical" connector>
                <Grid container sx={styles.dialogStepperContent}>
                  {selectedOrderData?.sub_orders?.[
                    selectedOrderData?.selectedSubOrderIdx
                  ]?.status_history?.map((history) => (
                    <Fragment key={history._id}>
                      <Grid item md={4.5}></Grid>
                      <Grid item md={7.5}>
                        <BulletConnector />
                      </Grid>
                      <Grid item md={4.5}>
                        <Step active key={history.status}>
                          <StepLabel
                            sx={styles.dialogStatusLeftLabel}
                            StepIconProps={{
                              sx: {
                                display: "none",
                              },
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={styles.dialogStatusDateLabel}
                            >
                              {history?.created_at &&
                                format(
                                  parseISO(history?.created_at),
                                  "dd MMMM yyyy. HH:mm"
                                )}
                            </Typography>
                          </StepLabel>
                        </Step>
                      </Grid>
                      <Grid item md={7.5}>
                        <Step active key={history.status}>
                          <StepLabel
                            sx={styles.dialogStatusLabel}
                            StepIconComponent={BulletStepIcon}
                          >
                            {history.message || "-"}
                            {history?.status === "DELIVERED" &&
                              selectedOrderData?.sub_orders?.[
                                selectedOrderData?.selectedSubOrderIdx
                              ]?.delivery_order?.delivered_image && (
                                <LinkText
                                  sx={styles.seeProofText}
                                  underline="none"
                                  onClick={() => setOpenProof(!openProof)}
                                >
                                  See Proof
                                </LinkText>
                              )}
                          </StepLabel>
                        </Step>
                      </Grid>
                    </Fragment>
                  ))}
                  <Grid item md={4.5}></Grid>
                  <Grid item md={7.5}>
                    <BulletConnector />
                  </Grid>
                </Grid>
              </Stepper>
            </Collapse>
            <Typography sx={styles.dialogSubTitle}>
              Product Information
            </Typography>
            {products.length > 0 &&
              renderProduct(
                { ...products[0], membershipData },
                selectedOrderData
              )}
            <Collapse in={expandProducts}>
              <Stack direction="column" spacing={2}>
                {products.length > 0 &&
                  products?.map(
                    (item, idx) =>
                      idx !== 0 &&
                      renderProduct(
                        { ...item, membershipData },
                        selectedOrderData
                      )
                  )}
              </Stack>
            </Collapse>
            {products.length > 1 && (
              <LinkText
                sx={styles.dialogProductsExpandText}
                underline="none"
                onClick={() => setExpandProducts(!expandProducts)}
              >
                {expandProducts
                  ? "Show Less "
                  : `+${products.length - 1} more `}
                {expandProducts ? <ExpandLess /> : <ExpandMore />}
              </LinkText>
            )}
          </Stack>
        </Grid>
        <Grid md={0.2}>
          <Divider
            sx={{ paddingBottom: "16px", borderStyle: "dashed" }}
            variant="fullWidth"
            orientation="vertical"
          />
        </Grid>
        <Grid item md={4.5}>
          <Stack direction="column" spacing={2}>
            <Typography sx={styles.dialogSubTitle}>Payment Details</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                Price
              </Typography>
              <Typography sx={styles.dialogSubTitle}>
                {intToSGD(totalBasePriceItems)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                Delivery Cost
              </Typography>
              <Typography sx={styles.dialogSubTitle}>
                {selectedOrderData?.delivery_info?.total_delivery_fee_string ||
                  selectedOrderData?.price_summary
                    ?.total_delivery_price_string ||
                  "S$0.00"}
              </Typography>
            </Stack>
            <Divider sx={{ borderStyle: "dashed" }} variant="middle" />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                Sub Total
              </Typography>
              <Typography sx={styles.dialogSubTitle}>
                {valueIfHasDiscount(
                  intToSGD(
                    totalPriceItems +
                      (selectedOrderData?.price_summary?.delivery_fee ||
                        selectedOrderData?.price_summary?.total_delivery_price)
                  ),
                  selectedOrderData?.price_summary?.total_amount_string
                )}
              </Typography>
            </Stack>
            {!isBundlesExist && (
              <>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                    Product Discount
                  </Typography>
                  <Typography sx={styles.dialogSubTitle}>
                    {valueIfHasDiscount(
                      `- ${intToSGD(savingPriceDiscount)}`,
                      "-"
                    )}
                  </Typography>
                </Stack>
                {!isProfilingTestOrder && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                      Member Discount (
                      {isMembershipExist ? membershipData?.memberType : "Free"})
                    </Typography>
                    <Typography sx={styles.dialogSubTitle}>
                      {totalMembershipDiscount
                        ? `- ${intToSGD(totalMembershipDiscount)}`
                        : "-"}
                    </Typography>
                  </Stack>
                )}
              </>
            )}
            <Divider sx={{ borderStyle: "dashed" }} variant="middle" />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                Grand Total
              </Typography>
              <Typography sx={styles.dialogSubTitle}>
                {selectedOrderData?.price_summary?.total_amount_string}
              </Typography>
            </Stack>
            <Divider sx={{ borderStyle: "dashed" }} variant="middle" />
            <Stack
              sx={{ paddingBottom: "34px" }}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2" sx={styles.dialogLabelText}>
                Payment Method
              </Typography>
              <Typography sx={styles.dialogSubTitle} gutterBottom>
                {selectedOrderData?.payment_method ||
                  selectedOrderData?.user_payment?.payment_method?.name}
              </Typography>
            </Stack>
            {/* <Typography sx={styles.dialogSubTitle}>Voucher</Typography>
            <VoucherInput
              sx={{ pb: 10 }}
              fullWidth
              defaultValue="FREEDELIVERY"
            /> */}
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={7} />
        <Grid item md={4.5}>
          <Stack
            className="order-detail-illustration-container"
            alignItems="end"
          >
            <Box className="order-detail-illustration-background" />
            <img src={TransactionDetailIllustration} />
          </Stack>
        </Grid>
      </Grid>
      <SmartapesDialog
        title="See Proof"
        open={openProof}
        onClose={() => setOpenProof(false)}
      >
        <Stack spacing={2} direction="column">
          <img className="proof-img" {...proofPhoto} />
          <Typography variant="body1">{deliveredProofDesc}</Typography>
        </Stack>
      </SmartapesDialog>
    </SmartapesDialog>
  );
}

export default memo(TransactionDetails);
