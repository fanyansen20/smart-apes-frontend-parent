// React
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Helper
import ModalImage from "react-modal-image";
import { API } from "../../../../../config/api";

// MUI
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Container, Grid, Typography } from "@mui/material";

// Assets
import { ReactComponent as PaperIcon } from "../../../../../assets/icons/paper.svg";
import HeaderBg from "../../../../../assets/images/assessment-summary-banner.svg";

// Component
import LinearProgressBar from "../../../../../components/LinearProgressBar/LinearProgressBar";
import PrimaryButton from "../../../../../components/PrimaryButton";
import Preloader from "../../../../../components/preloader/Preloader";
import NavigationButton from "../components/NavigationButton/NavigationButton";

// Styles
import classes from "./_AssessmentResult.module.scss";

// Constant
const optionLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const AssessmentResult = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [metaData, setMetaData] = useState({
    id: "",
    assessmentTitle: "",
    childName: "",
  });

  // Get IDs from params
  const { childrenId, freeAssessmentId, attemptId } = params;

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
    }

    return <p>{questionString}</p>;
  };

  // Handle change navigation
  const handleNavigateQuestion = (idx) => {
    setActiveQuestion(idx);
  };

  // Load Assessment
  const loadAssessment = async () => {
    try {
      setIsLoading(true);

      // Get assessment data
      const res = await API.get(
        `/children/${childrenId}/free-assessments/${freeAssessmentId}/attempts/${attemptId}`
      );

      let questionData = [];
      let answerData = [];

      res.data.FreeAssessmentAnswers.forEach((element) => {
        questionData = [
          ...questionData,
          {
            ...element.FreeAssessmentQuestion,
            isCorrect: element.is_correct,
            correctAnswerId: element.correct_option_id,
          },
        ];

        answerData = [
          ...answerData,
          {
            answer_id: element.id,
            option_id: element.child_answer_option_id,
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

  const answeredQuestionCount = answers?.filter(
    (item) => item.option_id !== ""
  ).length;

  const progressBarValue = (answeredQuestionCount / questions?.length) * 100;

  // Onload
  useEffect(() => {
    loadAssessment();
  }, []);

  return isLoading ? (
    <Preloader />
  ) : (
    <div className={classes.containerAssessmentResult}>
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
                          ? item.isCorrect
                            ? "activeButton"
                            : "activeFalseButton"
                          : item.isCorrect
                          ? "answeredButton"
                          : "answeredFalseButton"
                      }
                      number={index + 1}
                    />
                  ))}
                </div>
              </div>
            </Grid>

            <Grid sx={{ margin: { xs: "10px 14px" } }}>
              <Link
                to={`/children/${childrenId}/free-assessment/${freeAssessmentId}/summary/${attemptId}`}
              >
                <PrimaryButton fullWidth className={classes.btn__submit}>
                  <PaperIcon />
                  See Summary
                </PrimaryButton>
              </Link>
            </Grid>

            <Grid
              className={classes.questionSection}
              sx={{ margin: { xs: "0 14px", md: "0" } }}
            >
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
              sx={{ margin: { xs: "0 14px", md: "0" } }}
            >
              {/* <p className={classes.question}>1. The correct word for A is ....</p> */}
              {questions[activeQuestion]?.FreeAssessmentOptions?.map(
                (item, index) => (
                  <Button
                    disableRipple
                    fullWidth
                    key={index}
                    className={
                      questions[activeQuestion].isCorrect
                        ? answers[activeQuestion]?.option_id === item.id
                          ? `${classes.answers} ${classes.right}`
                          : classes.answers
                        : item.id === answers[activeQuestion]?.option_id
                        ? `${classes.answers} ${classes.wrong}`
                        : item.id === questions[activeQuestion]?.correctAnswerId
                        ? `${classes.answers} ${classes.right}`
                        : classes.answers
                    }
                  >
                    <div className={classes.optionWrapper}>
                      <div className={classes.option}>
                        <p>{optionLetter[index]}.</p>
                        <div className={classes.containerOptionsImage}>
                          {item?.image_urls?.map((value, idx) => (
                            <div key={idx}>
                              <ModalImage
                                className={classes.optionImage}
                                small={value}
                                large={value}
                                alt={`Option ${optionLetter[index]}`}
                                hideDownload
                              />
                            </div>
                          ))}
                        </div>
                        <p>{item?.title}</p>
                      </div>
                      <div className={classes.optionArgument}>
                        {questions[activeQuestion].isCorrect ? (
                          answers[activeQuestion]?.option_id === item.id ? (
                            <CheckCircleIcon />
                          ) : (
                            <div></div>
                          )
                        ) : item.id === answers[activeQuestion]?.option_id ? (
                          <CancelIcon />
                        ) : item.id ===
                          questions[activeQuestion]?.correctAnswerId ? (
                          <CheckCircleIcon />
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </Button>
                )
              )}
            </Grid>

            <Grid
              className={classes.btnGroup}
              sx={{ margin: { xs: "20px 10px" } }}
            >
              {/* Desktop view */}
              <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
                <Grid item md={4}></Grid>
                <Grid
                  item
                  md={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Link
                    to={`/children/${childrenId}/free-assessment/${freeAssessmentId}/summary/${attemptId}`}
                  >
                    <Button
                      startIcon={<PaperIcon />}
                      className={classes.leftBtn}
                    >
                      See Summary
                    </Button>
                  </Link>
                </Grid>
                <Grid
                  item
                  md={4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  {activeQuestion !== 0 ? (
                    <Button onClick={handlePrev} className={classes.leftBtn}>
                      Previous Question
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {activeQuestion === questions?.length - 1 ? (
                    <Link to={`/children/${childrenId}/assessment-central`}>
                      <Button className={classes.rightBtn}>
                        Go to Assessment Central
                      </Button>
                    </Link>
                  ) : (
                    <Button onClick={handleNext} className={classes.rightBtn}>
                      Next Question
                    </Button>
                  )}
                </Grid>
              </Grid>

              {/* Mobile view */}
              <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {activeQuestion !== 0 ? (
                    <Button onClick={handlePrev} className={classes.leftBtn}>
                      Previous Question
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {activeQuestion === questions?.length - 1 ? (
                    <Link to={`/children/${childrenId}/assessment-central`}>
                      <Button className={classes.rightBtn}>
                        Go to Assessment Central
                      </Button>
                    </Link>
                  ) : (
                    <Button onClick={handleNext} className={classes.rightBtn}>
                      Next Question
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AssessmentResult;
