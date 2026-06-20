// React
import { memo, useEffect, useRef, useState } from "react";

// MUI & Styles
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import classes from "./ModalEditChildren.module.scss";

// Components
import { ReactComponent as Profile } from "../../../assets/icons/profile.svg";
import InputTextField from "../../../components/form/InputTextField/InputTextField";
import SelectSearch from "../../form/SelectSearch/SelectSearch";

// Helper
import { sub } from "date-fns";
import { object, string } from "yup";
import { API } from "../../../config/api";
import useNotification from "../../../hooks/useNotification";

// router
import { useParams } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { getChildrenProfile } from "../../../store/user/childSlice";

// Assets
// import BoyDefaultImg from "../../../assets/images/child-boy.png";
// import GirlDefaultImg from "../../../assets/images/child-girl.png";

// Static
const genderOptions = [
  { label: "Male", code: "male" },
  { label: "Female", code: "female" },
];

/**
 *
 * @param {{
 * open : boolean
 * handleClose : () => {}
 * }} props
 * @returns
 */
const ModalEditChildren = ({ open, handleClose }) => {
  if (!open) return;

  const { id: childrenId } = useParams();
  const dispatch = useDispatch();

  const [_msg, sendNotification] = useNotification();
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

  // Init first render
  const firstRender = useRef(true);

  // Validate Input
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    handleValidation();
    //eslint-disable-next-line
  }, [name, level, gender, birthDate]);

  // Load options on mount
  useEffect(() => {
    getSchoolLevel();
    setProfileData();
  }, []);

  const setProfileData = async () => {
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
    name: string().min(2).required("Name cannot be empty"),
    // level: object().required("Please select child level").nullable(),
  });

  //Handle validation
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

  // Get level options
  const getSchoolLevel = async () => {
    try {
      // changeLoading(param, true);
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
    } finally {
      // changeLoading(param, false);
    }
  };

  // Handle submit data
  const handleSubmit = async () => {
    try {
      // Clear alert
      setResError();

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
      setProfileData();

      handleClose();
    } catch (error) {
      setResError(error.message);
      // Send alert
      sendNotification({
        msg: "Unable to change profile",
        variant: "error",
      });
    }
  };

  // Close modal
  const closeModal = () => {
    handleClose();
    firstRender.current = true;
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
              <p className={classes.modalTitle}>Edit Profile</p>
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
                <InputTextField
                  value={name}
                  handleChange={(e) => setName(e.target.value)}
                  error={false}
                  placeholder="Insert your Child Name"
                  fullWidth
                  helperText={errors?.name}
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.formControl}>
                <p>Child Level*</p>
                <SelectSearch
                  options={levelOptions}
                  selected={level}
                  setSelected={setLevel}
                  // handleSearch={(e) => console.log("level")}
                  placeHolder="Select Level"
                  helperText={errors?.level}
                  disabled
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.formControl}>
                <p>Gender*</p>
                <SelectSearch
                  options={genderOptions}
                  selected={gender}
                  setSelected={setGender}
                  // handleSearch={(e) => console.log("gender")}
                  placeHolder="Select Gender"
                  helperText={errors?.gender}
                  disabled
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <div className={classes.formControl}>
                <p>Birth Date</p>
                {/* <InputTextField
                  value={birthDate || ""}
                  handleChange={(e) => setBirthDate(e.target.value)}
                  fullWidth
                  type="date"
                  helperText={errors?.birthDate}
                /> */}
                <DatePicker
                  inputFormat="DD/MM/YYYY"
                  maxDate={sub(new Date(), {
                    years: 2,
                  })}
                  value={birthDate}
                  onChange={(val) => setBirthDate(val)}
                  className={classes.datePicker}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      error={errors?.birthDate ? true : false}
                    />
                  )}
                  disabled
                />
                <p className={classes.errorText}>{errors?.birthDate}</p>
              </div>
            </Grid>
          </Grid>
          {resError && <Alert severity="error">{resError}</Alert>}
          <Button
            onClick={handleSubmit}
            className={classes.btnSubmit}
            fullWidth
          >
            Submit
          </Button>
          <Button onClick={closeModal} className={classes.btnCancel} fullWidth>
            Cancel
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default memo(ModalEditChildren);
