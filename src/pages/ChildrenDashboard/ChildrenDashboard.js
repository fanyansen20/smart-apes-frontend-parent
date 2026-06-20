// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";

// API
import { getFreeAssessment } from "../../api/children/free-assessment/getFreeAssessment";

// Redux
import { useDispatch } from "react-redux";
import { getChildrenProfile } from "../../store/user/childSlice";

// Grid
import { Container, Grid } from "@mui/material";

// Assets
import classes from "./_ChildrenDashboard.module.scss";

// Components
import ChildrenSidebar from "../../components/children/dashboard/ChildrenSidebar/ChildrenSidebar";
import CourseCard from "../../components/children/dashboard/CourseCard/CourseCard";
import EAssessment from "../../components/children/dashboard/EAssessment/EAssessment";
import EnrolledCard from "../../components/children/dashboard/EnrolledCard/EnrolledCard";
import ProgramCard from "../../components/children/dashboard/ProgramCard/ProgramCard";
import ModalEditChildren from "../../components/modal/ModalEditChildren/ModalEditChildren";
import AssessmentCentralCard from "./components/AssessmentCentralCard";
import ProfileCentralCard from "./components/ProfileCentralCard";

const ChildrenDashboard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState();
  const [freeAssessment, setFreeAssessment] = useState([]);

  // Course state
  const [courses, _setCourses] = useState([
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

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get children profile
  const getProfile = async () => {
    const res = await dispatch(getChildrenProfile(params.id));
    setProfile(res.payload);
  };

  // Get Enrolled Course
  const getCourse = async () => {
    try {
      await API.get(`/children/${params.id}/courses`);
    } catch (error) {
      console.error(error);
    }
  };

  // Get Free Assessment Categories
  const getAssessment = async () => {
    try {
      const resAssessment = await getFreeAssessment(params.id);
      setFreeAssessment(resAssessment);
    } catch (error) {
      console.error(error);
    }
  };

  // On load
  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile();
    getCourse();
    getAssessment();
  }, []);

  useEffect(() => {
    getProfile();
  }, [open]);

  return (
    <Container maxWidth="xl" className={classes.containerChildrenDashboard}>
      <Grid container justifyContent="space-around">
        <Grid item md={3.9} container direction="column" gap={2}>
          <ProfileCentralCard childrenId={params.id} />

          <CourseCard courses={courses} />
          <EnrolledCard />
        </Grid>

        <Grid item md={3.9} container direction="column" gap={2}>
          <AssessmentCentralCard childrenId={params.id} />
          <ProgramCard programs={programs} />
          <EAssessment assessmentData={freeAssessment} />
        </Grid>
        <Grid item md={3.9} className={classes.childrenProfile}>
          <ChildrenSidebar profile={profile} handleOpen={handleOpen} />
        </Grid>
      </Grid>
      <ModalEditChildren open={open} handleClose={handleClose} />
    </Container>
  );
};

export default ChildrenDashboard;
