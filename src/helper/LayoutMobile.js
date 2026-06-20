//React
import { Outlet } from "react-router-dom";

//Component
import Footer from "../view/mobile/components/FooterNavigation";

const LayoutMobile = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutMobile;
