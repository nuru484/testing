import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Load initial auth state from localStorage
const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  isLoading: true,
  user: JSON.parse(localStorage.getItem('user')) || null,
};

// Register User
export const registerUser = createAsyncThunk(
  '/auth/register',
  async (formData) => {
    const response = await axios.post(
      'https://testing-m7ku.onrender.com/api/auth/register',
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

// Login User
export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
  const response = await axios.post(
    'https://testing-m7ku.onrender.com/api/auth/login',
    formData,
    { withCredentials: true }
  );
  return response.data;
});

// Logout User
export const logoutUser = createAsyncThunk('/auth/logout', async () => {
  const response = await axios.post(
    'https://testing-m7ku.onrender.com/api/auth/logout',
    {},
    { withCredentials: true }
  );
  return response.data;
});

// Check Authentication
export const checkAuth = createAsyncThunk('/auth/checkauth', async () => {
  const response = await axios.get(
    'https://testing-m7ku.onrender.com/api/auth/check-auth',
    {
      withCredentials: true,
      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;

        // Persist to localStorage
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem(
          'isAuthenticated',
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;

        // Persist auth state
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem(
          'isAuthenticated',
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;

        // Clear storage on failure
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;

        // Clear storage on logout
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      });
  },
});

export default authSlice.reducer;
