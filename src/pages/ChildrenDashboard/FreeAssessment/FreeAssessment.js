// React
import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

// Helper
import { API } from "../../../config/api";
import useNotification from "../../../hooks/useNotification";
import ModalImage from "react-modal-image";
import NavigationButton from "../components/NavigationButton/NavigationButton";

// MUI
import { Button, Container, Grid } from "@mui/material";

// Assets
import { ReactComponent as FlagIcon } from "../../../assets/icons/flag.svg";
import HeaderBg from "../../../assets/images/assessment-summary-banner.svg";

// Constant
const optionLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const FreeAssessment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const childData = useOutletContext();
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
      // Get assessment data
      const res = await API.get(
        `/children/${childrenId}/free-assessments/${freeAssessmentId}/attempts/${attemptId}`
      );

      if (res?.data?.status === "DONE") {
        navigate(`/children/${childrenId}/assessment-central`);
      }

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

  // Handle switch to certain question
  // const handleSwitchQuestion = (questionNo) => {
  //   setActiveQuestion(questionNo);
  // };

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

  // Onload
  useEffect(() => {
    loadAssessment();
  }, []);

  return (
    <div className="containerFreeAssessment">
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
              <p>{metaData.assessmentTitle}</p>
              <p>|</p>
              <p>{childData?.full_name}’s Assessment Test</p>
            </div>
            {/* {unanswered?.length > 0 && (
              <Alert className="questionAlert" severity="warning">
                Please answer these questions before submitting:
                <div className="unansweredQuestion">
                  {unanswered.map((item, idx) => (
                    <Tooltip
                      key={idx}
                      title="Click to select question"
                      placement="top"
                      arrow
                    >
                      <p onClick={() => handleSwitchQuestion(item - 1)}>
                        {item}
                      </p>
                    </Tooltip>
                  ))}
                </div>
              </Alert>
            )} */}
            <div className="questionSection">
              <h3>Question {activeQuestion + 1}</h3>
              <h5>Choose the correct answer for this question</h5>
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
                    onClick={() => handleChoose(activeQuestion, item.id)}
                    fullWidth
                    key={index}
                    className={
                      answers[activeQuestion]?.option_id === item.id
                        ? "answers answerActive"
                        : "answers"
                    }
                  >
                    <div className="optionWrapper">
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
                  </Button>
                )
              )}
            </div>
            <div className="btnGroup">
              {activeQuestion !== 0 ? (
                <Button onClick={handlePrev} className="leftBtn">
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
                <Button onClick={handleNext} className="rightBtn">
                  Next Question
                </Button>
              )}
            </div>
          </Grid>
          <Grid
            item
            md={2.5}
            sx={{ display: { xs: "none", md: "block" } }}
            id="navigation"
          >
            <div className="question__navigation">
              <div>
                {flaggedQuestion.includes(activeQuestion) ? (
                  <Button
                    onClick={() => handleUnflagQuestion(activeQuestion)}
                    className="btn__flag"
                    fullWidth
                    startIcon={<FlagIcon />}
                  >
                    Unflag this question
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFlagQuestion(activeQuestion)}
                    className="btn__flag"
                    fullWidth
                    startIcon={<FlagIcon />}
                  >
                    Flag this question
                  </Button>
                )}
              </div>
              <div className="containerButtonNavigation">
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
                    isFlagged={flaggedQuestion.includes(index) ? true : false}
                  />
                ))}
              </div>
              <Button
                disabled={checkAnyUnanswered()}
                onClick={handleSubmit}
                className="btn__submit"
                fullWidth
              >
                Submit Answer
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FreeAssessment;
