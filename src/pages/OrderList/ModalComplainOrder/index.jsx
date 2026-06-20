import { memo, useEffect } from "react";

// Mui material
import { Stack } from "@mui/material";

// Style
import "./_ModalComplainOrder.scss";

// hooks
import { Controller, useForm } from "react-hook-form";
import useNotification from "../../../hooks/useNotification.js";

// Constant
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchemaComplainOrder from "./validationSchemaComplainOrder";

// components
import SmartapesDialog from "../../../components/Dialog";
import PrimaryButton from "../../../components/PrimaryButton";
import SelectInput from "../../../components/Select";
import TextArea from "../../../components/TextArea";
import TextButton from "../../../components/TextButton";
import ToastLabel from "../../../components/ToastLabel";
import InputFile from "./InputFile";
import SpecificProductComplain from "./SpecificProductComplain";

//constant
import { COMPLAIN_TYPE } from "../constants";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getComplainReasons } from "../../../store/orders/getComplainReasons.js";

// helper
import { useNavigate } from "react-router-dom";
import { API } from "../../../config/api.js";

const ModalComplainOrder = ({
  closeModal,
  openModal,
  selectedOrder,
  fetchOrders,
}) => {
  const [_, sendNotification] = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order_id: orderId, sub_orders: subOrders } = selectedOrder || {
    sub_orders: [],
  };

  const productItems = subOrders?.length && subOrders[0]?.items;

  function specificProduct() {
    if (subOrders) {
      return subOrders.reduce((prev, order) => {
        return {
          ...prev,
          ...order?.items.reduce((prev, item) => {
            return {
              ...prev,
              [item?.purchaseOrderItemId]: {
                ...item,
                qty: Number(item?.qty),
                sub_ref_code: order?.ref_code,
                purchase_order_item_id: item?.purchaseOrderItemId,
                isChecked: false,
              },
            };
          }, {}),
        };
      }, {});
    }

    return false;
  }

  const isProductSpecificDisabled =
    productItems?.length === 1 && productItems[0]?.qty === 1;

  const complainReasons =
    useSelector((store) => store.complainReasons)?.data?.complainReasons?.map(
      (complain) => ({
        value: complain,
        label: complain,
      })
    ) || [];

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
    clearErrors,
  } = useForm({
    mode: "all",
    defaultValues: {
      complainType: "WHOLE_ORDER",
      specificProducts: [],
      complainReason: "",
      descriptionReason: "",
      fileProof: {
        videoProof: "",
        imageProof: "",
      },
    },
    shouldFocusError: true,
    resolver: yupResolver(validationSchemaComplainOrder),
  });

  const {
    complainType,
    specificProducts,
    complainReason,
    descriptionReason,
    fileProof,
  } = watch();

  const isWholeOrder = complainType === COMPLAIN_TYPE[0].value;

  useEffect(() => {
    if (openModal && orderId && complainReasons?.length <= 0) {
      dispatch(getComplainReasons({ orderId }));
    }
  }, [orderId, openModal]);

  useEffect(() => {
    if (isWholeOrder) clearErrors("specificProducts");
  }, [complainType]);

  const {
    specificProducts: specificProductsError,
    complainReason: complainReasonError,
    descriptionReason: descriptionReasonError,
    fileProof: fileProofError,
  } = errors || {};

  const isDisabledButton = Boolean(
    complainReasonError?.message ||
      descriptionReasonError?.message ||
      fileProofError?.videoProof?.message ||
      specificProductsError?.message
  );

  function changeInput(name, value) {
    setValue(name, value);
    clearErrors(name, "");
  }

  function inputFileProof(name, value) {
    setValue(name, value);
    clearErrors("fileProof['videoProof']", "");
  }

  async function submitComplainOrder() {
    const payload = new FormData();

    payload.set("order_id", orderId);
    payload.set("is_whole_order", complainType === COMPLAIN_TYPE[0]?.value);
    payload.set("complaint_reason", complainReason);
    payload.set("complaint_description", descriptionReason);

    if (isWholeOrder) {
      subOrders.map((item, key) => {
        payload.append(`sub_ref_codes[${key}]`, item.ref_code);
      });
    } else {
      specificProducts.map((product, key) => {
        Object.entries(product).map((item) =>
          payload.append(`complaint_items[${key}][${item[0]}]`, item[1])
        );
      });
    }

    if (fileProof.videoProof !== "") {
      payload.append(
        `complaints`,
        fileProof.videoProof,
        fileProof.videoProof.name
      );
    }

    if (fileProof.imageProof !== "") {
      payload.append(
        `complaints`,
        fileProof.imageProof,
        fileProof.imageProof.name
      );
    }

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    try {
      await API.post("disputed-orders", payload, config);

      sendNotification({
        msg: "Success Complain Order",
        variant: "success",
      });

      setTimeout(() => {
        fetchOrders();
        closeDialog();
        navigate("/disputed-order?status=REFUND_INITIATED");
      }, 1000);
    } catch (error) {
      sendNotification({
        msg: "Something wrong in our side",
        variant: "error",
      });
      return error;
    }
  }

  function closeDialog() {
    reset();
    closeModal();
  }

  return (
    <SmartapesDialog
      fullWidth
      title="Complain Order"
      maxWidth="sm"
      titleProps={{
        className: "title-modal-complain-order",
      }}
      open={openModal}
      onClose={closeDialog}
    >
      <Stack direction="column" spacing={2}>
        {!isProductSpecificDisabled && (
          <Controller
            name="complainType"
            control={control}
            render={({ field: { onChange } }) => (
              <>
                <SelectInput
                  name="complainType"
                  labelSelect="What do you want to complain about?"
                  placeholder="The whole order"
                  itemValues={COMPLAIN_TYPE}
                  onChange={onChange}
                />
              </>
            )}
          />
        )}

        {!isWholeOrder && (
          <SpecificProductComplain
            errorText={specificProductsError?.message}
            changeInput={changeInput}
            productItems={productItems}
            specificProduct={specificProduct}
          />
        )}

        <Controller
          name="complainReason"
          control={control}
          render={({ field: { onChange } }) => (
            <SelectInput
              name="complainReason"
              labelSelect="What happen to your order?"
              placeholder="Select your reason"
              itemValues={complainReasons}
              onChange={onChange}
              error={Boolean(complainReasonError)}
              helperText={complainReasonError?.message}
            />
          )}
        />

        <Controller
          name="descriptionReason"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextArea
              key="reason_desc"
              name="reason_description"
              label="Tell us your reason why"
              height={121}
              placeholder="Write the reason"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={Boolean(descriptionReasonError)}
              helperText={descriptionReasonError?.message}
              limitTextLength={250}
            />
          )}
        />

        <InputFile
          error={Boolean(fileProofError?.videoProof)}
          helperText={fileProofError?.videoProof?.message}
          inputFileProof={inputFileProof}
          setValue={setValue}
        />

        <ToastLabel textLabel="Please note that for all complaint orders, it is necessary to obtain confirmation from the seller before processing any refunds. To facilitate the resolution process, we kindly ask you to provide video or photo evidence supporting your complaint." />

        <PrimaryButton
          disabled={isDisabledButton}
          onClick={handleSubmit(submitComplainOrder)}
        >
          Submit
        </PrimaryButton>
        <TextButton onClick={closeDialog}>Cancel</TextButton>
      </Stack>
    </SmartapesDialog>
  );
};

export default memo(ModalComplainOrder);
