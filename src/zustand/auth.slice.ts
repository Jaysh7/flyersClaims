import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

export const useAuth = create(
  devtools(
    persist(
      (set, get: any) => ({
        data: 0,
        addAuthData: (data: any) => set({ ...get(), data: data }),
      }),
      {
        name: "auth-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);
