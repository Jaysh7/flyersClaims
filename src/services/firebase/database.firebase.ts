/* eslint-disable @typescript-eslint/no-explicit-any */
import { Unsubscribe } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db, storage } from "./config";
import { CLAIMS, DEPARTMENTS, EMPLOYEE } from "./constants";
import { uploadClaimAttachment } from "./stoarage.firebase";
import { getFileExtension } from "../../utils/functions";
import { getDownloadURL, ref } from "firebase/storage";
import { errorService } from "../error/error.service";
import { message } from "antd";

export async function useUserListener(uid: string, callback: any) {
  const [isListenerActive, setIsListenerActive] = useState(false);
  const userListenerRef = useRef<Unsubscribe>();
  useEffect(() => {
    (async () => {
      if (uid && !isListenerActive && !userListenerRef.current) {
        try {
          userListenerRef.current = onSnapshot(
            doc(db, EMPLOYEE, uid),
            (doc) => {
              callback(doc.data());
            }
          );
          setIsListenerActive(true);
        } catch (error: any) {
          message.error(errorService(error.message));
          console.error(error);
        }
      }
    })();
    return () => {
      setIsListenerActive(false);
      if (userListenerRef.current) {
        try {
          // To turn-off the listener
          userListenerRef.current();
          userListenerRef.current = undefined;
        } catch (error: any) {
          message.error(errorService(error.message));
          console.error(error);
        }
      }
    };
    // eslint-disable-next-line
  }, [uid]);
}

export async function useClaimsListener(uid: string, callback: any) {
  const [isListenerActive, setIsListenerActive] = useState(false);
  const listenerRef = useRef<Unsubscribe>();
  useEffect(() => {
    (async () => {
      if (uid && !isListenerActive && !listenerRef.current) {
        try {
          const q = query(collection(db, CLAIMS));
          listenerRef.current = onSnapshot(q, (querySnapshot) => {
            const cities: any[] = [];
            querySnapshot.forEach((doc) => {
              cities.push(doc.data());
            });
            callback(cities);
          });
          setIsListenerActive(true);
        } catch (error: any) {
          message.error(errorService(error.message));
          console.error(error);
        }
      }
    })();
    return () => {
      setIsListenerActive(false);
      if (listenerRef.current) {
        try {
          // To turn-off the listener
          listenerRef.current();
          listenerRef.current = undefined;
        } catch (error: any) {
          message.error(errorService(error.message));
          console.error(error);
        }
      }
    };
    // eslint-disable-next-line
  }, [uid]);
}

export async function useUsersListener(uid: string, callback: any) {
  const [isListenerActive, setIsListenerActive] = useState(false);
  const usersListenerRef = useRef<Unsubscribe>();
  useEffect(() => {
    (async () => {
      if (uid && !isListenerActive && !usersListenerRef.current) {
        try {
          const q = query(collection(db, EMPLOYEE));
          usersListenerRef.current = onSnapshot(q, (querySnapshot) => {
            const cities: any[] = [];
            querySnapshot.forEach((doc) => {
              cities.push(doc.data());
            });
            callback(cities);
          });
          setIsListenerActive(true);
        } catch (error: any) {
          message.error(errorService(error.message));
          console.error(error);
        }
      }
    })();
    return () => {
      setIsListenerActive(false);
      if (usersListenerRef.current) {
        try {
          // To turn-off the listener
          usersListenerRef.current();
          usersListenerRef.current = undefined;
        } catch (error: any) {
          message.error(errorService(error.message));
          console.error(error);
        }
      }
    };
    // eslint-disable-next-line
  }, [uid]);
}

export async function getAllDepartments() {
  try {
    const q = query(collection(db, DEPARTMENTS));
    const querySnapshot = await getDocs(q);
    const departments: any = [];
    querySnapshot.forEach((doc) => {
      departments.push(doc.data());
    });
    return departments;
  } catch (error: any) {
    message.error(errorService(error.message));
    console.error("get departments error", error);
  }
}

export async function getAllLeads() {
  try {
    const q = query(collection(db, EMPLOYEE), where("isLead", "==", true));
    const querySnapshot = await getDocs(q);
    const departments: any = [];
    querySnapshot.forEach((doc) => {
      departments.push(doc.data());
    });
    return departments;
  } catch (error: any) {
    message.error(errorService(error.message));
    console.error("get departments error", error);
  }
}

export async function addClaim(data: any, userId: string) {
  try {
    const file = data?.attachment?.file;
    const docRef = await addDoc(collection(db, CLAIMS), {
      ...data,
      date: new Date(data).toLocaleDateString(),
      attachment: {
        path: "",
        downloadUrl: ""
      }
    });
    await uploadClaimAttachment(
      file,
      userId,
      `${docRef.id}.${getFileExtension(file.name)}`
    );
    const filePath = `${EMPLOYEE}/${userId}/${docRef.id}.${getFileExtension(
      file.name
    )}`;
    await getDownloadURL(ref(storage, filePath))
      .then(async (url) => {
        const washingtonRef = doc(db, CLAIMS, docRef.id);
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          attachment: {
            path: filePath,
            downloadUrl: url,
            name: file?.name
          },
          id: docRef.id
        });
      })
      .catch((error) => {
        console.error("error", error);
        // Handle any errors
      });
  } catch (error: any) {
    message.error(errorService(error.message));
    console.error("error", error);
  }
}

export async function approveClaim(data: any) {
  try {
    const washingtonRef = doc(db, CLAIMS, data.id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, { ...data });
  } catch (error: any) {
    message.error(errorService(error.message));
    console.error("get departments error", error);
  }
}

export async function updateUserRole(data: any) {
  try {
    const washingtonRef = doc(db, EMPLOYEE, data.uid);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, { ...data });
    message.success("User role updated successfully");
  } catch (error: any) {
    message.error(errorService(error.message));
    console.error("get departments error", error);
  }
}