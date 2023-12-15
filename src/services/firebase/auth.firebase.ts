/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { EMPLOYEE } from "./constants";
import { message } from "antd";
import { errorService } from "../error/error.service";

const auth = {
  login: (email: string, password: string, callback: Function) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        callback({ uid: userCredential.user?.uid });
      })
      .catch((error: any) => {
        message.error(errorService(error.message));
        console.error("error", error);
      });
  },
  register: (data: any, callback: Function) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        delete data.password;
        // Signed up
        const user = userCredential.user;
        callback({ uid: user?.uid });
        setDoc(doc(db, EMPLOYEE, user?.uid), { ...data, uid: user?.uid });
      })
      .catch((error) => {
        message.error(errorService(error.message));
        console.error("error", error);
      });
  },
  logout: (stateClearCallback: any) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        stateClearCallback();
        // Sign-out successful.
      })
      .catch((error) => {
        message.error(errorService(error.message));
        console.error("error", error);
        // An error happened.
      });
  }
};
export default auth;
