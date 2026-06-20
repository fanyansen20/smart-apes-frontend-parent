import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getProfile, setProfile } from "../../../../../store/user/userSlice";

// MUI
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// Hook Form
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";

// Components
import PrimaryButton from "../../../../../components/PrimaryButton";
import InputTextField from "../../../../../components/form/InputTextField/InputTextField";
import SelectSearch from "../../../../../components/form/SelectSearch/SelectSearch";
import BottomModal from "../../../components/BottomModal";
import HeaderNavigation from "../../../components/HeaderNavigation";

// Helper
import { API } from "../../../../../config/api";
import { mbSize } from "../../../../../helper/getFileSize";
import useNotification from "../../../../../hooks/useNotification";

// Styles
import classes from "./_PersonalInformation.module.scss";

// Assets
import { ReactComponent as BinIcon } from "../../../../../assets/icons/bin.svg";
import { ReactComponent as CameraIcon } from "../../../../../assets/icons/camera.svg";
import { ReactComponent as ProfileIcon } from "../../../../../assets/icons/profile.svg";
import { ReactComponent as UploadImageIcon } from "../../../../../assets/icons/upload-image-2.svg";

const PersonalInformationSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cookies
  const cookies = new Cookies();

  // notification
  const [_msg, sendNotification] = useNotification();

  // #region form
  let profileSchema = object({
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
    selectedCountry: string().required("Country is Required"),
  });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(profileSchema),
  });
  // #endregion

  // #region useState
  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  // const [languageOptions, setLanguageOptions] = useState([]);
  // const [selectedLanguage, setSelectedLanguage] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // #endregion

  // #region function
  const goBack = () => {
    navigate(-1);
  };

  /**
   *
   * @param {{
   * id: string
   * name: string
   * code: string
   * country_locale:string
   * currency_code: string
   * currency_symbol: string
   * phone_code: string
   * timezone: string
   * remarks: string
   * }} country
   */
  const setCountryValue = (country) => {
    setSelectedCountry(country);
    setValue("selectedCountry", country?.id, { shouldValidate: true });
  };

  const handleUploadImage = (e) => {
    if (mbSize(e.target.files[0].size) > 2) {
      sendNotification({
        msg: "Image cannot be more than 2MB",
        variant: "error",
      });
    } else {
      setIsOpenModal(false);
      setProfileImage(e.target.files[0]);
      const tempImgUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImagePreview(tempImgUrl);
    }
  };

  const handleRemoveProfilePhoto = () => {
    setIsOpenModal(false);

    const tempImg = require(`../../../../../assets/images/user-profile.png`);
    fetch(tempImg)
      .then((res) => res.blob())
      .then((blob) => {
        setProfileImagePreview(tempImg);
        setProfileImage(blob);
      });
  };

  /**
   *
   * @param {profileSchema} submitData
   */
  const onSubmit = async (submitData) => {
    try {
      setIsSubmitting(true);

      const userId = cookies.get("parent_id");

      const payload = {
        first_name: submitData.firstName,
        last_name: submitData.lastName,
        country_id: submitData?.selectedCountry,
      };

      if (profileImage) {
        payload.profile_pic = profileImage;
      }

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      await API.patch(`/users/${userId}`, payload, config);

      // Refresh avatar & profile data
      const res = await dispatch(getProfile());
      const data = unwrapResult(res);
      dispatch(setProfile(data));

      // Send alert
      sendNotification({
        msg: "Profile changed successfully",
        variant: "success",
      });

      setTimeout(() => {
        goBack();
      }, 50);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // #endregion

  // #region fetch
  const getProfileData = async () => {
    try {
      const userId = cookies.get("parent_id");
      const res = await API.get(`/users/${userId}`);

      reset({
        ...getValues(),
        firstName: res.data.first_name ?? "",
        lastName: res.data.last_name ?? "",
        email: res.data.email ?? "",
        selectedCountry: res.data.Country.id ?? "",
      });

      setProfileImagePreview(res.data.profile_pic_500);
      setSelectedCountry({ ...res.data.Country, label: res.data.Country.name });
    } catch (error) {
      console.error(error);
    }
  };

  const getCountry = async () => {
    try {
      const res = await API.get("/locations/countries");
      const countryList = res.data.results.map((item) => {
        return {
          ...item,
          label: item.name,
        };
      });
      setCountryOptions(countryList);
    } catch (error) {
      console.error(error);
    }
  };

  // const getLanguages = async () => {
  //   try {
  //     const res = await API.get("/languages");
  //     const languageList = res.data.results.map((item) => {
  //       return {
  //         ...item,
  //         label: item.name,
  //       };
  //     });
  //     setLanguageOptions(languageList);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // #endregion

  // #region useEffect
  useEffect(() => {
    getProfileData();
    getCountry();
    // getLanguages();
  }, []);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Personal Information" goBack={goBack} />
      <Container className={classes.container}>
        <Grid container gap={1}>
          <Grid xs={12} className={classes.avatarContainer}>
            <Button
              className={classes.avatar}
              component="label"
              onClick={() => setIsOpenModal(true)}
            >
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="avatar"
                  className={classes.imagePreview}
                />
              ) : (
                <ProfileIcon className={classes.profileIcon} />
              )}
              <UploadImageIcon className={classes.uploadIcon} />
            </Button>
          </Grid>
          <Grid xs={12}>
            <div className={classes.formControl}>
              <p className={classes.title}>First Name</p>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { ref, value, onChange } }) => (
                  <InputTextField
                    value={value}
                    inputRef={ref}
                    handleChange={onChange}
                    fullWidth
                  />
                )}
              />
              <p className={classes.errorText}>{errors?.firstName?.message}</p>
            </div>
            <div className={classes.formControl}>
              <p className={classes.title}>Last Name</p>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { ref, value, onChange } }) => (
                  <InputTextField
                    value={value}
                    inputRef={ref}
                    handleChange={onChange}
                    fullWidth
                  />
                )}
              />
              <p className={classes.errorText}>{errors?.lastName?.message}</p>
            </div>
            <div className={classes.formControl}>
              <p className={classes.title}>Email Address</p>
              <InputTextField value={getValues().email} fullWidth disabled />
            </div>
            <div className={classes.formControl}>
              <p className={classes.title}>Country</p>
              <SelectSearch
                className="selectSearch"
                options={countryOptions}
                selected={selectedCountry}
                setSelected={setCountryValue}
                placeHolder="Select Country"
                helperText={errors?.selectedCountry?.message}
              />
            </div>
            {/* <div className={classes.formControl}>
              <p className={classes.title}>Language</p>
              <SelectSearch
                className="selectSearch"
                options={languageOptions}
                selected={selectedLanguage}
                setSelected={setSelectedLanguage}
                placeHolder="Select Language"
              />
            </div> */}
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <PrimaryButton
            className={classes.submitButton}
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Apply Changes"
            )}
          </PrimaryButton>
        </div>
        <BottomModal
          open={isOpenModal}
          title="Edit Picture"
          closeModal={() => setIsOpenModal(false)}
        >
          <Grid container xs={12} gap={1}>
            <label className={classes.button}>
              <Stack direction="row" alignItems="center">
                <CameraIcon />
                <Typography className={classes.buttonTitle}>
                  Change new picture
                </Typography>
              </Stack>
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
            <Button
              className={classes.removeButton}
              onClick={handleRemoveProfilePhoto}
            >
              <Stack direction="row" alignItems="center">
                <BinIcon />
                <Typography className={classes.redButtonTitle}>
                  Remove photo
                </Typography>
              </Stack>
            </Button>
          </Grid>
        </BottomModal>
      </Container>
    </Fragment>
  );
};

export default PersonalInformationSettings;
