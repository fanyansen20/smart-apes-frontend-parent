// React
import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// MUI & Styles
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import classes from "./ModalAddChildren.module.scss";

// Components
import { ReactComponent as Profile } from "../../../assets/icons/profile.svg";
import InputTextField from "../../../components/form/InputTextField/InputTextField";
import SelectSearch from "../../form/SelectSearch/SelectSearch";

// Helper
import { differenceInYears, sub } from "date-fns";
import Cookies from "universal-cookie";
import { date, object, string } from "yup";
import { API } from "../../../config/api";
import useNotification from "../../../hooks/useNotification";

// Assets
import BoyDefaultImg from "../../../assets/images/child-boy.png";
import GirlDefaultImg from "../../../assets/images/child-girl.png";

// Static
const genderOptions = [
  { label: "Male", code: "male" },
  { label: "Female", code: "female" },
];

const ModalAddChildren = ({
  open,
  handleClose,
  getChildren,
  slideCarouselToLast,
}) => {
  const dispatch = useDispatch();
  const [_msg, sendNotification] = useNotification();
  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();
  const [levelOptions, setLevelOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();

  // Load options on mount
  useEffect(() => {
    getSchoolLevel();
  }, []);

  // Handle select image
  const handleUploadImage = (e) => {
    setProfileImage(e.target.files[0]);
    const tempImgUrl = URL.createObjectURL(e.target.files[0]);
    setProfileImagePreview(tempImgUrl);
  };

  // Handle remove preview image
  const handleRemovePreview = () => {
    setProfileImagePreview("");
    setProfileImage();
  };

  //Yup Schema
  let childSchema = object({
    name: string()
      .min(2)
      .required("Name cannot be empty")
      .typeError("Name cannot be empty"),
    level: object().required("Please select child level").nullable(),
    gender: object().required("Please select child gender").nullable(),
    birthDate: date()
      .required("Please insert child's date of birth")
      .typeError("Please insert child's date of birth")
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
    defaultValues: {
      name: "",
      level: "",
      gender: "",
      birthDate: "",
    },
  });

  // Get level options
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

  // Handle submit data
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

      dispatch(getChildren());
      slideCarouselToLast();
      closeModal();
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

  const resetForm = () => {
    setProfileImage();
    setProfileImagePreview();
    reset({ name: null, level: null, gender: null, birthDate: null });
  };

  // Close modal
  const closeModal = () => {
    resetForm();
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade className={classes.modal} in={open}>
        <Box>
          <Grid container>
            <Grid item md={12}>
              <p className={classes.modalTitle}>Add New Child</p>
            </Grid>
            <Grid item md={12}>
              <Grid container>
                <Grid item md={4}>
                  <div className={classes.profileSection}>
                    {profileImagePreview ? (
                      <div>
                        {/* <Cancel
                          onClick={handleRemovePreview}
                          className={classes.removeImg}
                        /> */}
                        <img src={profileImagePreview} alt="avatar" />
                      </div>
                    ) : (
                      <>
                        <Profile className={classes.noProfile} />
                        <p>No profile picture yet.</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item md={8}>
                  <div className={classes.uploadSection}>
                    {profileImagePreview ? (
                      <Button onClick={handleRemovePreview}>
                        Remove Photo
                      </Button>
                    ) : (
                      <Button component="label">
                        Upload Profile Picture{" "}
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={handleUploadImage}
                        />
                      </Button>
                    )}
                    <p>
                      File Maximum size is 10 MB. Only allowed file with
                      extension .JPG , .JPEG and .PNG
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <div className={classes.formControl}>
                <p>Child Name*</p>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { ref, value, onChange } }) => (
                    <InputTextField
                      value={value}
                      inputRef={ref}
                      handleChange={onChange}
                      error={Boolean(errors?.name?.message)}
                      helperText={errors?.name?.message}
                      placeholder="Insert your Child Name"
                      fullWidth
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.formControl}>
                <p>Child Level*</p>
                <Controller
                  name="level"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectSearch
                      options={levelOptions}
                      selected={value}
                      setSelected={onChange}
                      placeHolder="Select Level"
                      helperText={errors?.level?.message}
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.formControl}>
                <p>Gender*</p>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectSearch
                      options={genderOptions}
                      selected={value}
                      setSelected={onChange}
                      placeHolder="Select Gender"
                      helperText={errors?.gender?.message}
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.formControl}>
                <p>Birth Date</p>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field: { ref, value, onChange } }) => (
                    <DatePicker
                      inputRef={ref}
                      inputFormat="DD/MM/YYYY"
                      maxDate={sub(new Date(), {
                        years: 2,
                      })}
                      value={value}
                      onChange={onChange}
                      className={classes.datePicker}
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
                <p className={classes.errorText}>
                  {errors?.birthDate?.message}
                </p>
              </div>
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit(onSubmit)}
            className={classes.btnSubmit}
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? (
              <CircularProgress size={14} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
          <Button onClick={closeModal} className={classes.btnCancel} fullWidth>
            Cancel
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default memo(ModalAddChildren);
