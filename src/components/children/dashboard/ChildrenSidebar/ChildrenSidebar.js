// React
import { useState } from "react";

// MUI
import { Avatar, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Component
import CalendarComp from "../../../calendar/CalendarComp";
import PrimaryButton from "../../../../components/PrimaryButton";

const ChildrenSidebar = ({ profile, handleOpen }) => {
  // Mark in calendar
  const [selectedDate] = useState([
    new Date("2023-01-08T00:00:00Z"),
    new Date("2023-01-10T00:00:00Z"),
  ]);

  return (
    <div className="containerChildrenSidebar">
      {/* Profile */}
      <div>
        <p className="sectionTitle">Children Profile</p>
        <div className="profileSection">
          <div className="upperProfile">
            <Avatar
              alt={profile?.full_name}
              src={profile?.profile_pic}
              sx={{ width: 90, height: 90 }}
            />
            <h3>{profile?.full_name}</h3>
            <div className="status">
              <h5>{profile?.level}</h5>
              {/* <h5>|</h5>
              <h5>100pt</h5> */}
            </div>
          </div>
          <div className="bottomProfile">
            <Button onClick={handleOpen} fullWidth>
              <p>Edit Profile</p>
            </Button>
          </div>
        </div>
      </div>
      {/* Profile */}
      <div>
        <p className="sectionTitle">Recent Assessment</p>
        <Button className="recentAssessment" fullWidth>
          <div className="contentWrapper">
            <img
              src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
              alt="Recent Assessment"
            />
            <div className="assessmentTitle">
              <h3>Basic Math Secondary 2 Assessment Test</h3>
              <h5>See Results</h5>
            </div>
            <KeyboardArrowRightIcon />
          </div>
        </Button>
      </div>
      {/* Calendar */}
      <div>
        <p className="sectionTitle">Calendar</p>
        <div className="childrenCalendar">
          <CalendarComp selectedDate={selectedDate} />
        </div>
      </div>
      {/* Upcoming */}
      <div>
        <p className="sectionTitle">Upcoming</p>
        <div className="upcomingEvents">
          <div>
            <h5>06 October 2024 14:00</h5>
            <h3>GRIP Personality Workshop</h3>
          </div>
          <PrimaryButton>Book Now</PrimaryButton>
        </div>
        {/* <div className="upcomingEvents">
          <div className="noEvent">No Upcoming Event</div>
        </div> */}
      </div>
    </div>
  );
};

export default ChildrenSidebar;
