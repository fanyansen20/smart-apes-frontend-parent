import { Link } from "@mui/material";

const FooterDetailLink = (props) => {
  return (
    <Link
      sx={{
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "18px",
        letterSpacing: "0.1px",
        color: "#FFFFFF",
        textDecoration: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
      href="/"
      gap={1}
    >
      {props.children}
    </Link>
  );
};

export default FooterDetailLink;
