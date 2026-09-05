import axios from "axios";
const BASE_URL = 'https://market-backend-r4z4.onrender.com';


const api = axios.create({
  baseURL: "https://market-backend-r4z4.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/categories/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/products/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


export default api;