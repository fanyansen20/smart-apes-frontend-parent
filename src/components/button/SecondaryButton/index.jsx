import Button from "@mui/material/Button";

import classes from "./_SecondaryButton.module.scss";

/**
 *
 * @param {{
 * disabled : boolean
 * children : JSX.Element
 * }} param0
 * @returns
 */

function SecondaryButton({ children, disabled, ...otherProps }) {
  return (
    <Button
      disabled={disabled}
      className={classes["secondary-button"]}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

export default SecondaryButton;
