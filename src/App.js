// React
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { useSelector } from "react-redux";

// Styles
import "@fontsource/mulish";
import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./App.scss";
import "./styles/main.scss";

// Routes
import DesktopRoutes from "./routes/DesktopRoutes.js";
import MobileRoutes from "./routes/MobileRoutes.js";

function App() {
  const { theme } = useSelector((state) => state.appConfig);
  const renderApp = () => {
    if (isDesktop) {
      return (
        <div className={`App ${theme}-theme`}>
          <DesktopRoutes />
        </div>
      );
    }

    if (isTablet) {
      return <div>Tablet View</div>;
    }

    if (isMobile) {
      return (
        <div className={`App ${theme}-theme`}>
          <MobileRoutes />
        </div>
      );
    }
  };

  return renderApp();
}

export default App;
