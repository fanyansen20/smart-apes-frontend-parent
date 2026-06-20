// MUI
import { Grid } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Assets
import { ReactComponent as NoClass } from "../../../../assets/images/no-class.svg";

// Dummy data
const CLASS_DATA = [
  { title: "Math Tuition for Primary 2", date: "1 October 2023 15:00 - 16:00" },
  {
    title: "English Tuition for Primary 2",
    date: "2 October 2023 15:00 - 16:00",
  },
];

const ClassCard = ({ classData }) => {
  const { title, date } = classData;

  return (
    <section className="class-card">
      <div className="class-card_content">
        <div className="class-card_content_left">
          <h3>{title}</h3>
          <h5>{date}</h5>
        </div>
        <NavigateNextIcon />
      </div>
    </section>
  );
};

const EnrolledCard = ({ enrolledClass = [1] }) => {
  return (
    <div className="containerEnrolledClass">
      <div className="cardHeader">
        <h3>Enrolled Classes</h3>
        <h5>See All</h5>
      </div>
      {enrolledClass.length > 0 ? (
        <Grid container rowSpacing={1}>
          {CLASS_DATA?.map((classItem, index) => (
            <Grid item key={index} md={12} xs={12}>
              <ClassCard classData={classItem} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="noClass">
          <NoClass />
          <p>No Classes Yet</p>
        </div>
      )}
    </div>
  );
};

export default EnrolledCard;
