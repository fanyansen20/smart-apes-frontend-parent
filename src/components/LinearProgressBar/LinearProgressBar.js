import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

const LinearProgressBar = styled(LinearProgress)(() => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #7966FA",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#7966FA",
  },
}));

export default LinearProgressBar;
