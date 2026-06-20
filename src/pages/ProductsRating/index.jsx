// React
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { reviewRatings } from "../../store/reviewRatings/reviewRatingsSlice";

// MUI Components
import {
  Container,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

// Icons
import { ReactComponent as ActivityIcon } from "../../assets/icons/activity.svg";
import { ReactComponent as TickSquareIcon } from "../../assets/icons/tick-square.svg";
import { ReactComponent as VectorIcon } from "../../assets/icons/vector.svg";

// Components
import LoadingAnimation from "../../components/LoadingAnimation";
import PrimaryButton from "../../components/PrimaryButton";
import TextArea from "../../components/TextArea";

// Hooks
import useNotification from "../../hooks/useNotification";

// Validation
import { yupResolver } from "@hookform/resolvers/yup";
import { productsRatingSchema } from "./validationSchema";

// Styles
import "./style.scss";

function ProductsRating() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_msg, sendNotification] = useNotification();
  const { status: statusSubmitRatings, error: submitRatingsError } =
    useSelector((state) => state.reviewRatings);
  const {
    currentOrderId,
    data: productsData,
    status: statusGetProductsReviewsByOrder,
    error: errorGetProductsReviewsByOrder,
  } = useSelector((state) => state.getProductsReviewsByOrder);

  const { watch, control, setValue, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      products: [],
    },
    resolver: yupResolver(productsRatingSchema),
  });

  const submitNotificationConf = (status) => {
    if (status === "fulfilled") {
      return {
        msg: "Ratings Successfully Submitted",
        variant: "success",
      };
    }

    if (status === "rejected") {
      return {
        msg: submitRatingsError,
        variant: "error",
      };
    }

    return null;
  };

  useEffect(() => {
    if (statusGetProductsReviewsByOrder === "failed") {
      sendNotification({
        msg: errorGetProductsReviewsByOrder,
        variant: "error",
      });
    }

    if (
      statusGetProductsReviewsByOrder === "idle" ||
      statusGetProductsReviewsByOrder === "failed"
    ) {
      navigate("/order-list");
    }

    if (statusGetProductsReviewsByOrder === "succeeded") {
      setValue(
        "products",
        productsData?.map(({ checkout_item_id }) => ({
          checkout_item_id,
          rating: 0,
          review_detail: null,
        }))
      );
    }
  }, [statusGetProductsReviewsByOrder]);

  const isValuesExist = watch("products")
    ?.map((product) => product?.rating > 0)
    ?.every((value) => value);

  const onSubmit = (data) => {
    dispatch(
      reviewRatings({
        order_id: currentOrderId,
        payload: {
          products: data.products.map((product) => ({
            ...product,
            review_detail: !product?.review_detail
              ? null
              : product?.review_detail,
          })),
        },
      })
    ).then((res) => {
      const getNotificationConf = submitNotificationConf(
        res?.meta?.requestStatus
      );

      if (getNotificationConf) {
        sendNotification(getNotificationConf);
      }

      if (res?.meta?.requestStatus === "fulfilled") {
        navigate("/order-list");
      }
    });
  };

  const onError = (errors, e) => console.error(errors, e);

  return (
    <Container
      maxWidth="lg"
      component={Stack}
      direction="column"
      spacing={3}
      py={2.5}
    >
      <Typography variant="h5" fontWeight="bold">
        Ratings
      </Typography>
      <Paper sx={{ p: 3.5 }} elevation={0}>
        <Grid container spacing={2}>
          <Grid item md={8.8} spacing={2}>
            <Stack direction="column" spacing={8}>
              {productsData?.map((product, productIdx) => (
                <Stack key={product?.product_id} direction="row" spacing={2}>
                  <Paper variant="outlined" className="ratingImageThumbnail">
                    <img src={product?.cover_image_url} width={75} alt="foto" />
                  </Paper>
                  <Stack
                    direction="column"
                    spacing={1.5}
                    mr="8px !important"
                    width={232}
                  >
                    <Typography fontSize={16} fontWeight="bold">
                      {product?.product_title}
                      {product?.variant_title && ` - ${product?.variant_title}`}
                    </Typography>
                    <Rating
                      size="large"
                      classes={{
                        icon: "ratings-products-icon",
                      }}
                      defaultValue={watch(`products.${productIdx}.rating`)}
                      onChange={(_, newValue) =>
                        setValue(`products.${productIdx}.rating`, newValue, {
                          shouldValidate: true,
                        })
                      }
                    />
                  </Stack>
                  <Stack direction="column" spacing={1.5} width="55%">
                    <Controller
                      name={`products.${productIdx}.review_detail`}
                      control={control}
                      render={({
                        field: { value, onBlur, onChange },
                        fieldState: { error },
                      }) => (
                        <TextArea
                          key="review_detail"
                          name="review_detail"
                          height={121}
                          placeholder="Tell us why in this Description"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                    />
                    {/* <FormControlLabel
                        componentsProps={{
                          typography: {
                            sx: { fontSize: "12px", userSelect: "none" },
                          },
                        }}
                        label="Hide my username"
                        control={
                          <Checkbox
                            sx={{
                              width: "1.8em",
                              height: "1.8em",
                              "&.Mui-checked": {
                                color: "#7E54F1",
                              },
                            }}
                            size="small"
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      /> */}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid item md={3.2}>
            <Stack direction="column" spacing={2}>
              <Paper
                variant="outlined"
                component={Stack}
                spacing={2}
                p={2}
                borderRadius="10px !important"
                boxShadow="0px 2px 10px 0px rgba(0, 0, 0, 0.08) !important"
              >
                <Stack direction="row" spacing={1} alignItems="flex-end">
                  <VectorIcon width={37} />
                  <Typography fontSize="14px" fontWeight={600} lineHeight={1.2}>
                    What you need to know..
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TickSquareIcon width={100} />
                  <Typography fontSize="12px" fontWeight={600}>
                    Give the relevant ratings to the product will help other
                    customer found the best product
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <ActivityIcon width={100} />
                  <Typography fontSize="12px" fontWeight={600}>
                    Once you leave some good ratings, it will also help Seller
                    to get more profit because of the rating
                  </Typography>
                </Stack>
                {/* <Stack direction="row" spacing={1}>
                  <HideIcon width={100} />
                  <Typography fontSize="12px" fontWeight={600}>
                    You can hide your username so other customer can’t see your
                    username once you leave the rating
                  </Typography>
                </Stack> */}
              </Paper>
              <PrimaryButton
                sx={{
                  p: 1.3,
                }}
                onClick={handleSubmit(onSubmit, onError)}
                disabled={statusSubmitRatings === "loading" || !isValuesExist}
              >
                {statusSubmitRatings === "loading" ? (
                  <LoadingAnimation color="grey" size={14} thickness={2} />
                ) : (
                  <Typography
                    fontSize="12px"
                    fontWeight={700}
                    lineHeight="12px"
                  >
                    Submit All Ratings
                  </Typography>
                )}
              </PrimaryButton>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductsRating;
