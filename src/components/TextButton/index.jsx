import Button from "@mui/material/Button";
import "./style.scss";

function TextButton({ className, children, ...otherProps }) {
  return (
    <Button className={`${className} text-button`} {...otherProps}>
      {children}
    </Button>
  );
}

export default TextButton;
