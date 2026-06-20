import Button from "@mui/material/Button";

import classes from "./_TextButton.module.scss";

/**
 *
 * @param {{
 * fullWidth : boolean
 * children : JSX.Element
 * className : string
 * }} props
 * @returns
 */

function TextButton({ children, fullWidth, className, ...otherProps }) {
  return (
    <Button
      disableRipple
      fullWidth={fullWidth}
      className={`${classes["text-button"]} ${className}`}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

export default TextButton;
