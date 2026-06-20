import { styled } from "@mui/material";
import Link from "@mui/material/Link";

const LinkText = styled(Link)(() => ({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "12px",
  lineHeight: "15px",
  userSelect: "none",
  cursor: "pointer",
  color: "#7E54F1",
  textDecorationColor: "#7E54F1",
  position: "relative",
  zIndex: 10,
}));

export default LinkText;
