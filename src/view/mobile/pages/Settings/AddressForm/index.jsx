import { parsePhoneNumber } from "awesome-phonenumber";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
} from "@mui/material";

// Redux
import { useSelector } from "react-redux";

// Hooks
import useNotification from "../../../../../hooks/useNotification";

// Hook Form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// Components
import PrimaryButton from "../../../../../components/PrimaryButton";
import SecondaryButton from "../../../../../components/button/SecondaryButton";
import InputTextField from "../../../../../components/form/InputTextField/InputTextField";
import CenterModal from "../../../components/CenterModal";
import HeaderNavigation from "../../../components/HeaderNavigation";

// Helper
import { API } from "../../../../../config/api";

// Schema
import userAddressSchema from "../../../../../components/modal/ModalAddAddress/userAddressSchema";

// Styles
import classes from "./_AddressForm.module.scss";

const EditAddress = () => {
  const navigate = useNavigate();
  const { addressId } = useParams();

  const [_msg, sendNotification] = useNotification();

  // #region useState
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // #endregion

  // #region redux state
  const { id: userId } = useSelector((store) => store.user.userData);
  const { userAddressData } = useSelector((state) => state.userAddress);
  // #endregion

  // #region form
  const {
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      addressLabel: "",
      recipientName: "",
      countryCodeNumber: "+65",
      phoneNumber: "",
      fullAddress: "",
      zipCode: "",
      is_default: false,
      country_id: "SG",
      country_name: "Singapore",
    },
    resolver: yupResolver(userAddressSchema),
  });
  // #endregion

  // #region function
  const getAndSetAddressData = () => {
    const currentAddress = userAddressData?.find((el) => el.id === addressId);
    if (currentAddress) {
      const receiverPhone =
        parsePhoneNumber(currentAddress?.receiver_phone)?.number?.significant ??
        "";

      setValue("addressLabel", currentAddress?.name);
      setValue("recipientName", currentAddress?.receiver_name);
      setValue("phoneNumber", receiverPhone);
      setValue("fullAddress", currentAddress?.address_detail);
      setValue("zipCode", currentAddress?.postal_code);
      setValue("is_default", currentAddress?.is_default);
    }
    if (userAddressData?.length === 0) {
      setValue("is_default", true);
    }
  };

  const changeValueAddress = (e) => {
    const { name, value } = e.target;
    setValue(name, value, { shouldValidate: value.length <= 1 });
  };

  const changeValueNumber = (e) => {
    const { name, value } = e.target;

    const isNumber = Number(value) || value === "";
    const maxPhoneNumber = name === "phoneNumber" && value.length <= 13;
    const maxZipCode = name === "zipCode" && value.length <= 6;

    if (isNumber && (maxZipCode || maxPhoneNumber)) {
      setValue(name, value, { shouldValidate: true });
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  const navigateBackWithTimeout = () => {
    setTimeout(() => {
      goBack();
    }, 10);
  };
  // #endregion

  // #region fetch
  const payload = {
    name: watch("addressLabel"),
    country_id: "SG",
    country_name: "Singapore",
    address_detail: watch("fullAddress"),
    is_default: watch("is_default"),
    receiver_name: watch("recipientName"),
    receiver_phone: `${watch("countryCodeNumber")}${watch("phoneNumber")}`,
    postal_code: watch("zipCode"),
  };

  const updateAddress = async () => {
    try {
      setIsSubmitting(true);

      await API.patch(`/users/${userId}/addresses/${addressId}`, payload);
      sendNotification({
        msg: "Success update address",
        variant: "success",
      });

      navigateBackWithTimeout();
    } catch (error) {
      sendNotification({
        msg: "Unable to update address",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAddress = async () => {
    try {
      setIsSubmitting(true);

      await API.post(`users/${userId}/addresses`, payload);

      sendNotification({
        msg: "Success add address",
        variant: "success",
      });

      navigateBackWithTimeout();
    } catch (error) {
      sendNotification({
        msg: "Unable to add address",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAddress = async () => {
    const isPrimary = watch("is_default");

    if (isPrimary) {
      sendNotification({
        msg: "Primary Address cannot be deleted, please set primary address to another address first",
        variant: "error",
      });
      closeModal();
    } else {
      try {
        setIsSubmitting(true);

        await API.delete(`users/${userId}/addresses/${addressId}`);
        sendNotification({
          msg: "Your address has been successfully deleted",
          variant: "success",
        });

        navigateBackWithTimeout();
      } catch (error) {
        sendNotification({
          msg: "Unable to update delete address",
          variant: "error",
        });
        closeModal();
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    getAndSetAddressData();
  }, []);
  // #endregion

  const isAddNew = !addressId;

  return (
    <Fragment>
      <HeaderNavigation title="Your Address" goBack={goBack} />
      <Container className={classes.container}>
        <Grid container xs={12} gap={2} className={classes.inputContainer}>
          <Grid item xs={12}>
            <p>*Address Label</p>
            <InputTextField
              name="addressLabel"
              value={watch("addressLabel")}
              handleChange={changeValueAddress}
              helperText={errors?.addressLabel?.message}
              placeholder="Insert your Address Label"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <p>*Recipient</p>
            <InputTextField
              name="recipientName"
              value={watch("recipientName")}
              handleChange={changeValueAddress}
              helperText={errors?.recipientName?.message}
              placeholder="Insert the recipient name here"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <p>*Country</p>
            <InputTextField disabled value="Singapore" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <p>*Phone Number</p>
            <InputTextField
              name="phoneNumber"
              value={watch("phoneNumber")}
              handleChange={changeValueNumber}
              helperText={errors?.phoneNumber?.message}
              error={false}
              placeholder="Insert your phone number here"
              sx={{
                overflow: "hidden",
              }}
              InputProps={{
                maxLength: 12,
                startAdornment: (
                  <InputAdornment position="start">
                    <Box className={classes.phoneNumberInput}>+65</Box>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <p>*ZIP Code</p>
            <InputTextField
              name="zipCode"
              value={watch("zipCode")}
              handleChange={changeValueNumber}
              helperText={errors?.zipCode?.message}
              error={false}
              placeholder="Insert the ZIP Code"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <p>*Full Address</p>
            <InputTextField
              name="fullAddress"
              value={watch("fullAddress")}
              onChange={changeValueAddress}
              helperText={errors?.fullAddress?.message}
              placeholder="Insert your full address here"
              fullWidth
            />
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                className={isAddNew ? classes.checkbox : undefined}
                disabled={
                  (!isAddNew && watch("is_default")) ||
                  userAddressData?.length === 0
                }
                checked={watch("is_default")}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => {
                  setValue("is_default", e.target.checked);
                }}
              />
            }
            label="Set to primary address "
          />
          <Grid container gap={2} xs={12} className={classes.buttonContainer}>
            {!isAddNew && (
              <Grid
                container
                xs={12}
                className={classes.deleteButton}
                onClick={openModal}
              >
                Delete Address
              </Grid>
            )}
            <PrimaryButton
              fullWidth
              onClick={handleSubmit(isAddNew ? addAddress : updateAddress)}
              className={classes.submitButton}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirm"
              )}
            </PrimaryButton>
          </Grid>
        </Grid>
        <CenterModal
          open={isOpenModal}
          title="Delete Address"
          subtitle="Are you sure want to Delete the Address?"
          closeModal={closeModal}
        >
          <Grid
            container
            justifyContent="flex-end"
            className={classes.modalButtonContainer}
            gap={1}
          >
            <SecondaryButton disabled={isSubmitting} onClick={closeModal}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              disabled={isSubmitting}
              onClick={() => handleDeleteAddress()}
            >
              Confirm
            </PrimaryButton>
          </Grid>
        </CenterModal>
      </Container>
    </Fragment>
  );
};

export default EditAddress;
