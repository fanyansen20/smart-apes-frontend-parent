// React
import { useState, useEffect } from "react";
import { API } from "../../../config/api";
import Cookies from "universal-cookie";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setProfile, getProfile } from "../../../store/user/userSlice";
import useNotification from "../../../hooks/useNotification";

// MUI
import { Grid, Button, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

// Components
import InputTextField from "../../form/InputTextField/InputTextField";
import SelectSearch from "../../form/SelectSearch/SelectSearch";
import { mbSize } from "../../../helper/getFileSize";
import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "./validationSchema";
import {
  setInitEmail,
  resetStatus,
  resetMessage,
} from "../../../store/checkEmail/checkEmailSlice";

const PersonalInformation = () => {
  const {
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      profileImage: undefined,
      profileImagePreview: "",
      selectedCountry: "",
    },
    shouldFocusError: true,
    resolver: yupResolver(profileSchema),
  });
  const cookies = new Cookies();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState();
  const [_languageOptions, setLanguageOptions] = useState([]);

  // Notistack
  const [_msg, sendNotification] = useNotification();

  // Redux
  const dispatch = useDispatch();

  // Onload
  useEffect(() => {
    getProfileData();
    getCountry();
    getLanguages();
  }, []);

  // Handle select image
  const handleUploadImage = (e) => {
    if (mbSize(e.target.files[0].size) > 2) {
      sendNotification({
        msg: "Image cannot be more than 2MB",
        variant: "error",
      });
    } else {
      const tempImgUrl = URL.createObjectURL(e.target.files[0]);
      setValue("profileImage", e.target.files[0]);
      setValue("profileImagePreview", tempImgUrl);
    }
  };

  const controlledForm = (name) => useController({ name, control });

  // Get Profile
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
        profileImagePreview: res.data.profile_pic_500 ?? "",
      });

      // Set states
      setCountry({ ...res.data.Country, label: res.data.Country.name });
      dispatch(setInitEmail(res.data.email ?? ""));
    } catch (error) {
      console.error(error);
    }
  };

  // Get countries
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

  // Get languages
  const getLanguages = async () => {
    try {
      const res = await API.get("/languages");

      const languageList = res.data.results.map((item) => {
        return {
          ...item,
          label: item.name,
        };
      });

      setLanguageOptions(languageList);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle submit
  const handleSavePersonalInformation = async (submitData) => {
    try {
      setIsLoadingSave(true);
      // Get user id
      const userId = cookies.get("parent_id");

      // Set formData
      const payload = {
        first_name: submitData.firstName,
        last_name: submitData.lastName,
        country_id: submitData?.selectedCountry,
      };

      if (submitData.profileImage)
        payload.profile_pic = submitData.profileImage;

      // Set formdata axios config
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
    } catch (error) {
      console.error(error);
      // Send alert
      sendNotification({
        msg: "Unable change profile. Please try again later",
        variant: "error",
      });
    } finally {
      setIsLoadingSave(false);
    }
  };

  const setCountryValue = (newValue) => {
    setCountry(newValue);
    setValue("selectedCountry", newValue?.id, { shouldValidate: true });
  };

  const resetEmail = () => {
    dispatch(resetStatus());
    dispatch(resetMessage());
    setValue("emailExistChecker", null, { shouldValidate: true });
  };

  return (
    <div className="container-profile-content">
      <p className="title">Personal Information</p>
      <Grid container>
        <Grid item md={5} xs={12}>
          <div className="container-profile-info-left">
            <div className="container-profile-info-avatar">
              <div className="profile-info-avatar">
                {watch("profileImagePreview") ? (
                  <img src={watch("profileImagePreview")} alt="avatar" />
                ) : (
                  <>
                    <PersonIcon className="profile-avatar-icon" />
                    <p className="profile-avatar-text">
                      No profile picture yet.
                    </p>
                  </>
                )}
              </div>
            </div>
            <Button fullWidth className="profile-btn-primary" component="label">
              {watch("profileImagePreview") ? "Change" : "Upload"} Profile
              Picture
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </Button>
            <p className="profile-upload-info">
              File Maximum size is 2 MB. Only allowed file with extension .JPG ,
              .JPEG and .PNG
            </p>
          </div>
        </Grid>
        <Grid item md={7} xs={12}>
          <Grid container className="container-profile-info-right" spacing={2}>
            <Grid item md={12}>
              <InputTextField
                {...controlledForm("firstName").field}
                type="text"
                label="First Name"
                name="firstName"
                error={Boolean(errors?.firstName)}
                helperText={errors?.firstName?.message}
              />
            </Grid>
            <Grid item md={12}>
              <InputTextField
                {...controlledForm("lastName").field}
                type="text"
                label="Last Name"
                name="lastName"
                error={Boolean(errors?.lastName)}
                helperText={errors?.lastName?.message}
              />
            </Grid>
            <Grid item md={12}>
              <InputTextField
                type="text"
                label="Email Address"
                name="email"
                value={watch("email")}
                disabled
                onChange={(e) => {
                  if (errors?.emailExistChecker) resetEmail();
                  setValue("email", e.target.value, { shouldValidate: true });
                }}
                onBlur={(e) => {
                  setValue("emailExistChecker", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                error={Boolean(errors?.email || errors?.emailExistChecker)}
                helperText={
                  errors?.email?.message || errors?.emailExistChecker?.message
                }
              />
            </Grid>
            <Grid item md={12}>
              <p className="labelSelect">Country</p>
              <SelectSearch
                className="selectSearch"
                options={countryOptions}
                selected={country}
                setSelected={setCountryValue}
                // handleSearch={(e) => console.log("country")}
                placeHolder="Select Country"
                helperText={errors?.selectedCountry?.message}
              />
            </Grid>
            {/* <Grid item md={12}>
              <p className="labelSelect">Language</p>
              <SelectSearch
                className="selectSearch"
                options={languageOptions}
                selected={language}
                setSelected={setLanguage}
                // handleSearch={(e) => console.log("lang")}
                placeHolder="Select Language"
              />
            </Grid> */}
            <Grid sx={{ textAlign: "right" }} item md={12}>
              <Button
                onClick={handleSubmit(handleSavePersonalInformation)}
                className="profile-btn-primary"
              >
                Edit Information
                {isLoadingSave && (
                  <CircularProgress
                    color="inherit"
                    size={16}
                    sx={{ marginLeft: "0.5em" }}
                  />
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalInformation;
