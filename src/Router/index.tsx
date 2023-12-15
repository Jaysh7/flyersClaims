import { Route, Routes } from "react-router-dom";
import Claims from "../pages/Claims";
import LoginScreen from "../pages/LoginScreen";
import RegisterPage from "../pages/RegisterPage";
// import PendingApprovals from "../pages/PendingApprovals";
import UsersPage from "../pages/Users";

const RouterWrapper = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/claims" element={<Claims />} />
      {/* <Route path="/pendingApprovals" element={<PendingApprovals />} /> */}
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/users" element={<UsersPage/>} />
    </Routes>
  );
};

export default RouterWrapper;
