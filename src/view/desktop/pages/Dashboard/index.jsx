// React
import { useEffect, useRef, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllChildren } from "../../../../store/children/getAllChildren";
import { getTestTracker } from "../../../../store/profilingTest/getTestTracker";

// MUI
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid, Typography } from "@mui/material";

// Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Components
import Calendar from "../../../../components/calendar/CalendarComp";
import Children from "../../../../components/dashboard/children/Children";
import Event from "../../../../components/dashboard/event/Event";
import Orders from "../../../../components/dashboard/orders/Orders";
import ModalAddChildren from "../../../../components/modal/ModalAddChildren/ModalAddChildren";
import ModalQuickTips from "./components/ModalQuickTips";
import TestTrackerSection from "./components/TestTrackerSection";

// Assets
import { ReactComponent as NoChild } from "../../../../assets/images/no-children.svg";
import { ReactComponent as NoEvent } from "../../../../assets/images/no-event.svg";

// Hooks
import { useNavigate } from "react-router-dom";
import TourPage from "../../../../components/shared/TourPage";
import useOpenModalRedeemAccessCode from "../../../../hooks/dashboard/useModalRedeemAccessCode";
import usePageUrlQuery from "../../../../hooks/usePageUrlQuery";

// Helper
import Cookies from "universal-cookie";

// Constant
import { maxChildren } from "../../../../constants/children";

// Styles
import classes from "./_Dashboard.module.scss";
import ModalRedeemAccessCode from "./components/ModalRedeemAccessCode";

// Constant
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

