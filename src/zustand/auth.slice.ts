import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set, get: any) => ({
      data: null,
      users: null,
      addAuthData: (data: any) => set({ ...get(), data: data }),
      setUsersData: (data: any) => set({ ...get(), users: data }),
      reset: () => set({ ...get(), data: null, users: null })
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
);
