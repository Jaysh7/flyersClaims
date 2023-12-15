/* eslint-disable @typescript-eslint/no-explicit-any */
import { Unsubscribe } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db, storage } from "./config";
import { CLAIMS, DEPARTMENTS, EMPLOYEE } from "./constants";
import { uploadClaimAttachment } from "./stoarage.firebase";
import { getFileExtension } from "../../utils/functions";
import { getDownloadURL, ref } from "firebase/storage";

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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
  } catch (error) {
    console.log("get departments error", error);
  }
}

export async function addClaim(data: any, userId: string) {
  try {
    const file = data?.attachment?.file;
    console.log("file", file);
    const docRef = await addDoc(collection(db, CLAIMS), {
      ...data,
      date: new Date(data).toLocaleDateString(),
      attachment: {
        path: "",
        downloadUrl: ""
      }
    });
    console.log("Document written with ID: ", docRef.id);
    uploadClaimAttachment(
      file,
      userId,
      `${docRef.id}.${getFileExtension(file.name)}`
    );
    const filePath = `${EMPLOYEE}/${userId}/${docRef.id}.${getFileExtension(
      file.name
    )}`;
    getDownloadURL(ref(storage, filePath))
      .then(async (url) => {
        const washingtonRef = doc(db, CLAIMS, docRef.id);
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          attachment: {
            path: filePath,
            downloadUrl: url,
            name: file?.name
          }
        });
      })
      .catch((error) => {
        console.log("error", error);
        // Handle any errors
      });
  } catch (error) {
    console.log("get departments error", error);
  }
}
