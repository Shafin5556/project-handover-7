import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async register(formData) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/register`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true, // Include cookies
          }
        );
        this.user = response.data.user;
      } catch (error) {
        throw error.response?.data?.error || "Registration failed";
      }
    },
    async login({ email, password }) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/login`,
          { email, password },
          {
            withCredentials: true, // Include cookies
          }
        );
        this.user = response.data.user;
      } catch (error) {
        throw error.response?.data?.error || "Login failed";
      }
    },
    async checkAuth() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/check-auth`,
          {
            withCredentials: true, // Include cookies
          }
        );
        this.user = response.data.user;
        return true;
      } catch (error) {
        this.user = null;
        return false;
      }
    },
    async logout() {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        this.user = null;
      } catch (error) {
        throw error.response?.data?.error || "Logout failed";
      }
    },

    async getUsers() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`,
          {
            withCredentials: true,
          }
        );
        return response.data.users;
      } catch (error) {
        throw error.response?.data?.error || "Failed to fetch users";
      }
    },

    async updateUserStatus(id, stats) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/users/${id}/status`,
          { stats },
          {
            withCredentials: true,
          }
        );
        return response.data.user;
      } catch (error) {
        throw error.response?.data?.error || "Failed to update user status";
      }
    },

    async deleteUser(id) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
          withCredentials: true,
        });
      } catch (error) {
        throw error.response?.data?.error || "Failed to delete user";
      }
    },
  },
});
