// MUI
import { Backdrop, Box, CircularProgress } from "@mui/material";

const Preloader = () => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1100 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          zIndex: (theme) => theme.zIndex.drawer + 1000,
          position: "fixed",
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
};

export default Preloader;
