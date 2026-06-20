// React
import React, { memo } from "react";
import { Controller, useForm } from "react-hook-form";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { reviewRatings } from "../../../store/reviewRatings/reviewRatingsSlice";

// Hooks
import useNotification from "../../../hooks/useNotification";

// Validations
import { yupResolver } from "@hookform/resolvers/yup";
import { productRatingForm } from "./validationSchema";

// MUI Components
import {
  Divider,
  FormHelperText,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

// Components
import SmartapesDialog from "../../../components/Dialog";
import LoadingAnimation from "../../../components/LoadingAnimation";
import PrimaryButton from "../../../components/PrimaryButton";
import TextArea from "../../../components/TextArea";
import TextButton from "../../../components/TextButton";

// Styles
import "./style.scss";

function SingleProductRating({
  selectedOrder,
  openRatingForm,
  setOpenRatingForm,
  fetchOrders,
}) {
  const dispatch = useDispatch();
  const { status: statusSubmitRatings, error: submitRatingsError } =
    useSelector((state) => state.reviewRatings);
  const [_msg, sendNotification] = useNotification();
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      rating: 0,
      review_detail: "",
    },
    shouldFocusError: true,
    resolver: yupResolver(productRatingForm),
  });
  const closeDialog = () => {
    setOpenRatingForm(false);
    reset();
  };
  const notificationConf = (status) => {
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
  const onSubmit = (data) => {
    dispatch(
      reviewRatings({
        order_id: selectedOrder?.id,
        payload: {
          products: [
            {
              ...data,
              review_detail: !data.review_detail ? null : data.review_detail,
              checkout_item_id:
                selectedOrder?.items && selectedOrder?.items[0]?.id,
            },
          ],
        },
      })
    ).then((res) => {
      const getNotificationConf = notificationConf(res?.meta?.requestStatus);

      if (getNotificationConf) {
        sendNotification(getNotificationConf);
      }

      if (res?.meta?.requestStatus === "fulfilled") {
        closeDialog();
        fetchOrders();
      }
    });
  };
  const onError = (errors, e) => console.error(errors, e);
  return (
    <SmartapesDialog
      fullWidth
      maxWidth="sm"
      open={openRatingForm}
      title="Ratings and Review"
      titleProps={{
        className: "ratings-dialog-title",
      }}
      onClose={closeDialog}
    >
      <Stack direction="column" spacing={2.5}>
        <Stack direction="column" my={0.75} gap={1.25}>
          <Typography className="ratings-input-label">Product Name</Typography>
          <Stack direction="row" spacing={2}>
            <Paper variant="outlined" className="imageThumbnail">
              <img
                src={
                  (selectedOrder?.items && selectedOrder?.items[0].image_url) ||
                  (selectedOrder?.items &&
                    selectedOrder?.items[0].product?.cover_image_url)
                }
                width={75}
                alt="foto"
              />
            </Paper>
            <Typography fontWeight="bold">
              {selectedOrder?.items && selectedOrder?.items[0]?.title}
            </Typography>
          </Stack>
        </Stack>
        <Divider variant="middle" />
        <Typography className="ratings-input-label">Give Ratings</Typography>
        <Stack direction="column" alignSelf="center">
          <Rating
            size="large"
            classes={{
              icon: "ratings-product-icon",
            }}
            defaultValue={watch("rating")}
            onChange={(_, newValue) =>
              setValue("rating", newValue, { shouldValidate: true })
            }
          />
        </Stack>
        <FormHelperText error={Boolean(errors?.rating)}>
          {errors?.rating?.message}
        </FormHelperText>
        <Controller
          name="review_detail"
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
        <PrimaryButton
          sx={{
            fontWeight: "700",
          }}
          onClick={handleSubmit(onSubmit, onError)}
          disabled={statusSubmitRatings === "loading"}
        >
          {/* Submit */}
          {statusSubmitRatings === "loading" ? (
            <LoadingAnimation color="grey" size={24.5} thickness={2} />
          ) : (
            "Submit"
          )}
        </PrimaryButton>
        <TextButton
          sx={{
            fontWeight: "700",
          }}
          onClick={closeDialog}
        >
          Cancel
        </TextButton>
      </Stack>
    </SmartapesDialog>
  );
}

export default memo(SingleProductRating);
