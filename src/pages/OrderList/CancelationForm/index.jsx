import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SmartapesDialog from "../../../components/Dialog";
import SelectInput from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import { REASON_CANCELATION } from "../constants";
import { cancelationFormSchema } from "./validationSchema";
import { Stack } from "@mui/material";
import PrimaryButton from "../../../components/PrimaryButton";
import TextButton from "../../../components/TextButton";
import { styles } from "../styles";
import {
  cancelOrder,
  resetStatus,
} from "../../../store/cancelOrder/cancelOrderSlice";
import LoadingAnimation from "../../../components/LoadingAnimation";
import useNotification from "../../../hooks/useNotification";
import { cancelCheckout } from "../../../store/cancelCheckout/cancelCheckoutSlice";
import CancelIllustration from "../../../assets/images/cancel-illustration.svg";
import "./style.scss";

function CancelationForm({
  orderId,
  orderType,
  orderStatus,
  openCancelationForm,
  setOpenCancelationForm,
}) {
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      reason: "",
      message: "",
    },
    shouldFocusError: true,
    resolver: yupResolver(cancelationFormSchema),
  });
  const { status: statusCancelOrder, error: errorCancelOrder } = useSelector(
    (state) => state.cancelOrder
  );
  const dispatch = useDispatch();
  const [_msg, sendNotification] = useNotification();

  const closeDialog = () => {
    setOpenCancelationForm(false);
    reset();
  };

  const onSubmit = (data) => {
    if (orderType === "CHECKOUT" && orderStatus === "PENDING") {
      dispatch(cancelCheckout({ checkout_id: orderId, ...data })).then(
        (res) => {
          if (!res?.error) {
            closeDialog();
          }
        }
      );
    } else {
      dispatch(cancelOrder({ order_id: orderId, payload: { ...data } })).then(
        (res) => {
          if (!res?.error) {
            closeDialog();
          }
        }
      );
    }
  };
  const onError = (errors, e) => console.error(errors, e);

  const submitNotification = useCallback(
    (msg, variant) => {
      sendNotification({
        msg,
        variant,
      });

      dispatch(resetStatus());
    },
    [sendNotification, dispatch]
  );

  useEffect(() => {
    if (statusCancelOrder === "succeeded") {
      const notificationConf = {
        msg: "Order Successfully Cancelled",
        variant: "success",
      };
      submitNotification(notificationConf.msg, notificationConf.variant);
    }

    if (statusCancelOrder === "failed") {
      submitNotification(errorCancelOrder, "error");
    }
  }, [statusCancelOrder, submitNotification, errorCancelOrder]);

  return (
    <SmartapesDialog
      fullWidth
      disableDivider
      maxWidth="sm"
      open={openCancelationForm}
      title="Tell Us Why"
      titleProps={{
        className: "title-dialog",
      }}
      imgTopLeftPosition={CancelIllustration}
      imgTopLeftPositionProps={{ width: 200 }}
      onClose={closeDialog}
    >
      <Stack direction="column" spacing={2}>
        <Controller
          name="reason"
          control={control}
          render={({ field: { onChange } }) => (
            <SelectInput
              name="reason"
              labelSelect="Why do you want to cancel this order?"
              placeholder="Select your Reason"
              itemValues={REASON_CANCELATION(orderType)}
              onChange={onChange}
              error={Boolean(errors?.reason)}
              helperText={errors?.reason?.message}
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          render={({ field: { value, onBlur, onChange } }) => (
            <TextArea
              key="reason_desc"
              name="reason_description"
              label="Tell us your reason why"
              height={121}
              placeholder="Write the reason"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={Boolean(errors?.message)}
              helperText={errors?.message?.message}
            />
          )}
        />
        <PrimaryButton
          sx={styles.cancelFormBtn}
          onClick={handleSubmit(onSubmit, onError)}
          disabled={statusCancelOrder === "loading"}
        >
          {/* Submit */}
          {statusCancelOrder === "loading" ? (
            <LoadingAnimation color="grey" size={24.5} thickness={2} />
          ) : (
            "Submit"
          )}
        </PrimaryButton>
        <TextButton sx={styles.cancelFormBtn} onClick={closeDialog}>
          Cancel
        </TextButton>
      </Stack>
    </SmartapesDialog>
  );
}

export default memo(CancelationForm);
