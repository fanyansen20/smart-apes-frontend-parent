import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import { Avatar, Container, Grid } from "@mui/material";

// Component
import Preloader from "../../../../../components/preloader/Preloader";
import HeaderNavigation from "../../../components/HeaderNavigation";
import AssessmentItem from "../components/AssessmentItem";

// API
import { getFreeAssessment } from "../../../../../api/children/free-assessment/getFreeAssessment";

// Redux & Helper
import { useDispatch } from "react-redux";
import { checkValue } from "../../../../../helper/checkValue";
import { getChildrenProfile } from "../../../../../store/user/childSlice";

// Styles
import classes from "./_Assessment.module.scss";

// Assets
import { ReactComponent as SettingsIcon } from "../../../../../assets/icons/settings.svg";
import ChangeChildLevel from "../../../../../components/modal/ChangeChildLevel/ChangeChildLevel";
import ModalCheckPassword from "../../../../../components/modal/ModalCheckPassword/ModalCheckPassword";
import { API } from "../../../../../config/api";

const ChildrenDashboardAssessment = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  // #region useState
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentList, setAssessmentList] = useState([]);
  const [childProfile, setChildProfile] = useState();
  const [selectedLevel, setSelectedLevel] = useState();

  // Modal
  const [openModalLevel, setOpenModalLevel] = useState(false);
  const handleOpenModalLevel = () => setOpenModalLevel(true);
  const handleCloseModalLevel = () => {
    setPassword();
    setOpenModalLevel(false);
  };

  const [openModalPassword, setOpenModalPassword] = useState(false);
  const handleOpenModalPassword = () => setOpenModalPassword(true);
  const handleCloseModalPassword = () => setOpenModalPassword(false);
  // #endregion

  // #region fetch function
  const getAssessment = async () => {
    try {
      setIsLoading(true);

      const resAssessment = await getFreeAssessment(params.id);
      setAssessmentList(resAssessment);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    const res = await dispatch(getChildrenProfile(params.id));
    setChildProfile(res.payload);
    setSelectedLevel({
      school_education_category: res?.payload?.school_education_category,
    });
  };

  // #endregion

  // #region Function
  // Create assessment attempt
  const createAssessment = async ({ assessmentId }) => {
    try {
      // Create assessment attempt
      const res = await API.post(
        `/children/${params.id}/free-assessments/${assessmentId}/attempts`
      );

      navigate(
        `/children/${params.id}/free-assessment/${assessmentId}/attempt/${res.data.id}`
      );
    } catch (error) {
      console.error(error);
      if (error.response.status === 400) {
        handleAttemptExist(assessmentId);
      }
    }
  };

  // Handle if assessment not taken but attempt already created
  const handleAttemptExist = async (assessmentId) => {
    try {
      const res = await API.get(`/children/${params.id}/free-assessments`);

      // Get last attempt
      const lastAttemptSubject = res.data.filter(
        (item) => item.id === assessmentId
      );
      const lastAttempt = lastAttemptSubject[0].FreeAssessmentAttempts.filter(
        (item) => item.canAttempt
      );

      navigate(
        `/children/${params.id}/free-assessment/${assessmentId}/attempt/${lastAttempt[0].id}`
      );
    } catch (error) {
      console.error(error);
    }
  };
  // #endregion

  // #useEffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getProfile();
    getAssessment();
  }, []);

  useEffect(() => {}, [selectedLevel]);
  // #endregion

  return isLoading ? (
    <Preloader />
  ) : (
    <Fragment>
      <HeaderNavigation title="SA Assessment" goBack={() => navigate(-1)} />

      <Container className={classes.containerChildrenAssessment}>
        <Grid className={classes.title} xs={12}>
          <Grid container className={classes.assessmentProfile}>
            <div className={classes.wrapperAvatar}>
              <Avatar
                variant="rounded"
                alt="Your Children Profile"
                src={childProfile?.profile_pic}
                sx={{ width: 100, height: 100, borderRadius: "50%" }}
              />

              <Grid container gap={2} direction={"column"}>
                <p className={classes.profileName}>
                  {checkValue(childProfile?.full_name)}
                </p>
                <p className={classes.profileDesc}>
                  {checkValue(childProfile?.school_education_category)}
                </p>
              </Grid>

              <Grid item>
                <button
                  className={classes.reportButton}
                  onClick={handleOpenModalPassword}
                >
                  <SettingsIcon />
                </button>
              </Grid>
            </div>
          </Grid>
        </Grid>

        {/* Assessment List */}
        <Grid container xs={12} gap={1}>
          {assessmentList.map((assessmentItem, index) => (
            <AssessmentItem
              key={index}
              childrenId={childProfile?.id}
              assessmentData={assessmentItem}
              handleTakeTest={createAssessment}
              truncateTitle
            />
          ))}
        </Grid>
      </Container>

      <ChangeChildLevel
        open={openModalLevel}
        handleClose={handleCloseModalLevel}
        password={password}
        setPassword={setPassword}
        childLevel={childProfile?.level}
        isMobileDevice
      />

      <ModalCheckPassword
        open={openModalPassword}
        handleClose={handleCloseModalPassword}
        handleOpenModalLevel={handleOpenModalLevel}
        password={password}
        setPassword={setPassword}
        isMobileDevice
      />
    </Fragment>
  );
};

export default ChildrenDashboardAssessment;
