import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/types/user";
interface UserStore {
	user: IUser | null;
	setUser: (user: IUser) => void;
}

export const useUserStore = create(
	persist<UserStore>(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
		}),
		{
			name: "user",
		}
	)
);
