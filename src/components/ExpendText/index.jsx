import React, { useState } from "react";

// styles
import classes from "./_ExpendText.module.scss";

/**
 * @param {{
 * text : string
 * additionalText : string
 * limitText : string
 * }} param0
 * @returns {JSX.Element}
 */

const ExpendText = ({ text, additionalText, limitText }) => {
  const [expend, setExpend] = useState(false);

  return (
    <div className={classes.container}>
      {additionalText}

      <>
        <span className={classes.textContent}>
          {expend || text.length < limitText
            ? text
            : ` ${text.substring(0, limitText)}...`}
        </span>

        {text.length > limitText && (
          <span
            onClick={() => setExpend(!expend)}
            className={classes.btnSeeMore}
          >
            {expend ? "See Less" : "See more"}
          </span>
        )}
      </>
    </div>
  );
};

export default ExpendText;
