import axios from 'axios';

const BASE_URL = 'https://market-backend-r4z4.onrender.com';

const ACCESS_KEY = 'nexus_access_token';
const REFRESH_KEY = 'nexus_refresh_token';

const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

const setTokens = (tokens) => {
  if (tokens?.access) localStorage.setItem(ACCESS_KEY, tokens.access);
  if (tokens?.refresh) localStorage.setItem(REFRESH_KEY, tokens.refresh);
};

const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue = [];

const resolveQueue = (error, token) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry && getRefreshToken()) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${BASE_URL}/api/accounts/token/refresh/`, {
          refresh: getRefreshToken()
        });
        setTokens(data);
        resolveQueue(null, data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        resolveQueue(refreshError, null);
        clearTokens();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const unwrapList = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
};

export const login = async (username, password) => {
  const { data } = await api.post('/api/accounts/login/', { username, password });
  setTokens(data);
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post('/api/accounts/register/', payload);
  return data;
};

export const logout = () => {
  clearTokens();
};

export const isAuthenticated = () => Boolean(getAccessToken());

export const getProfile = async () => {
  const { data } = await api.get('/api/accounts/profile/');
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.patch('/api/accounts/profile/', payload);
  return data;
};

export const getProducts = async () => {
  const { data } = await api.get('/api/products/products/');
  return unwrapList(data);
};

export const getProduct = async (id) => {
  const { data } = await api.get(`/api/products/products/${id}/`);
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await api.post('/api/products/products/', payload);
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await api.patch(`/api/products/products/${id}/`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/api/products/products/${id}/`);
};

export const getCategories = async () => {
  const { data } = await api.get('/api/products/categories/');
  return unwrapList(data);
};

export const getCategory = async (id) => {
  const { data } = await api.get(`/api/products/categories/${id}/`);
  return data;
};

export const getWishlist = async () => {
  const { data } = await api.get('/api/products/wishlist/');
  return unwrapList(data);
};

export const toggleWishlist = async (productId) => {
  const { data } = await api.post('/api/products/wishlist/toggle/', { product: productId });
  return data;
};

export const getCart = async () => {
  const { data } = await api.get('/api/cart/');
  return data;
};

export const createCart = async () => {
  const { data } = await api.post('/api/cart/');
  return data;
};

export const updateCart = async (id, payload) => {
  const { data } = await api.patch(`/api/cart/${id}/`, payload);
  return data;
};

export const deleteCart = async (id) => {
  await api.delete(`/api/cart/${id}/`);
};

export const addCartItem = async (productId, quantity) => {
  const { data } = await api.post('/api/cart/add/', { product_id: productId, quantity });
  return data;
};

export const removeCartItem = async (itemId) => {
  await api.delete(`/api/cart/remove/${itemId}/`);
};

export const getOrders = async () => {
  const { data } = await api.get('/api/orders/');
  return unwrapList(data);
};

export const getOrder = async (id) => {
  const { data } = await api.get(`/api/orders/${id}/`);
  return data;
};

export const createOrder = async (shippingAddress, items) => {
  const { data } = await api.post('/api/orders/', {
    shipping_address: shippingAddress,
    items: items.map((item) => ({ product_id: item.id, quantity: item.quantity }))
  });
  return data;
};

export default api;