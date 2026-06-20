import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { getAllChildren } from "../../../../store/children/getAllChildren";
import { getChildrenProfile } from "../../../../store/user/childSlice";

// MUI
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

// Components
import PrimaryButton from "../../../../components/PrimaryButton";
import InputTextField from "../../../../components/form/InputTextField/InputTextField";
import SelectSearch from "../../../../components/form/SelectSearch/SelectSearch";
import BottomModal from "../../components/BottomModal";
import HeaderNavigation from "../../components/HeaderNavigation";

// Helper
import { sub } from "date-fns";
import { object, string } from "yup";
import { API } from "../../../../config/api";
import useNotification from "../../../../hooks/useNotification";

// Styles
import classes from "./_EditChildren.module.scss";

// Assets
import { ReactComponent as BinIcon } from "../../../../assets/icons/bin.svg";
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/calendar-2.svg";
import { ReactComponent as CameraIcon } from "../../../../assets/icons/camera.svg";
import { ReactComponent as ProfileIcon } from "../../../../assets/icons/profile.svg";
import { ReactComponent as UploadImageIcon } from "../../../../assets/icons/upload-image-2.svg";

// Constants
import { genderOptions } from "../../../../constants/gender";

const AddChildren = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { childrenId } = useParams();
  const [_msg, sendNotification] = useNotification();

  // #region state
  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();
  const [name, setName] = useState();
  const [level, setLevel] = useState();
  const [levelOptions, setLevelOptions] = useState([]);
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    level: "",
    gender: "",
    birthDate: "",
  });
  const [resError, setResError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  // #endregion

  // #region form
  let childSchema = object({
    name: string().min(2).required("Name cannot be empty"),
  });

  // #endregion

  // #region fetch function
  const getSchoolLevel = async () => {
    try {
      const res = await API.get(`/school-education-categories?pretty=true`);

      let options = [];

      res?.data?.forEach((item) => {
        let option = item.children.map((val) => {
          return {
            ...val,
            label: val.name,
          };
        });
        options = [...options, ...option];
      });

      setLevelOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  const getAndSetProfileData = async () => {
    try {
      const res = await dispatch(getChildrenProfile(childrenId));
      const profileData = {
        ...res.payload,
        levelData: { label: res.payload.level ?? "-" },
        genderData: {
          label: res.payload.gender === "male" ? "Male" : "Female",
        },
        birthDate: res.payload.dob ? new Date(res.payload.dob) : new Date(),
      };

      setName(profileData.full_name);
      setLevel(profileData.levelData);
      setGender(profileData.genderData);
      setBirthDate(profileData.birthDate);
      setProfileImagePreview(profileData.profile_pic);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      // Clear alert
      setResError();
      setIsLoading(true);

      // Validate input
      await childSchema
        .validate({ name }, { abortEarly: false })
        .catch(function (e) {
          throw new Error(e);
        });

      // Set formData
      const payload = new FormData();
      payload.set("full_name", name);
      if (profileImage) {
        payload.set("profile_pic", profileImage, profileImage.name);
      }

      // Set formdata axios config
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // PATCH data
      await API.patch(`/children/${childrenId}`, payload, config);

      // Send alert
      sendNotification({
        msg: "Profile changed successfully",
        variant: "success",
      });

      // Update
      dispatch(getAllChildren());
      goBack();
    } catch (error) {
      setResError(error.message);
      // Send alert
      sendNotification({
        msg: "Unable to change profile",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // #endregion

  // #region function
  const handleValidation = async () => {
    try {
      setErrors({});
      setResError();
      // Validate input
      await childSchema
        .validate({ name, level, gender, birthDate }, { abortEarly: false })
        .catch(function (e) {
          let _errors = {};

          for (let i = 0; i < e.inner.length; i++) {
            _errors[e.inner[i].path] = e.inner[i].message;
          }

          setErrors(_errors);
          throw new Error(e);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUploadImage = (e) => {
    setIsOpenModal(false);
    setProfileImage(e.target.files[0]);
    const tempImgUrl = URL.createObjectURL(e.target.files[0]);
    setProfileImagePreview(tempImgUrl);
  };

  const handleRemoveProfilePhoto = () => {
    setIsOpenModal(false);

    const tempImg = require(`../../../../assets/images/child-${
      gender.label === "Male" ? "boy" : "girl"
    }.png`);
    fetch(tempImg)
      .then((res) => res.blob())
      .then((blob) => {
        setProfileImagePreview(tempImg);
        setProfileImage(blob);
      });
  };

  const goBack = () => {
    navigate(-1);
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    setIsMounted(true);
    getSchoolLevel();
    if (childrenId) {
      getAndSetProfileData();
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      handleValidation();
    }
  }, [name]);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Edit Profile" goBack={goBack} />
      <Container
        container
        className={classes.content}
        sx={{
          paddingLeft: "20px !important",
          paddingRight: "20px !important",
        }}
      >
        <Grid>
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
              <p>Child Name</p>
              <InputTextField
                value={name}
                handleChange={(e) => setName(e.target.value)}
                helperText={errors?.name}
                placeholder="Insert your child name"
                fullWidth
              />
            </div>
          </Grid>
          <Grid xs={12}>
            <div className={classes.formControl}>
              <p>Child Level</p>
              <SelectSearch
                options={levelOptions}
                selected={level}
                setSelected={setLevel}
                placeHolder="Select Level"
                helperText={errors?.level}
                placeholder="Select Child Level"
                disabled
              />
            </div>
          </Grid>
          <Grid xs={12}>
            <div className={classes.formControl}>
              <p>Gender</p>
              <SelectSearch
                options={genderOptions}
                selected={gender}
                setSelected={setGender}
                placeHolder="Select Gender"
                helperText={errors?.gender}
                placeholder="Select Child Gender"
                disabled
              />
            </div>
          </Grid>
          <Grid xs={12}>
            <div className={classes.formControl}>
              <p>Birth Date</p>
              <DatePicker
                inputFormat="dd/mm/yy"
                maxDate={sub(new Date(), {
                  years: 2,
                })}
                value={birthDate}
                onChange={(val) => setBirthDate(val)}
                className={classes.datePicker}
                slots={{
                  openPickerIcon: CalendarIcon,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    error={Boolean(errors?.birthDate)}
                  />
                )}
                disabled
              />
              <p className={classes.errorText}>{errors?.birthDate?.message}</p>
            </div>
          </Grid>
        </Grid>
        {resError && <Alert severity="error">{resError}</Alert>}
        <PrimaryButton
          className={classes.submitButton}
          fullWidth
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save Changes"
          )}
        </PrimaryButton>
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

export default AddChildren;
