import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PrimaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#7E54F1"),
  backgroundColor: "#7E54F1",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#744fd9",
  },
  "&:disabled": {
    color: theme.palette.action.disabled,
    backgroundColor: theme.palette.action.disabledBackground,
  },
}));

export default PrimaryButton;
