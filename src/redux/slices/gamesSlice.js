import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gameService from '../../services/gameService';

// Async thunks
export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await gameService.getAllGames(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGameById = createAsyncThunk(
  'games/fetchGameById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await gameService.getGameById(id);
      console.log('Game data before Redux:', {
        description: response.description,
        description_raw: response.description_raw
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  games: {
    results: [],
    count: 0,
  },
  currentGame: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    clearCurrentGame: (state) => {
      state.currentGame = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.games = action.payload;
        state.error = null;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchGameById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentGame = action.payload;
        console.log('Game data in Redux:', {
          description: action.payload.description,
          description_raw: action.payload.description_raw
        });
        state.error = null;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCurrentGame } = gamesSlice.actions;
export default gamesSlice.reducer; 