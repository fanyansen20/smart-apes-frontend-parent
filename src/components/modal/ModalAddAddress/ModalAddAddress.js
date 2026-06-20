// React
import { useEffect } from "react";

// MUI & styles
import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Grid,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import classes from "./ModalAddAddress.module.scss";

// Redux
import { useSelector } from "react-redux";

// Component
import InputTextField from "../../../components/form/InputTextField/InputTextField";

// Helper
import { yupResolver } from "@hookform/resolvers/yup";
import { parsePhoneNumber } from "awesome-phonenumber";
import { useForm } from "react-hook-form";
import { API } from "../../../config/api";
import useNotification from "../../../hooks/useNotification";
import userAddressSchema from "./userAddressSchema";

const ModalAddAddress = ({
  open,
  handlerCloseModalAddress,
  getDataUserAddress,
  dataAddress,
  isLoadData,
  title,
}) => {
  const { id: userId } = useSelector((store) => store.user.userData);
  const { userAddressData } = useSelector((store) => store.userAddress);

  const [_msg, sendNotification] = useNotification();
  const receiverPhone =
    parsePhoneNumber(dataAddress?.receiver_phone)?.number?.significant ?? "";

  const {
    watch,
    formState: { errors },
    handleSubmit,
    reset,
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

  const isPrimary =
    userAddressData?.length === 0 ||
    (watch("is_default") && dataAddress?.is_default);

  useEffect(() => {
    if (dataAddress) {
      setValue("addressLabel", dataAddress?.name);
      setValue("recipientName", dataAddress?.receiver_name);
      setValue("phoneNumber", receiverPhone);
      setValue("fullAddress", dataAddress?.address_detail);
      setValue("zipCode", dataAddress?.postal_code);
    }
  }, [open]);

  useEffect(() => {
    if (userAddressData?.length === 0) {
      return setValue("is_default", true);
    }

    if (dataAddress) {
      return setValue("is_default", dataAddress?.is_default);
    }
  }, [dataAddress, open]);

  // Payload
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

  const updateAddress = async () => {
    try {
      await API.patch(`/users/${userId}/addresses/${dataAddress?.id}`, payload);
      sendNotification({
        msg: "Success update address",
        variant: "success",
      });
      handlerCloseModalAddress();
      getDataUserAddress();
      reset();
    } catch (error) {
      sendNotification({
        msg: "Unable to update address",
        variant: "error",
      });
    }
    isLoadData(false);
  };

  const handlerAddAddress = async () => {
    isLoadData(true);
    try {
      await API.post(`users/${userId}/addresses`, payload);

      sendNotification({
        msg: "Success add address",
        variant: "success",
      });

      handlerCloseModalAddress();
      getDataUserAddress();
      reset();
    } catch (error) {
      sendNotification({
        msg: "Unable to add address",
        variant: "error",
      });
    }
    isLoadData(false);
  };

  const closeModal = () => {
    reset();
    handlerCloseModalAddress();
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      disableRestoreFocus
      closeAfterTransition
    >
      <Fade className={classes.modalAddress} in={open}>
        <Grid>
          <div className={classes.imageIllustration}></div>
          <Box className={classes.formInputAddress}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <p className={classes.modalTitle}>
                  {title || "Add New Address"}
                </p>
              </Grid>
              <Grid item md={12}>
                <div className={classes.formControl}>
                  <p>*Address Label</p>
                  <InputTextField
                    name="addressLabel"
                    value={watch("addressLabel")}
                    handleChange={changeValueAddress}
                    helperText={errors?.addressLabel?.message}
                    placeholder="Insert your Address Label"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={12}>
                <div className={classes.formControl}>
                  <p>*Recipient </p>
                  <InputTextField
                    name="recipientName"
                    value={watch("recipientName")}
                    handleChange={changeValueAddress}
                    helperText={errors?.recipientName?.message}
                    placeholder="Insert the recipient name here"
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid item md={12}>
                <div className={classes.formControl}>
                  <p>*Country </p>
                  <InputTextField disabled value="Singapore" fullWidth />
                </div>
              </Grid>

              <Grid item md={7}>
                <div className={classes.formControl}>
                  <p>*Phone Number </p>
                  <InputTextField
                    name="phoneNumber"
                    value={watch("phoneNumber")}
                    handleChange={changeValueNumber}
                    helperText={errors?.phoneNumber?.message}
                    error={false}
                    placeholder="Insert your receiver phone number here"
                    sx={{
                      overflow: "hidden",
                    }}
                    InputProps={{
                      maxLength: 12,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box
                            sx={{
                              color: "#626262",
                              background: "#F5F5F5",
                              padding: "16px 8px ",
                              marginLeft: -1.6,
                            }}
                          >
                            +65
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid item md={5}>
                <div className={classes.formControl}>
                  <p>*ZIP Code </p>
                  <InputTextField
                    name="zipCode"
                    value={watch("zipCode")}
                    handleChange={changeValueNumber}
                    helperText={errors?.zipCode?.message}
                    error={false}
                    placeholder="Insert the ZIP Code"
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid item md={12}>
                <div className={classes.formControl}>
                  <p>*Full Address </p>
                  <TextField
                    name="fullAddress"
                    value={watch("fullAddress")}
                    onChange={changeValueAddress}
                    helperText={errors?.fullAddress?.message}
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Insert your full address here"
                  />
                  <FormControlLabel
                    className={classes.checkBoxAddress}
                    control={
                      <Checkbox
                        disabled={isPrimary}
                        checked={watch("is_default")}
                        inputProps={{ "aria-label": "controlled" }}
                        onChange={(e) => {
                          setValue("is_default", e.target.checked);
                        }}
                      />
                    }
                    label="Set to primary address "
                  />
                </div>
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit(
                dataAddress ? updateAddress : handlerAddAddress
              )}
              className={classes.btnConfirm}
              fullWidth
            >
              Confirm
            </Button>
            <Button
              onClick={closeModal}
              className={classes.btnCancel}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ModalAddAddress;
