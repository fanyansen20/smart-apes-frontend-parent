// React
import { useEffect, useState } from "react";
import { useBlocker, useNavigate, useParams } from "react-router-dom";

// Helper
import ModalImage from "react-modal-image";
import { API } from "../../../../../config/api";
import useNotification from "../../../../../hooks/useNotification";
import NavigationButton from "../../../../../pages/ChildrenDashboard/components/NavigationButton/NavigationButton";

// MUI
import { Button, Container, Grid, Typography } from "@mui/material";

// Assets
import { ReactComponent as FlagIcon } from "../../../../../assets/icons/flag.svg";
import HeaderBg from "../../../../../assets/images/assessment-summary-banner.svg";

// Components
import LinearProgressBar from "../../../../../components/LinearProgressBar/LinearProgressBar";
import PrimaryButton from "../../../../../components/PrimaryButton";
import ModalConfirmation from "../../../../../components/modal/ModalConfirmation/ModalConfirmation";

// Style
import Preloader from "../../../../../components/preloader/Preloader";
import classes from "./_FreeAssessment.module.scss";

// Constant
const optionLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const FreeAssessment = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  // Modal For Submitting Answers
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const handlerOpenModalConfirmation = () => setOpenModalConfirmation(true);
  const handlerCloseModalConfirmation = () => setOpenModalConfirmation(false);

  // Modal For Prompt User Quit
  const [openQuitModalConfirmation, setOpenQuitModalConfirmation] =
    useState(false);
  const handlerOpenQuitModalConfirmation = () =>
    setOpenQuitModalConfirmation(true);
  const handlerCloseQuitModalConfirmation = () => {
    setOpenQuitModalConfirmation(false);
  };

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [unanswered, setUnanswered] = useState([]);
  const [flaggedQuestion, setFlaggedQuestion] = useState([]);
  const [metaData, setMetaData] = useState({
    id: "",
    assessmentTitle: "",
    childName: "",
  });
  const [_msg, sendNotification] = useNotification();

  // Get IDs from params
  const { childrenId, freeAssessmentId, attemptId } = params;

  // Blocker for prevent user navigating
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      checkAnyUnanswered() && currentLocation.pathname !== nextLocation.pathname
  );
  const proceedNavigate = () =>
    blocker.state === "blocked" && blocker.proceed();

  // Handle previous question
  const handlePrev = () => {
    if (activeQuestion === 0) return;
    setActiveQuestion((current) => current - 1);
    window.scrollTo(0, 0);
  };

  // Handle next question
  const handleNext = () => {
    if (activeQuestion === questions.length - 1) return;
    setActiveQuestion((current) => current + 1);
    window.scrollTo(0, 0);
  };

  // Handle multiline question
  const handleMultiLineQuestion = (questionString) => {
    if (questionString && questionString.includes("\n")) {
      let newQuestion = questionString.split("\n").map((item, i) => {
        return <p key={i}>{item}</p>;
      });

      return newQuestion;
    } else {
      return <p>{questionString}</p>;
    }
  };

  // Handle change navigation
  const handleNavigateQuestion = (idx) => {
    setActiveQuestion(idx);
  };

  // Handle flag question
  const handleFlagQuestion = (idx) => {
    setFlaggedQuestion([...flaggedQuestion, idx]);
  };

  // Handle unflag question
  const handleUnflagQuestion = (idx) => {
    let _flaggedQuestion = [...flaggedQuestion];
    let unflagQuestion = _flaggedQuestion.filter((item) => item !== idx);

    setFlaggedQuestion(unflagQuestion);
  };

  // Load Assessment
  const loadAssessment = async () => {
    try {
      setIsLoading(true);

      // Get assessment data
      const res = await API.get(
        `/children/${childrenId}/free-assessments/${freeAssessmentId}/attempts/${attemptId}`
      );

      if (res?.data?.status === "DONE")
        navigate(`/children/${childrenId}/assessment-central`);

      let questionData = [];
      let answerData = [];

      res.data.FreeAssessmentAnswers.forEach((element) => {
        questionData = [...questionData, element.FreeAssessmentQuestion];

        answerData = [
          ...answerData,
          {
            answer_id: element.id,
            option_id: "",
          },
        ];
      });

      // Set state
      setMetaData({
        ...metaData,
        id: res.data.id,
        assessmentTitle: res.data.title,
      });

      setQuestions(questionData);
      setAnswers(answerData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle choose answer
  const handleChoose = (idx, optionId) => {
    const data = { ...answers[idx], option_id: optionId ? optionId : "" };

    let _answers = [...answers];
    _answers[idx] = data;

    setAnswers(_answers);

    if (unanswered.length > 0) {
      const _unansweredQuestion = [...unanswered];
      const filterUnansweredQuestion = _unansweredQuestion.filter(
        (item) => item !== idx + 1
      );

      setUnanswered(filterUnansweredQuestion);
    }
  };

  // Check if any unanswered question
  const checkAnyUnanswered = () => {
    let status = false;

    for (let i = 0; i < answers.length; i++) {
      // if question doesn't have answer yet, change to true
      if (!answers[i].option_id) {
        status = true;
        break;
      }
    }

    return status;
  };

  // To Check Flagged Question Before Submitting Answer
  const submitChecker = () => {
    if (flaggedQuestion?.length > 0) return handlerOpenModalConfirmation();

    handleSubmit();
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      const unansweredQuestion = [];
      answers.forEach((item, index) => {
        if (!item.option_id) {
          unansweredQuestion.push(index + 1);
        }
      });

      if (unansweredQuestion.length > 0) {
        window.scrollTo(0, 0);

        // Send alert
        sendNotification({
          msg: "Please answer all questions",
          variant: "error",
        });
        return setUnanswered(unansweredQuestion);
      }

      // submit result
      await API.patch(
        `/children/${childrenId}/free-assessments/${freeAssessmentId}/attempts/${attemptId}`,
        { answers }
      );

      navigate(
        `/children/${childrenId}/free-assessment/${freeAssessmentId}/summary/${attemptId}`
      );

      // Send alert
      sendNotification({
        msg: "Assessment successfully submitted",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const answeredQuestionCount = answers?.filter(
    (item) => item.option_id !== ""
  ).length;

  const progressBarValue = (answeredQuestionCount / questions?.length) * 100;

  // Onload
  useEffect(() => {
    loadAssessment();
  }, []);

  useEffect(() => {
    if (blocker.state === "blocked") handlerOpenQuitModalConfirmation();
  }, [blocker]);

  return isLoading ? (
    <Preloader />
  ) : (
    <div className={classes.containerFreeAssessment}>
      <Container maxWidth="lg" disableGutters>
        <Grid container spacing={2}>
          <Grid item md={9.5} xs={12} id="questionAndAnswer">
            <div
              className={classes.assessmentHeader}
              style={{ backgroundImage: `url(${HeaderBg})` }}
            >
              <p>{metaData.assessmentTitle}</p>
            </div>

            <Grid item xs={12} id="navigation">
              <div className={classes.question__navigation}>
                <div className={classes.containerButtonNavigation}>
                  {questions.map((item, index) => (
                    <NavigationButton
                      onClick={() => handleNavigateQuestion(index)}
                      key={index}
                      type={
                        activeQuestion === index
                          ? "activeButton"
                          : answers[index].option_id
                          ? "answeredButton"
                          : "unansweredButton"
                      }
                      number={index + 1}
                      isFlagged={flaggedQuestion.includes(index)}
                    />
                  ))}
                </div>
              </div>
            </Grid>

            <Grid sx={{ margin: { xs: "10px 14px" } }}>
              <PrimaryButton
                fullWidth
                disabled={checkAnyUnanswered()}
                className={classes.btn__submit}
                onClick={submitChecker}
              >
                Submit Answer
              </PrimaryButton>
            </Grid>

            <Grid
              className={classes.questionSection}
              sx={{ margin: { xs: "0 14px", md: "0" } }}
            >
              <div>
                {flaggedQuestion.includes(activeQuestion) ? (
                  <Button
                    disableRipple
                    onClick={() => handleUnflagQuestion(activeQuestion)}
                    className={classes.btn__flag}
                    fullWidth
                    startIcon={<FlagIcon />}
                  >
                    Unflag this Question
                  </Button>
                ) : (
                  <Button
                    disableRipple
                    onClick={() => handleFlagQuestion(activeQuestion)}
                    className={classes.btn__flag}
                    fullWidth
                    startIcon={<FlagIcon />}
                  >
                    Flag this Question
                  </Button>
                )}
              </div>

              {/* Question Progress Bar */}
              <Grid container direction={"column"} my={2.5} gap={2}>
                <Grid container justifyContent={"center"} gap={0.5}>
                  <Typography>Question</Typography>
                  <Typography className={classes.questionNumberText}>{`${
                    activeQuestion + 1
                  }/${questions?.length}`}</Typography>
                </Grid>

                <LinearProgressBar
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      transition: "none",
                    },
                  }}
                  variant="determinate"
                  value={progressBarValue}
                />
              </Grid>

              <div className={classes.containerImages}>
                {questions[activeQuestion]?.image_urls &&
                  questions[activeQuestion]?.image_urls?.map((item, index) => (
                    <div key={index}>
                      <ModalImage
                        className={classes.questionImage}
                        small={item}
                        large={item}
                        imageBackgroundColor="#ffffff"
                        alt={`Question ${activeQuestion + 1}`}
                        hideDownload
                      />
                    </div>
                  ))}
              </div>

              {handleMultiLineQuestion(questions[activeQuestion]?.title)}
            </Grid>

            <Grid
              className={classes.questionAndAnswer}
              sx={{ margin: { xs: "0 10px", md: "0" } }}
            >
              {questions[activeQuestion]?.FreeAssessmentOptions?.map(
                (item, index) => (
                  <Button
                    onClick={() => handleChoose(activeQuestion, item.id)}
                    fullWidth
                    key={index}
                    className={
                      answers[activeQuestion]?.option_id === item.id
                        ? `${classes.answers} ${classes.answerActive}`
                        : classes.answers
                    }
                  >
                    <div className={classes.optionWrapper}>
                      <p>{optionLetter[index]}.</p>
                      <div className={classes.containerOptionsImage}>
                        {item?.image_urls?.map((value, idx) => (
                          <div key={idx}>
                            <ModalImage
                              className={classes.optionImage}
                              small={value}
                              large={value}
                              imageBackgroundColor="#ffffff"
                              alt={`Option ${optionLetter[index]}`}
                              hideDownload
                            />
                          </div>
                        ))}
                      </div>
                      <p>{item?.title}</p>
                    </div>
                  </Button>
                )
              )}
            </Grid>

            <Grid
              className={classes.btnGroup}
              sx={{ margin: { xs: "20px 10px" } }}
            >
              {activeQuestion !== 0 ? (
                <Button onClick={handlePrev} className={classes.leftBtn}>
                  Previous Question
                </Button>
              ) : (
                <div></div>
              )}

              {activeQuestion === questions?.length - 1 ? (
                // <Button onClick={handleSubmit} className="rightBtn">
                //   Submit
                // </Button>
                <div></div>
              ) : (
                <Button onClick={handleNext} className={classes.rightBtn}>
                  Next Question
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <ModalConfirmation
        isMobileView
        title="Submit Answer"
        subTitle="There is flagged questions, Are you sure want to submit the answer?"
        open={openModalConfirmation}
        handlerClose={handlerCloseModalConfirmation}
        handlerConfirm={handleSubmit}
      />

      {blocker.state === "blocked" && (
        <ModalConfirmation
          isMobileView
          title="Quit Assessment"
          subTitle="Are you sure want to quit the assessment? Your progress won’t be saved"
          open={openQuitModalConfirmation}
          handlerClose={handlerCloseQuitModalConfirmation}
          handlerConfirm={proceedNavigate}
        />
      )}
    </div>
  );
};

export default FreeAssessment;
