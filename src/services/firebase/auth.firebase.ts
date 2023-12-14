import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { EMPLOYEE } from "./constants";

const auth = {
  login: (email: string, password: string, callback: Function) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        callback(userCredential.user);
        const user = userCredential.user;
        console.log("user", user);
        // ...
      })
      .catch((error) => {
        console.log("error", error);
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
        console.log("user registration", data);
        // ..
      });
  },
  logout: (stateClearCallback: any) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        stateClearCallback(null);
        // Sign-out successful.
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
      });
  }
};
export default auth;
