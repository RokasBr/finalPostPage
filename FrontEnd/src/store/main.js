import { create } from 'zustand';
import http from "../plugins/https";

const useStore = create((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    fetchUser: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        try {
            // const res = await http.getToken("http://localhost:2002/getUser");
            const res = await http.get("http://localhost:2002/getUser");
            if (res.success) {
                set({ user: res.user });
            } else {
                localStorage.removeItem("token"); // If token is invalid, remove it
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem("token");
        }
    },





}));

export default useStore;
