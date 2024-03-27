import { create } from "zustand";
import { User } from "../models/model";
import createAxiosInstance from "../api/axios-config";
interface IUserStore {
  initUsers: () => Promise<void>;
  users: User[];
  addUser: (u: User) => void;
  updateUser: (u: User) => void;
  deleteUser: (userId: number) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  async initUsers() {
    try {
      const response = await createAxiosInstance.get("users");
      set({ users: response.data });
    } catch (error) {
      console.log("Error while fetching user's ", "error");
    }
  },

  users: [],
  addUser: (u: User) =>
    set((state) => ({
      users: [...state.users, u],
    })),
  updateUser: (updatedUser: User) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (userId: number) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));

export { useUserStore };
