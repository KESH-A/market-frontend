import axios from "axios";


const api = axios.create({
  baseURL: "https://market-backend-r4z4.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const getProducts = async () => {
    try {
        const response = await api.get("/products/");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        return [];
    }
};


export const getCategories = async () => {
    try {
        const response = await api.get("/categories/");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error.response?.data || error.message);
        return [];
    }
};


export default api;