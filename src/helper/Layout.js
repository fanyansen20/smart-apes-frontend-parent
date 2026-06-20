//React
import { Outlet } from "react-router-dom";

//Component
import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
