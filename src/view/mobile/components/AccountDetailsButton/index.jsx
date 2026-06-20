import React, { memo } from "react";

// Styles
import classes from "./_AccountDetailsButton.module.scss";

/**
 * @param {{
 * title: string
 * value: string;
 * icon: React.ReactNode;
 * onClick: () => void;
 * }} param
 * @returns
 */

const AccountDetailsButton = ({ title, value, icon, onClick }) => {
  return (
    <div onClick={onClick} className={classes.buttonContainer}>
      {icon}
      <div className={classes.titleContainer}>
        <p>{title}</p>
      </div>
      {!!value && <p className={classes.valueText}>{value}</p>}
    </div>
  );
};

export default memo(AccountDetailsButton);
