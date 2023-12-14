import { BrowserRouter, Route, Routes } from "react-router-dom";
import Claims from "../pages/Claims";
import LoginScreen from "../pages/LoginScreen";

const RouterWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/claims" element={<Claims/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterWrapper;