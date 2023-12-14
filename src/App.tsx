/* eslint-disable @typescript-eslint/no-explicit-any */
import RouterWrapper from "./Router";
import "./App.css";
import "./services/firebase/config";
import { useAuth } from "./zustand/auth.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useClaimsListener,
  useUserListener
} from "./services/firebase/database.firebase";
import { useClaims } from "./zustand/claims.slice";
function App() {
  const authSlice: any = useAuth();
  const claimsSlice: any  = useClaims();
  const navigate: any  = useNavigate();

  // user details firebase listener
  useUserListener(authSlice.data?.uid, authSlice.addAuthData);
  useClaimsListener(authSlice.data?.uid, claimsSlice.setClaims);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, authSlice.data]);

  return <RouterWrapper />;
}

export default App;
