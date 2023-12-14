import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = {
  login: (email: string, password: string, callback: Function) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        callback(userCredential.user);
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log("error", error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },
  register: (email: string, password: string, callback: Function) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        callback(user);
        console.log("user", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  },
  logout: (stateClearCallback : any) => {
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
  },
};
export default auth;
