//MUI
import { Grid, LinearProgress } from "@mui/material";

const CourseCard = ({ courses }) => {
  return (
    <div className="containerCourseCard">
      <div className="cardHeader">
        <h3>Your Courses</h3>
        <h5>See All</h5>
      </div>
      <Grid container spacing={1}>
        {courses?.map((item, index) => (
          <Grid item key={index} md={6} xs={12}>
            <div className="singleCard">
              <img src={item?.thumbnail} alt="course" />
              <h5>{item?.level}</h5>
              <h3>{item?.title}</h3>
              <h5>
                {item?.totalLesson} <span>{item?.time}</span>
              </h5>
              <div className="progressCourse">
                <LinearProgress
                  className="progressBar"
                  variant="determinate"
                  value={item.progress}
                />
                <p>{item.progress}%</p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CourseCard;
