import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";
import type { ReactElement } from "react";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/DashboardUnit/Home";
import HomeMutu from "./pages/DashboardMutu/HomeMutu";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import UserProfiles from "./pages/UserProfiles";
import NotFound from "./pages/OtherPage/NotFound";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import { Role, useAuth } from "./context/AuthContext";

function RequireRole({
  allowed,
  children,
}: {
  allowed: Role[];
  children: ReactElement;
}) {
  const { role, isReady } = useAuth();
  const location = useLocation();
  const resolvedRole = role ?? (localStorage.getItem("userRole") as Role | null);

  if (!isReady && !resolvedRole) {
    return null;
  }

  if (!resolvedRole) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!allowed.includes(resolvedRole)) {
    if (resolvedRole === "perawat")
      return <Navigate to="/klasifikasi-ai" replace />;
    if (resolvedRole === "unit") return <Navigate to="/dashboard-unit" replace />;
    if (resolvedRole === "mutu") return <Navigate to="/dashboard-mutu" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard-unit"
            element={
              <RequireRole allowed={["unit"]}>
                <Home />
              </RequireRole>
            }
          />

          <Route
            path="/dashboard-mutu"
            element={
              <RequireRole allowed={["mutu"]}>
                <HomeMutu />
              </RequireRole>
            }
          />

          <Route
            path="/data-kejadian"
            element={
              <RequireRole allowed={["perawat", "unit", "mutu"]}>
                <BasicTables />
              </RequireRole>
            }
          />

          <Route
            path="/klasifikasi-ai"
            element={
              <RequireRole allowed={["perawat"]}>
                <FormElements />
              </RequireRole>
            }
          />

          <Route
            path="/profile"
            element={
              <RequireRole allowed={["perawat", "unit", "mutu"]}>
                <UserProfiles />
              </RequireRole>
            }
          />
        </Route>

        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
