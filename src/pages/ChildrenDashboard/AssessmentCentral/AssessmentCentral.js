// React
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Redux
import {
  // useSelector,
  useDispatch,
} from "react-redux";
import { getChildrenProfile } from "../../../store/user/childSlice";
import { API } from "../../../config/api";

// Helper
import useNotification from "../../../hooks/useNotification";

// MUI
import {
  Avatar,
  Button,
  Divider,
  Tooltip,
  Grid,
  Popover,
  MenuItem,
  CircularProgress,
  Container,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";

// Components
import ChangeChildLevel from "../../../components/modal/ChangeChildLevel/ChangeChildLevel";
import ModalCheckPassword from "../../../components/modal/ModalCheckPassword/ModalCheckPassword";
import PrimaryButton from "../../../components/PrimaryButton";

// Assets
import { ReactComponent as GuardIcon } from "../../../assets/icons/guard.svg";
import { ReactComponent as GearIcon } from "../../../assets/icons/gear.svg";
import { ReactComponent as PlaneIcon } from "../../../assets/icons/paper-plane.svg";
import { ReactComponent as LockIcon } from "../../../assets/icons/lock.svg";
import { ReactComponent as PaperIcon } from "../../../assets/icons/paper.svg";
import { ReactComponent as ComputerIcon } from "../../../assets/icons/computer-zoom.svg";
import { ReactComponent as LevelUpIllustration } from "../../../assets/images/illustration-level-up.svg";

const AssessmentCentral = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const childData = useSelector((store) => store.child);
  const params = useParams();
  const [childProfile, setChildProfile] = useState();
  const [levelHistory, setLevelHistory] = useState([]);
  const [isLevelChanged, setIsLevelChanged] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState();
  const [assessment, setAssessment] = useState();
  const [isLoadingAssessment, setIsLoadingAssessment] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [_msg, sendNotification] = useNotification();
  const [password, setPassword] = useState("");

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

  // Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // Onload
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getProfile();
    getSchoolHistory();
    getAssessment();
  }, []);

  // Get children profile
  const getProfile = async () => {
    const res = await dispatch(getChildrenProfile(params.id));
    setChildProfile(res.payload);
    setSelectedLevel({
      school_education_category: res?.payload?.school_education_category,
    });
  };

  const handleChangeLevel = (levelData) => {
    setSelectedLevel(levelData);
    handleClosePopover();
  };

  const getSchoolHistory = async () => {
    try {
      const resHistory = await API.get(
        `/children/${params.id}/school_education_category/histories`
      );

      const resIsLevelChanged = await API.get(
        `/children/${
          params.id
        }/school_education_category/histories?year=${new Date().getFullYear()}`
      );

      if (resIsLevelChanged?.data?.length > 0) setIsLevelChanged(true);
      setLevelHistory(resHistory?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAssessment(false);
    }
  };

  // Get Assessment Categories
  const getAssessment = async () => {
    try {
      let URL = `/children/${params.id}/free-assessments`;

      if (selectedLevel?.id) URL = `${URL}?history_id=${selectedLevel.id}`;

      const res = await API.get(URL);

      setAssessment(res.data);
    } catch (error) {
      sendNotification({
        msg: "Unable to get assessment, please try again later",
        variant: "error",
      });
    }
  };

  // Create assessment attempt
  const createAssessment = async (assessmentId) => {
    try {
      setIsLoading(true);
      // Create assessment attempt
      const res = await API.post(
        `/children/${params.id}/free-assessments/${assessmentId}/attempts`
      );

      navigate(
        `/children/${params.id}/free-assessment/${assessmentId}/attempt/${res.data.id}`
      );
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Get assessment if selected child level changed
  useEffect(() => {
    getAssessment();
  }, [selectedLevel]);

  return (
    <div className="containerAssessmentCentral">
      <Container maxWidth="lg">
        <div className="content">
          <p className="title">Free Assessment Central</p>
          <div className="profileCard">
            <div className="wrapperAvatar">
              <Avatar
                variant="rounded"
                alt="Your profile"
                src={childProfile?.profile_pic}
                sx={{ width: 100, height: 100 }}
              />
              <div>
                <p className="titleText">FULL NAME</p>
                <p className="description">{childProfile?.full_name ?? "-"}</p>
              </div>
            </div>
            <div className="dividerProfile"></div>
            <div>
              <p className="titleText">CURRENT LEVEL</p>
              <p style={{ textAlign: "center" }} className="description">
                {childProfile?.level ?? "-"}
              </p>
            </div>
            <div>
              <p className="titleText">AGE</p>
              <p style={{ textAlign: "center" }} className="description">
                {childProfile?.age ?? "-"}
              </p>
            </div>
            <div>
              <Button
                onClick={handleOpenPopover}
                className="levelBtn"
                startIcon={<GuardIcon />}
                endIcon={<ExpandMoreIcon />}
              >
                {selectedLevel?.school_education_category}
              </Button>
              <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                {levelHistory.map((history, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleChangeLevel(history)}
                  >
                    {history?.school_education_category}
                  </MenuItem>
                ))}
              </Popover>
              <Tooltip title="Change Children Level" placement="top" arrow>
                <Button
                  onClick={handleOpenModalPassword}
                  sx={{ width: "0.3rem" }}
                  className="gearBtn"
                >
                  <GearIcon />
                </Button>
              </Tooltip>
            </div>
          </div>
          {isLoadingAssessment ? (
            <Skeleton className="skeleton" variant="rounded" />
          ) : assessment?.length && isLevelChanged ? (
            assessment?.map((item, index) => (
              <div key={index} className="assessmentCard">
                <div className="header">
                  <p>{item.subject} Assessment Test</p>
                  <Tooltip
                    title="This Assessment Test can only retest 2 times"
                    placement="right"
                    arrow
                  >
                    <InfoIcon />
                  </Tooltip>
                </div>
                <Divider />
                <div className="wrapperContent">
                  <Grid container>
                    <Grid item xs={3}>
                      <h3>Subject</h3>
                    </Grid>
                    <Grid item xs={2}>
                      <h3>Status</h3>
                    </Grid>
                    <Grid item xs={2}>
                      <h3>Question</h3>
                    </Grid>
                    <Grid item xs={2}>
                      <h3>Result</h3>
                    </Grid>
                    <Grid item xs={3}>
                      <h3>Action</h3>
                    </Grid>
                  </Grid>
                  <Divider />
                  <div className="itemWrapper">
                    {item.FreeAssessmentAttempts?.map((val, idx) =>
                      val.canAttempt || val.status === "DONE" ? (
                        <div key={idx} className="testItem">
                          <Grid container>
                            <Grid item xs={2.8}>
                              <p>{val.title}</p>
                            </Grid>
                            <Grid item xs={2.1}>
                              <p
                                className={
                                  val.status === "DONE" ? "done" : "notDone"
                                }
                                style={{ textTransform: "capitalize" }}
                              >
                                {val.status.toLowerCase()}
                              </p>
                            </Grid>
                            <Grid item xs={2.2}>
                              <p>{val.total_questions}</p>
                            </Grid>
                            <Grid item xs={2.1}>
                              <p
                                className={
                                  val.status === "DONE" ? "done" : undefined
                                }
                              >
                                {val.score}%
                              </p>
                            </Grid>
                            <Grid item xs={2.8}>
                              {val.canSeeResult ? (
                                <div className="btnWrapperResult">
                                  <Tooltip
                                    placement="left"
                                    title="See Summary"
                                    arrow
                                  >
                                    <Link
                                      to={`/children/${params.id}/free-assessment/${val.free_assessment_id}/summary/${val.id}`}
                                    >
                                      <Button>
                                        <PaperIcon />
                                      </Button>
                                    </Link>
                                  </Tooltip>
                                  <Tooltip
                                    placement="right"
                                    title="See Result"
                                    arrow
                                  >
                                    <Link
                                      to={`/children/${params.id}/free-assessment/${val.free_assessment_id}/result/${val.id}`}
                                    >
                                      {" "}
                                      <Button>
                                        <ComputerIcon />
                                      </Button>
                                    </Link>
                                  </Tooltip>
                                </div>
                              ) : (
                                <div className="btnWrapper">
                                  <Button
                                    onClick={() =>
                                      createAssessment(val.free_assessment_id)
                                    }
                                    endIcon={
                                      isLoading && (
                                        <CircularProgress
                                          size={12}
                                          sx={{ color: "#7e54f1" }}
                                        />
                                      )
                                    }
                                  >
                                    <PlaneIcon />
                                    <p>Take Test</p>
                                  </Button>
                                </div>
                              )}
                            </Grid>
                          </Grid>
                        </div>
                      ) : (
                        <div key={idx} className="testItemDisabled">
                          <div className="overlay">
                            <div className="overlayContent">
                              <LockIcon />
                              <p>You need to take the previous test</p>
                            </div>
                          </div>
                          <Grid container>
                            <Grid item xs={2.8}>
                              <p>{val.title}</p>
                            </Grid>
                            <Grid item xs={2.1}>
                              <p>Not Done</p>
                            </Grid>
                            <Grid item xs={2.2}>
                              <p></p>
                            </Grid>
                            <Grid item xs={2.1}>
                              <p>0</p>
                            </Grid>
                            <Grid item xs={2.8}>
                              <div className="btnWrapper">
                                <Button disabled>
                                  <PlaneIcon />
                                  <p>Take Test</p>
                                </Button>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="assessmentCard">
              {isLevelChanged ? (
                <p className="noAssessment">
                  Currently there are no free assessment available
                </p>
              ) : (
                <div className="levelUp">
                  <LevelUpIllustration />
                  <h3>Let&apos;s Level Up!</h3>
                  <h5>
                    You need to change your child level to get new free
                    assessment test
                  </h5>
                  <PrimaryButton onClick={handleOpenModalPassword}>
                    Change Children Level
                  </PrimaryButton>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="circleTopLeft"></div>
        <div className="circleTopRight"></div>
        <div className="circleBotRight"></div>
        <ChangeChildLevel
          open={openModalLevel}
          handleClose={handleCloseModalLevel}
          password={password}
          setPassword={setPassword}
          childLevel={childProfile?.level}
        />
        <ModalCheckPassword
          open={openModalPassword}
          handleClose={handleCloseModalPassword}
          handleOpenModalLevel={handleOpenModalLevel}
          password={password}
          setPassword={setPassword}
        />
      </Container>
    </div>
  );
};

export default AssessmentCentral;
