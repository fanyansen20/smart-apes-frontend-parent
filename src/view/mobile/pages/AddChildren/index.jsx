import { yupResolver } from "@hookform/resolvers/yup";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { getAllChildren } from "../../../../store/children/getAllChildren";

// MUI
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

// Components
import PrimaryButton from "../../../../components/PrimaryButton";
import InputTextField from "../../../../components/form/InputTextField/InputTextField";
import SelectSearch from "../../../../components/form/SelectSearch/SelectSearch";
import HeaderNavigation from "../../components/HeaderNavigation";

// Helper
import { differenceInYears, sub } from "date-fns";
import Cookies from "universal-cookie";
import { date, object, string } from "yup";
import { API } from "../../../../config/api";
import useNotification from "../../../../hooks/useNotification";

// Styles
import classes from "./_AddChildren.module.scss";

// Assets
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/calendar-2.svg";
import { ReactComponent as ProfileIcon } from "../../../../assets/icons/profile.svg";
import { ReactComponent as UploadImageIcon } from "../../../../assets/icons/upload-image-2.svg";
import BoyDefaultImg from "../../../../assets/images/child-boy.png";
import GirlDefaultImg from "../../../../assets/images/child-girl.png";

// Constants
import { genderOptions } from "../../../../constants/gender";

const AddChildren = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_msg, sendNotification] = useNotification();

  // #region cookies
  const cookies = new Cookies();
  // #endregion

  // #region state
  const [levelOptions, setLevelOptions] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // #endregion

  // #region form
  let childSchema = object({
    name: string().min(2).required("Name cannot be empty"),
    level: object().required("Please select child level").nullable(),
    gender: object().required("Please select child gender").nullable(),
    birthDate: date()
      .required("Please insert child's date of birth")
      .test(
        "min-age",
        "Your child must be at least 2 years old",
        function (value) {
          const age = differenceInYears(new Date(), value);
          return age >= 2;
        }
      ),
  });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(childSchema),
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

  const onSubmit = async (childData) => {
    try {
      setIsLoading(true);

      // Get parent id
      const parent_id = cookies.get("parent_id");

      // Handle upload default image if no image provided
      let file;
      if (!profileImage) {
        const response = await fetch(
          childData?.gender.code === "male" ? BoyDefaultImg : GirlDefaultImg
        );

        const blob = await response.blob();
        file = new File([blob], "image.jpg", { type: blob.type });
      }

      // Set formData
      const payload = new FormData();
      payload.set("full_name", childData?.name);
      payload.set("gender", childData?.gender?.code);
      payload.set("school_education_category", childData?.level?.name);
      payload.set("parent_id", parent_id);
      payload.set(
        "dob",
        childData?.birthDate
          ? new Date(childData.birthDate).toISOString()
          : null
      );
      if (profileImage) {
        payload.set("profile_pic", profileImage, profileImage.name);
      } else {
        payload.set("profile_pic", file, file.name);
      }

      // Set formdata axios config
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // POST data
      await API.post("/children", payload, config);

      // Send alert
      sendNotification({
        msg: "Children added successfully",
        variant: "success",
      });

      reset();
      dispatch(getAllChildren());
      goBack();
    } catch (error) {
      // Send alert
      sendNotification({
        msg: "Unable to add children",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // #endregion

  // #region function
  const handleUploadImage = (e) => {
    setProfileImage(e.target.files[0]);
    const tempImgUrl = URL.createObjectURL(e.target.files[0]);
    setProfileImagePreview(tempImgUrl);
  };

  const goBack = () => {
    navigate(-1);
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    getSchoolLevel();
  }, []);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Add New Child" goBack={goBack} />
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
            <Button className={classes.avatar} component="label">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="avatar"
                  className={classes.imagePreview}
                />
              ) : (
                <ProfileIcon className={classes.profileIcon} />
              )}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
              <UploadImageIcon className={classes.uploadIcon} />
            </Button>
          </Grid>
          <Grid xs={12}>
            <div className={classes.formControl}>
              <p className={classes.title}>Child Name</p>
              <Controller
                name="name"
                control={control}
                render={({ field: { ref, value, onChange } }) => (
                  <InputTextField
                    value={value}
                    inputRef={ref}
                    handleChange={onChange}
                    placeholder="Insert your child name"
                    fullWidth
                  />
                )}
              />
              <p className={classes.errorText}>{errors?.name?.message}</p>
            </div>
          </Grid>
          <Grid xs={12}>
            <div className={classes.formControl}>
              <p className={classes.title}>Child Level</p>
              <Controller
                name="level"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectSearch
                    options={levelOptions}
                    selected={value}
                    setSelected={onChange}
                    placeHolder="Select Level"
                    placeholder="Select Child Level"
                  />
                )}
              />
              <p className={classes.errorText}>{errors?.level?.message}</p>
            </div>
          </Grid>
          <Grid xs={12}>
            <div className={classes.formControl}>
              <p className={classes.title}>Gender</p>
              <Controller
                name="gender"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectSearch
                    options={genderOptions}
                    selected={value}
                    setSelected={onChange}
                    placeHolder="Select Gender"
                    placeholder="Select Child Gender"
                  />
                )}
              />
              <p className={classes.errorText}>{errors?.gender?.message}</p>
            </div>
          </Grid>
          <Grid xs={12}>
            <div className={classes.formControl}>
              <p className={classes.title}>Birth Date</p>
              <Controller
                name="birthDate"
                control={control}
                render={({ field: { ref, value, onChange } }) => (
                  <DatePicker
                    inputRef={ref}
                    inputFormat="dd/mm/yy"
                    maxDate={sub(new Date(), {
                      years: 2,
                    })}
                    value={value}
                    onChange={onChange}
                    className={classes.datePicker}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={Boolean(errors?.birthDate?.message)}
                      />
                    )}
                  />
                )}
              />
              <p className={classes.errorText}>{errors?.birthDate?.message}</p>
            </div>
          </Grid>
        </Grid>
        <PrimaryButton
          className={classes.submitButton}
          fullWidth
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Add New Child"
          )}
        </PrimaryButton>
      </Container>
    </Fragment>
  );
};

export default AddChildren;
