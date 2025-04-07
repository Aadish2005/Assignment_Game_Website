import { createSlice } from '@reduxjs/toolkit';
import userService from '../../services/userService';

const initialState = {
  user: null,
  isAuthenticated: false,
  favorites: userService.getFavorites(), // Initialize with stored favorites
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
      userService.saveFavorites(action.payload);
    },
    addToFavorites: (state, action) => {
      const updatedFavorites = userService.addToFavorites(action.payload);
      state.favorites = updatedFavorites;
    },
    removeFromFavorites: (state, action) => {
      const updatedFavorites = userService.removeFromFavorites(action.payload);
      state.favorites = updatedFavorites;
    },
  },
});

export const {
  setUser,
  clearUser,
  setFavorites,
  addToFavorites,
  removeFromFavorites,
} = authSlice.actions;

export default authSlice.reducer; 