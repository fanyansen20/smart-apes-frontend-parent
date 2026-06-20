//React
import { Outlet } from "react-router-dom";

//Component
import Footer from "../view/mobile/components/ChildrenFooterNavigation";

const LayoutChildrenMobile = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutChildrenMobile;
