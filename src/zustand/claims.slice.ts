import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useClaims = create(
  persist(
    (set, get: any) => ({
      data: null,
      setClaims: (data: any) => set({ ...get(), data: data }),
      reset: () => {
        set({ ...get(), data: null });
      }
    }),
    {
      name: "claims-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
);
