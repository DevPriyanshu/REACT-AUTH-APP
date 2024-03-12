import { create } from "zustand";
import { User } from "../models/model";

interface IUserStore {
  users: User[];
  // addUser: (u: User) => void;
  // updateUser:(u : User) => void;
  // deleteUser:(u: User) => void
}

const useUserStore = create<IUserStore>(() => ({
  users: [],
  // addUser:(u: User) =>
  // set(())
}));

export { useUserStore };
