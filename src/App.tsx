import RouterWrapper from "./RouterWrapper";
import "./App.css";
import "./services/firebase/config";
import { useAuth } from "./zustand/auth.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const authSlice: any = useAuth();
  const navigate = useNavigate();
  console.log("authSlice", authSlice);
  useEffect(() => {
    if (authSlice.data?.uid) {
      if (
        location.pathname.includes("login") ||
        location.pathname.includes("signup")
      ) {
        navigate("/claims");
      }
    }
    if (!authSlice.data?.uid) {
      if (
        !location.pathname.includes("login") &&
        !location.pathname.includes("signup")
      ) {
        navigate("/login");
      }
    }
  }, [location.pathname, authSlice.data]);

  return <RouterWrapper />;
}

export default App;
