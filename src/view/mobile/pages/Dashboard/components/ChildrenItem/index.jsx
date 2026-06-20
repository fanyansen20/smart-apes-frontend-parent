// React
import { memo } from "react";
import { Link } from "react-router-dom";

// MUI
import { Typography } from "@mui/material";

// Components
import PrimaryButton from "../../../../../../components/PrimaryButton";
import SecondaryButton from "../../../../../../components/button/SecondaryButton";

// Styles
import classes from "./_ChildrenItem.module.scss";

/**
 * @param {{
 * data: {avatar: string, name: string, url: string, id: number},
 * type: 1 | 2,
 * }} param
 * @returns
 */

const ChildrenItem = ({ data, type }) => {
  return (
    <div className={classes["children-container"]}>
      <div className={classes["children-content-container"]}>
        <div className={classes["children-profile-name"]}>
          <img
            className={classes["children-picture-circle"]}
            src={data.avatar}
            alt="children"
          />
          <Typography className={classes["children-name"]}>
            {data.name}
          </Typography>
        </div>
      </div>
      <div
        className={
          type === 1
            ? classes["btn-container-column"]
            : classes["btn-container-row"]
        }
      >
        <Link to={data.url} className={classes.linkBtn}>
          <SecondaryButton fullWidth>Children Dashboard</SecondaryButton>
        </Link>
        <Link
          to={`/children/${data.id}/assessment-central`}
          className={classes.linkBtn}
        >
          <PrimaryButton fullWidth>Assessment Central</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default memo(ChildrenItem);
