import { memo } from "react";

// MUI
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Grid } from "@mui/material";

const Event = (props) => {
  const { data } = props;
  return (
    <Grid container className="container-event">
      <div>
        <img className="profile-image" src={data.profPict} alt="profile" />
      </div>
      <div className="container-event-detail">
        <div className="event__date">
          {data.date} | {data.time}
        </div>
        <div className="event__name">{data.eventName}</div>
        <div className="event__detail_container">
          <div className="event__detail">
            <VideocamIcon fontSize="14" />
            <p>{data.platform}</p>
          </div>
          <div className="event__detail">
            <AccessTimeIcon fontSize="14" />
            <p>{data.hours}</p>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default memo(Event);
