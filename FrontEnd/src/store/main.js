import { create } from 'zustand';
import http from "../plugins/https";

const useStore = create((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
    },

    fetchUser: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("NO TOKEN")
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
    addFavorite: async (postId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await http.post("http://localhost:2002/favorites/add", { postId }, {
                headers: { Authorization: token }
            });

            if (res.success) {
                set({ favorites: res.favorites });
            }
        } catch (error) {
            console.log("Error adding favorite:", error);
        }
    },

    removeFavorite: async (postId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await http.post("http://localhost:2002/favorites/remove", { postId }, {
                headers: { Authorization: token }
            });

            if (res.success) {
                set({ favorites: res.favorites });
            }
        } catch (error) {
            console.log("Error removing favorite:", error);
        }
    }


}));

export default useStore;
