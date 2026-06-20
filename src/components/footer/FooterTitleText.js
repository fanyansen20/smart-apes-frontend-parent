import { Typography } from "@mui/material";

const FooterTitleText = (props) => {
  return (
    <Typography
      sx={{
        fontWeight: "700",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0.2px",
        color: "#FFFFFF",
      }}
    >
      {props.children}
    </Typography>
  );
};

export default FooterTitleText;
