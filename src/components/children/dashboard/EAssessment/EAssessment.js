// Helper
import { useNavigate } from "react-router-dom";
import useNotification from "../../../../hooks/useNotification";
// MUI
import PrimaryButton from "../../../PrimaryButton";

const EAssessment = ({ assessmentData }) => {
  const navigate = useNavigate();
  const [_msg, sendNotification] = useNotification();

  const handleTakeTest = (assessmentAttempt, assessmentId) => {
    if (assessmentAttempt.length === 0 || !assessmentId) {
      sendNotification({
        msg: "Cannot take this test. Please try again later",
        variant: "error",
      });
    }

    const availableTest = assessmentAttempt.find(
      (assessment) => assessment.canAttempt
    );

    if (availableTest) {
      navigate(`/children/${availableTest?.child_id}/assessment-central`);
    } else {
      sendNotification({
        msg: "You have completed this assessment",
        variant: "error",
      });
    }
  };

  return (
    <div className="containerEAssessment">
      <div className="cardHeader">
        <h3>E-Assessment</h3>
        <h5>See All Assessment</h5>
      </div>
      {assessmentData.length > 0 ? (
        <section>
          {assessmentData.map((assessment, index) => (
            <div key={index} className="eassessment-item">
              <div>
                <h3>{assessment?.title}</h3>
                <h3>Assessment Test</h3>
                <div className="eassessment-info">
                  <h5>
                    {assessment?.FreeAssessmentAttempts[0]?.total_questions}{" "}
                    Questions
                  </h5>
                  <h5>
                    {assessment?.FreeAssessmentAttempts[0]?.total_questions}{" "}
                    mins practice
                  </h5>
                </div>
              </div>
              <PrimaryButton
                onClick={() =>
                  handleTakeTest(
                    assessment?.FreeAssessmentAttempts,
                    assessment?.id
                  )
                }
              >
                Take Test
              </PrimaryButton>
            </div>
          ))}
        </section>
      ) : (
        <div className="noClass">
          <p>No E-Assessment Yet</p>
        </div>
      )}
    </div>
  );
};

export default EAssessment;
