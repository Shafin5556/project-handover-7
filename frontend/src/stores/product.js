import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
    async createProduct(formData) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/products`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        this.products.push(response.data);
      } catch (error) {
        throw error.response?.data || { error: "Failed to post product" };
      }
    },
    async fetchUserProducts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/my-products`,
          {
            withCredentials: true,
          }
        );
        this.products = response.data;
      } catch (error) {
        throw error.response?.data || { error: "Failed to fetch products" };
      }
    },
    async updateProduct(id, formData) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }
        return response.data;
      } catch (error) {
        throw error.response?.data || { error: "Failed to update product" };
      }
    },
    async deleteProduct(id) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log("Delete product response:", response.data);
        this.products = this.products.filter((p) => p.id !== id);
        this.adminProducts = this.adminProducts.filter((p) => p.id !== id);
        return response.data; // Return response for success handling
      } catch (error) {
        const err = error.response?.data || {
          error: "Failed to delete product",
          details: error.message,
        };
        console.error("Delete product error:", err);
        throw err;
      }
    },
    async fetchAdminProducts(approval = "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/admin`,
          {
            params: { approval },
            withCredentials: true,
          }
        );
        this.adminProducts = response.data;
        return response.data; // Return data for UI updates
      } catch (error) {
        const err = error.response?.data || {
          error: "Failed to fetch admin products",
          details: error.message,
        };
        console.error("Fetch admin products error:", err);
        throw err;
      }
    },
    async updateProductApproval(id, p_approval) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/products/${id}/approval`,
          { p_approval },
          { withCredentials: true }
        );
        const index = this.adminProducts.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.adminProducts[index] = response.data;
        }
        return response.data;
      } catch (error) {
        throw error.response?.data || { error: "Failed to update approval" };
      }
    },
  },
});
