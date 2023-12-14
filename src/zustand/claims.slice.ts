import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

export const useClaims = create(
  devtools(
    persist(
      (set, get: any) => ({
        data: null,
        setClaims: (data: any) => set({ ...get(), data: data })
      }),
      {
        name: "claims-storage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
      }
    )
  )
);
