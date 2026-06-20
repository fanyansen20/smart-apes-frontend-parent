// React
import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Helper
import AuthRoute from "../helper/AuthRoute";
import Layout from "../helper/Layout";
import LayoutChildren from "../helper/LayoutChildren";
import LayoutFreeAssessment from "../helper/LayoutFreeAssessment";

// Fonts
import "@fontsource/mulish";
import "@fontsource/poppins";

// Components
import Preloader from "../components/preloader/Preloader";

// Lazy Component Pages
const Dashboard = React.lazy(() => import("../view/desktop/pages/Dashboard"));
const LayoutOrderList = React.lazy(() =>
  import("../components/layout/LayoutOrderList/index.jsx")
);
const OrderList = React.lazy(() => import("../pages/OrderList/index"));
const DisputedOrder = React.lazy(() => import("../pages/DisputedOrder/index"));

const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Wallet = React.lazy(() => import("../pages/Wallet/Wallet"));
const TermsOfServices = React.lazy(() => import("../pages/TermsOfServices"));

// children
const ChildrenDasboard = React.lazy(() =>
  import("../pages/ChildrenDashboard/ChildrenDashboard")
);
const AssessmentCentral = React.lazy(() =>
  import("../pages/ChildrenDashboard/AssessmentCentral/AssessmentCentral")
);
const SummaryTest = React.lazy(() =>
  import("../view/desktop/pages/Children/SummaryTest")
);

const LearningProfilingCentralLayout = React.lazy(() =>
  import(
    "../view/desktop/pages/Children/LearningProfilingCentral/components/LearningProfilingCentralLayout"
  )
);

const LearningProfilingCentral = React.lazy(() =>
  import("../view/desktop/pages/Children/LearningProfilingCentral")
);

const FreeAssessment = React.lazy(() =>
  import("../pages/ChildrenDashboard/FreeAssessment/FreeAssessment")
);
const AssessmentResult = React.lazy(() =>
  import("../pages/ChildrenDashboard/AssessmentResult/AssessmentResult")
);
const AssessmentSummary = React.lazy(() =>
  import("../pages/ChildrenDashboard/AssessmentSummary/AssessmentSummary")
);

const SecretLogin = React.lazy(() =>
  import("../pages/SecretLogin/SecretLogin")
);
const Unauthenticated = React.lazy(() =>
  import("../pages/Unauthenticated/Unauthenticated")
);
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const InvoiceOrder = React.lazy(() => import("../pages/InvoiceOrder"));
const PrivacyPolicy = React.lazy(() => import("../pages/PrivacyPolicy"));
const ProductsRating = React.lazy(() => import("../pages/ProductsRating"));

const DesktopRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route element={<Layout />}>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/order-list" element={<OrderList type="order" />} />
              <Route element={<LayoutOrderList />}>
                <Route path="/disputed-order" element={<DisputedOrder />} />
              </Route>
              <Route path="/give-ratings" element={<ProductsRating />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/terms-of-services" element={<TermsOfServices />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
            <Route element={<LayoutChildren />}>
              <Route path="/children/:id" element={<ChildrenDasboard />} />
              <Route
                path="/children/:id/assessment-central"
                element={<AssessmentCentral />}
              />
              <Route element={<LearningProfilingCentralLayout />}>
                <Route
                  path="/children/:childrenId/learning-profiling-central"
                  element={<LearningProfilingCentral />}
                />
              </Route>
              <Route
                path="/children/:childrenId/summary-test/:referenceId"
                element={<SummaryTest />}
              />
            </Route>
            <Route element={<LayoutFreeAssessment />}>
              <Route
                path="/children/:childrenId/free-assessment/:freeAssessmentId/attempt/:attemptId"
                element={<FreeAssessment />}
              />
              <Route
                path="/children/:childrenId/free-assessment/:freeAssessmentId/result/:attemptId"
                element={<AssessmentResult />}
              />
              <Route
                path="/children/:childrenId/free-assessment/:freeAssessmentId/summary/:attemptId"
                element={<AssessmentSummary />}
              />
            </Route>
            <Route path="/invoice/:orderId" element={<InvoiceOrder />} />
          </Route>
          {process.env.NODE_ENV === "development" && (
            <Route path="/login" element={<SecretLogin />} />
          )}
          <Route path="/unauthenticated" element={<Unauthenticated />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default DesktopRoutes;
