import axios from 'axios';

const API = axios.create({
  baseURL: 'https://reco-realestate-gvn8.onrender.com/api',
});

// Add a request interceptor to include the JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const fetchProperties = async () => {
  try {
    const response = await API.get('/properties');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const response = await API.get(`/properties/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const verifyOTP = async (verifyData) => {
  try {
    const response = await API.post('/auth/verify-otp', verifyData);
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const resendOTP = async (emailData) => {
  try {
    const response = await API.post('/auth/resend-otp', emailData);
    return response.data;
  } catch (error) {
    console.error('Error resending OTP:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const forgotPassword = async (emailData) => {
  try {
    const response = await API.post('/auth/forgot-password', emailData);
    return response.data;
  } catch (error) {
    console.error('Error in forgot password:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await API.post('/auth/reset-password', resetData);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await API.get('/auth/users');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const getEnquiries = async () => {
  try {
    const response = await API.get('/enquiries');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching enquiries:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await API.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting property:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const updateUserStatus = async (id, status) => {
  try {
    const response = await API.put(`/auth/users/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating user status:', error.response?.data?.error || error.message);
    throw error;
  }
};

// Booking API calls
export const getBookings = async () => {
  try {
    const response = await API.get('/bookings');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching bookings:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await API.post('/bookings', bookingData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating booking:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await API.put(`/bookings/${id}`, { status });
    return response.data.data;
  } catch (error) {
    console.error('Error updating booking status:', error.response?.data?.error || error.message);
    throw error;
  }
};

export default API;
