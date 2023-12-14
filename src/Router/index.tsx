import { Route, Routes } from "react-router-dom";
import Claims from "../pages/Claims";
import LoginScreen from "../pages/LoginScreen";
import RegisterPage from "../pages/RegisterPage";
import PendingApprovals from "../pages/PendingApprovals";

const RouterWrapper = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/claims" element={<Claims />} />
      <Route path="/pendingApprovals" element={<PendingApprovals />} />
      <Route path="/signup" element={<RegisterPage />} />
    </Routes>
  );
};

export default RouterWrapper;
