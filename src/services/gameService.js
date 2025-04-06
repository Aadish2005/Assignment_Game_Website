import axios from 'axios';

const RAWG_API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const RAWG_API_URL = process.env.REACT_APP_RAWG_API_URL || 'https://api.rawg.io/api';

// Enhanced debugging
console.log('API Configuration:', {
  apiUrl: RAWG_API_URL,
  hasApiKey: !!RAWG_API_KEY,
  apiKey: RAWG_API_KEY ? `${RAWG_API_KEY.substring(0, 4)}...` : 'not set',
  envVars: {
    REACT_APP_RAWG_API_KEY: process.env.REACT_APP_RAWG_API_KEY,
    REACT_APP_RAWG_API_URL: process.env.REACT_APP_RAWG_API_URL,
    NODE_ENV: process.env.NODE_ENV
  }
});

const gameService = {
  getAllGames: async (params = {}) => {
    try {
      console.log('getAllGames called with params:', params);
      
      const { page = 1, pageSize = 20, category, tags, year, search, ordering } = params;
      
      const queryParams = {
        key: RAWG_API_KEY,
        page,
        page_size: pageSize,
      };

      // Only add parameters if they have values
      if (category) queryParams.genres = category;
      if (tags) queryParams.tags = tags;
      if (year) queryParams.dates = `${year}-01-01,${year}-12-31`;
      if (search) queryParams.search = search;
      if (ordering) queryParams.ordering = ordering;

      console.log('Making API request with params:', {
        url: `${RAWG_API_URL}/games`,
        params: queryParams
      });

      const response = await axios.get(`${RAWG_API_URL}/games`, {
        params: queryParams
      });

      console.log('API Response:', {
        count: response.data.count,
        resultsLength: response.data.results.length,
        firstGame: response.data.results[0]
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching games:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error.response?.data || error.message;
    }
  },

  getGameById: async (id) => {
    try {
      console.log('Fetching game details for ID:', id);
      const response = await axios.get(`${RAWG_API_URL}/games/${id}`, {
        params: {
          key: RAWG_API_KEY,
        },
      });
      
      console.log('Game details response:', {
        id: response.data.id,
        name: response.data.name,
        hasDescription: !!response.data.description
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching game details:', {
        id,
        error: error.message,
        response: error.response?.data
      });
      throw error.response?.data || error.message;
    }
  },

  getGamesByCategory: async (category, page = 1, pageSize = 20) => {
    try {
      const response = await axios.get(`${RAWG_API_URL}/games`, {
        params: {
          key: RAWG_API_KEY,
          genres: category,
          page,
          page_size: pageSize,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  searchGames: async (query, page = 1, pageSize = 20) => {
    try {
      // Don't search if query is empty or too short
      if (!query || query.length < 2) {
        return {
          results: [],
          count: 0
        };
      }

      console.log('Searching games with query:', query);
      const response = await axios.get(`${RAWG_API_URL}/games`, {
        params: {
          key: RAWG_API_KEY,
          search: query,
          page,
          page_size: pageSize,
          search_precise: true,
          search_exact: false,
          ordering: '-rating'
        },
      });

      console.log('Search response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching games:', {
        query,
        error: error.message,
        response: error.response?.data
      });
      throw error.response?.data || error.message;
    }
  },

  getFavorites: async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}/favorites`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addToFavorites: async (userId, gameId) => {
    try {
      const response = await axios.post(`/api/users/${userId}/favorites`, { gameId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  removeFromFavorites: async (userId, gameId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}/favorites/${gameId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default gameService; 