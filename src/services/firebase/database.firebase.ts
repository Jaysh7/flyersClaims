/* eslint-disable @typescript-eslint/no-explicit-any */
import { Unsubscribe } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "./config";
import { CLAIMS, DEPARTMENTS, EMPLOYEE } from "./constants";

export async function useUserListener(uid: string, callback: any) {
  const [isListenerActive, setIsListenerActive] = useState(false);
  const listenerRef = useRef<Unsubscribe>();
  useEffect(() => {
    (async () => {
      if (uid && !isListenerActive && !listenerRef.current) {
        try {
          listenerRef.current = onSnapshot(doc(db, EMPLOYEE, uid), (doc) => {
            callback(doc.data());
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

export async function useClaimsListener(uid: string, callback: any) {
  console.log("uid", uid);
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
    const departments:any = [];
    querySnapshot.forEach((doc) => {
      departments.push(doc.data());
    });
    return departments;
  } catch (error) {
    console.log("get departments error", error);
  }
}
