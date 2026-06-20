import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { getChildrenProfile } from "../../../../store/user/childSlice";

// MUI
import { Container, Grid } from "@mui/material";

// Components
import AssessmentCentralCard from "../../../../pages/ChildrenDashboard/components/AssessmentCentralCard";
import ProfileCentralCard from "../../../../pages/ChildrenDashboard/components/ProfileCentralCard";
import HeaderNavigation from "../../components/HeaderNavigation";
import ProfileCard from "../../components/ProfileCard";
import CourseCard from "./components/CourseCard";
import EAssessmentCard from "./components/EAssessmentCard";
import EnrolledClassCard from "./components/EnrolledClassCard";
import ProgramCard from "./components/ProgramCard";

// API
import { getFreeAssessment } from "../../../../api/children/free-assessment/getFreeAssessment";

// Styles
import classes from "./_ChildrenDashBoard.module.scss";

const ChildrenDashboard = () => {
  const { childrenId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // #region useState
  const [profile, setProfile] = useState();
  const [freeAssessment, setFreeAssessment] = useState([]);
  const [courses] = useState([
    {
      thumbnail:
        "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      level: "INTERMEDIATE",
      title: "Easiest Way to learn Math in a Second",
      totalLesson: "8 lesson",
      time: "1 hours",
      progress: 70,
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
      level: "INTERMEDIATE",
      title: "Easiest Way to learn Calculus",
      totalLesson: "7 lesson",
      time: "1 hours",
      progress: 90,
    },
  ]);
  const [programs, _setPrograms] = useState([
    {
      id: "abdfkdj",
      title: "Grammar Course for Beginner",
      thumbnail:
        "https://unsplash.com/photos/POMpXtcVYHo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Z3JhbW1hcnxlbnwwfHx8fDE2OTcwNDUwMDJ8MA&force=true&w=640",
      content: [
        {
          title: "Grammar Introduction",
          progress: 70,
          thumbnail:
            "https://unsplash.com/photos/azA1hLbjBBo/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Z3JhbW1hcnxlbnwwfHx8fDE2OTcwNDUwMDJ8MA&force=true&w=640",
        },
        {
          title: "Grammar Assessment Test",
          progress: 0,
          thumbnail:
            "https://unsplash.com/photos/OyCl7Y4y0Bk/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8Z3JhbW1hcnxlbnwwfHx8fDE2OTcwNDUwMDJ8MA&force=true&w=640",
        },
      ],
    },
    {
      id: "abdfk34j",
      title: "Piano Lesson",
      thumbnail:
        "https://unsplash.com/photos/8QrPJ3Kfie4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjk3MDc4MDU4fA&force=true&w=640",
      content: [
        {
          title: "Piano Basics",
          progress: 30,
          thumbnail:
            "https://unsplash.com/photos/eAYO8vKNeFQ/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjk3MDc4MDg5fA&force=true&w=640",
        },
        {
          title: "Practice Simple Song",
          progress: 0,
          thumbnail:
            "https://unsplash.com/photos/eAYO8vKNeFQ/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjk3MDc4MDg5fA&force=true&w=640",
        },
      ],
    },
  ]);
  // #endregion

  // #region fetch function
  // const getCourse = async () => {
  //   try {
  //     const resCourses = await API.get(`/children/${childrenId}/courses`);
  //     setCourses(resCourses.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getAssessment = async () => {
    try {
      const resAssessment = await getFreeAssessment(childrenId);
      setFreeAssessment(resAssessment);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfile = async () => {
    const res = await dispatch(getChildrenProfile(childrenId));
    setProfile(res.payload);
  };
  // #endregion

  // #region function
  const navigateToEditProfile = () => {
    navigate("edit");
  };

  const goBack = () => {
    navigate("/");
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    // getCourse();
    getAssessment();
    getProfile();
    window.scrollTo(0, 0);
  }, []);
  // #endregion

  return (
    <Fragment>
      <HeaderNavigation title="Children Dashboard" goBack={goBack} />
      <Container className={classes.containerChildrenDashboard}>
        <Grid container direction="column">
          <Grid item xs={12} container gap={2} direction="column">
            <ProfileCard
              data={{ isLoading: !profile, userData: profile }}
              type="children"
              navigateToEditProfile={navigateToEditProfile}
            />
            <ProfileCentralCard childrenId={childrenId} />
            <AssessmentCentralCard pathname={`assessment-central`} />
            <CourseCard courses={courses} />
            <EnrolledClassCard />
            <ProgramCard programs={programs} />
            <EAssessmentCard
              childrenId={childrenId}
              assessmentData={freeAssessment}
            />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ChildrenDashboard;
