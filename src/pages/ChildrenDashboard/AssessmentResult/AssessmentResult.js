// React
import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

// Helper
import ModalImage from "react-modal-image";
import { API } from "../../../config/api";

// MUI
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Container, Grid } from "@mui/material";

// Assets
import { ReactComponent as BackIcon } from "../../../assets/icons/back.svg";
import { ReactComponent as PaperIcon } from "../../../assets/icons/paper.svg";
// import { ReactComponent as FlagIcon } from "../../../assets/icons/flag.svg";
import HeaderBg from "../../../assets/images/assessment-summary-banner.svg";

// Component
import NavigationButton from "../components/NavigationButton/NavigationButton";

// Constant
const optionLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const AssessmentResult = () => {
  const params = useParams();
  const childData = useOutletContext();
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
    } else {
      return <p>{questionString}</p>;
    }
  };

  // Handle change navigation
  const handleNavigateQuestion = (idx) => {
    setActiveQuestion(idx);
  };

  // Load Assessment
  const loadAssessment = async () => {
    try {
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
    }
  };

  // Onload
  useEffect(() => {
    loadAssessment();
  }, []);

  return (
    <div className="containerAssessmentResult">
      <Container maxWidth="lg" disableGutters>
        <Grid container spacing={2}>
          <Grid
            item
            md={9.5}
            xs={12}
            sx={{ margin: { xs: "0 10px", md: "0" } }}
            id="questionAndAnswer"
          >
            <div
              className="assessmentHeader"
              style={{ backgroundImage: `url(${HeaderBg})` }}
            >
              <Link to={`/children/${childrenId}/assessment-central`}>
                <BackIcon />
              </Link>
              <p>{metaData.assessmentTitle}</p>
              <p>|</p>
              <p>{childData?.full_name}’s Assessment Result</p>
            </div>

            <div className="questionSection">
              <h3>Question {activeQuestion + 1}</h3>
              {/* <h5>Choose the correct answer for this question</h5> */}
              <div className="containerImages">
                {questions[activeQuestion]?.image_urls &&
                  questions[activeQuestion]?.image_urls?.map((item, index) => (
                    <div key={index}>
                      <ModalImage
                        className="questionImage"
                        small={item}
                        large={item}
                        alt={`Question ${activeQuestion + 1}`}
                        hideDownload
                      />
                    </div>
                  ))}
              </div>

              {handleMultiLineQuestion(questions[activeQuestion]?.title)}
              {/* <p>{questions[activeQuestion]?.title}</p> */}
            </div>
            <div className="questionAndAnswer">
              {/* <p className="question">1. The correct word for A is ....</p> */}
              {questions[activeQuestion]?.FreeAssessmentOptions?.map(
                (item, index) => (
                  <Button
                    disableRipple
                    fullWidth
                    key={index}
                    className={
                      questions[activeQuestion].isCorrect
                        ? answers[activeQuestion]?.option_id === item.id
                          ? "answers right"
                          : "answers"
                        : item.id === answers[activeQuestion]?.option_id
                        ? "answers wrong"
                        : item.id === questions[activeQuestion]?.correctAnswerId
                        ? "answers right"
                        : "answers"
                    }
                  >
                    <div className="optionWrapper">
                      <div className="option">
                        <p>{optionLetter[index]}.</p>
                        <div className="containerOptionsImage">
                          {item?.image_urls?.map((value, idx) => (
                            <div key={idx}>
                              <ModalImage
                                className="optionImage"
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
                      <div className="optionArgument">
                        {questions[activeQuestion].isCorrect ? (
                          answers[activeQuestion]?.option_id === item.id ? (
                            <p>You Answered Correctly</p>
                          ) : (
                            <p></p>
                          )
                        ) : item.id === answers[activeQuestion]?.option_id ? (
                          <p>Your Answer</p>
                        ) : item.id ===
                          questions[activeQuestion]?.correctAnswerId ? (
                          <p>Correct Answer</p>
                        ) : (
                          <p></p>
                        )}

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
            </div>
            <div className="btnGroup">
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
                    <Button startIcon={<PaperIcon />} className="leftBtn">
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
                    <Button onClick={handlePrev} className="leftBtn">
                      Previous Question
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {activeQuestion === questions?.length - 1 ? (
                    <Link to={`/children/${childrenId}/assessment-central`}>
                      <Button className="rightBtn">
                        Go to Assessment Central
                      </Button>
                    </Link>
                  ) : (
                    <Button onClick={handleNext} className="rightBtn">
                      Next Question
                    </Button>
                  )}
                </Grid>
              </Grid>

              {/* Mobile view */}
              <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
                <Grid
                  item
                  md={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {activeQuestion !== 0 ? (
                    <Button onClick={handlePrev} className="leftBtn">
                      Previous Question
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  <Link
                    to={`/children/${childrenId}/free-assessment/${freeAssessmentId}/summary/${attemptId}`}
                  >
                    <Button startIcon={<PaperIcon />} className="leftBtn">
                      See Summary
                    </Button>
                  </Link>
                  {activeQuestion === questions?.length - 1 ? (
                    <Link to={`/children/${childrenId}/assessment-central`}>
                      <Button className="rightBtn">
                        Go to Assessment Central
                      </Button>
                    </Link>
                  ) : (
                    <Button onClick={handleNext} className="rightBtn">
                      Next Question
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            md={2.5}
            sx={{ display: { xs: "none", md: "block" } }}
            id="navigation"
          >
            <div className="question__navigation">
              {/* <div>
                <Button
                  disabled
                  className="btn__flag"
                  fullWidth
                  startIcon={<FlagIcon />}
                >
                  Flag this question
                </Button>
              </div> */}
              <div className="containerButtonNavigation">
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
              {/* <Button className="btn__submit" fullWidth>
                Submit Answer
              </Button> */}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AssessmentResult;
