// React
import { memo } from "react";
import { Link } from "react-router-dom";

// MUI
import { Button } from "@mui/material";

const Children = (props) => {
  const { data } = props;
  return (
    <div className="children-container">
      <img className="children-picture" src={data.avatar} alt="children" />
      <p className="children-name">{data.name}</p>
      <div className="btn-container">
        <Link to={data.url}>
          <Button className="btn-details">Children Dashboard</Button>
        </Link>
        <Link to={`/children/${data.id}/assessment-central`}>
          <Button className="btn-assessment">Assessment Central</Button>
        </Link>
      </div>
    </div>
  );
};

export default memo(Children);