// tour page for access code
const tourPageTestTracker = [
  {
    target: "#access-code-section",
    disableBeacon: true,
    locale: {
      skip: <strong aria-label="skip">Skip</strong>,
      next: "Next Step",
    },
    title: "This is your test tracker",
    content:
      "In this section you can see and track all your purchased test, including your test status",
  },
  {
    locale: {
      skip: <strong aria-label="skip">Skip</strong>,
      last: "Finish",
    },
    target: "#btn-see-quick-tips",
    title: "Step how to redeem test",
    content:
      "Click this button to see more step by step guide, how to redeem your test",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carouselRef = useRef();

  const cookies = new Cookies();

  const notShowPageTour = cookies.get("disable_page_tour") === "true";

  const {
    openModalAccessCode,
    closeModalAccessCode,
    isOpenModalAccessCode,
    redeemCode,
    error,
  } = useOpenModalRedeemAccessCode();

  const { children, totalResults, status } = useSelector(
    (store) => store.getAllChildren
  );

  const { dataTestTracker, status: statusTestTracker } = useSelector(
    (store) => store.resTestTrackerSlice
  );

  const isGetChild =
    statusTestTracker === "idle" || statusTestTracker === "loading";

  // Mark in calendar
  const [selectedDate] = useState([
    new Date("2023-01-08T00:00:00Z"),
    new Date("2023-01-10T00:00:00Z"),
  ]);

  // Events in calendar
  const [events] = useState([]);

  // param modal quick tips
  const isOpenModalQuickTips =
    usePageUrlQuery().get("open-quick-tips") === "true";

  // is tour page
  const isRunTourPage =
    dataTestTracker.assignedTest < 1 && !isOpenModalQuickTips;

  const isTourPage =
    usePageUrlQuery().get("is-tour-page") === "true" && !notShowPageTour;

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Onload
  useEffect(() => {
    if (totalResults === 0 && status === "idle") {
      dispatch(getAllChildren());
    }

    if (statusTestTracker === "idle") {
      dispatch(getTestTracker({ providerName: "Grip Learning" }));
    }
  }, []);

  useEffect(() => {
    navigate("");

    if (isRunTourPage && !notShowPageTour) {
      navigate("?is-tour-page=true");
    }
  }, [isGetChild]);

  // disable scroll navbar if is tour page
  useEffect(() => {
    if (isTourPage) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isTourPage]);

  // open modal quick tips
  const openModalQuickTIps = () => {
    navigate("?open-quick-tips=true");
  };

  const closeModalQuickTips = () => {
    navigate("/");
  };

  const slideCarouselToLast = () => {
    if (children?.length === 0) return;
    carouselRef.current.goToSlide(children?.length - 1);
  };

  const closeTourPage = () => {
    navigate("");
  };

  const disablePageTour = () => {
    navigate("");
    cookies.set("disable_page_tour", true);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingLeft: "50px !important",
        paddingRight: "50px !important",
      }}
    >
      <Grid container className={classes.content} spacing={1}>
        <TourPage
          closeTourPage={closeTourPage}
          disablePageTour={disablePageTour}
          disableScrollParentFix
          steps={tourPageTestTracker}
          run={isTourPage}
          continuous
          disableBeacon
          disableOverlayClose
          scrollOffset="100vh"
          disableCloseOnEsc
          hideBackButton
          hideCloseButton
          showSkipButton
          isIcon
        />

        <TestTrackerSection
          openModalAccessCode={openModalAccessCode}
          dataTestTracker={dataTestTracker}
          isSkeleton={isGetChild}
          openModalQuickTIps={openModalQuickTIps}
          isQuickTips={dataTestTracker.assignedTest < 1}
        />

        <Grid item className={classes.title} md={12} xs={12}>
          <div className={classes.dashboardEventTitle}>
            <Typography>Upcoming Events</Typography>
            <p className={classes.dashboardAllEvents}>See All Events</p>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className={classes.dashboardEventWrapper}>
            <Calendar selectedDate={selectedDate} />
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container spacing={1}>
            {events.length ? (
              events?.map((item, index) => (
                <Grid item key={index} md={6}>
                  <Event data={item} />
                </Grid>
              ))
            ) : (
              <Grid item md={12} xs={12}>
                <div className={classes.dashboardNoEvent}>
                  <NoEvent />
                  <p>No Upcoming Event</p>
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item className={classes.title} md={12} xs={12}>
          <Grid container className={classes.dashboardEventTitle}>
            <Typography>{`My Children (${totalResults}/${maxChildren})`}</Typography>
            {totalResults < maxChildren && (
              <div onClick={handleOpen} className={classes.dashboardChildTitle}>
                <AddIcon />
                <p>Add Child</p>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container columnSpacing={3} rowSpacing={2}>
            {totalResults ? (
              <Grid item md={12} xs={12}>
                <Carousel
                  ref={carouselRef}
                  swipeable={true}
                  draggable={true}
                  responsive={responsive}
                  containerClass="carouselWrapper"
                  itemClass="carouselItem"
                  renderButtonGroupOutside={true}
                >
                  {children?.map((item, index) => (
                    <Children key={index} data={item} />
                  ))}
                </Carousel>
              </Grid>
            ) : (
              <Grid item md={12} xs={12}>
                <div className={classes.dashboardNoChild}>
                  <NoChild />
                  <h3>No Children Profile Yet</h3>
                  <h5>
                    You need to create a new children profile. Click this button
                  </h5>
                  <Button onClick={handleOpen} startIcon={<AddIcon />}>
                    Add Child
                  </Button>
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item className={classes.title} md={12} xs={12}>
          <div className={classes.dashboardEventTitle}>
            <Typography>Orders</Typography>
            <a href="/order-list">
              <p className={classes.dashboardAllEvents}>See All Orders</p>
            </a>
          </div>
        </Grid>
        <Grid item md={12} xs={12}>
          <Orders />
        </Grid>
      </Grid>

      <ModalAddChildren
        open={open}
        handleClose={handleClose}
        getChildren={getAllChildren}
        slideCarouselToLast={slideCarouselToLast}
      />

      <ModalQuickTips
        openModal={isOpenModalQuickTips}
        closeModal={closeModalQuickTips}
      />

      <ModalRedeemAccessCode
        open={isOpenModalAccessCode}
        errorMessage={error?.message}
        closeModal={closeModalAccessCode}
        redeemCode={(accessCode) => redeemCode(accessCode)}
      />
    </Container>
  );
};

export default Dashboard;
