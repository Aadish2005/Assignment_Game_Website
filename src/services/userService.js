// Service to handle user-related operations including favorites
const USER_FAVORITES_KEY = 'user_favorites';

const userService = {
  // Get user's favorite games from localStorage
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem(USER_FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  // Save user's favorite games to localStorage
  saveFavorites: (favorites) => {
    try {
      localStorage.setItem(USER_FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Error saving favorites:', error);
      return false;
    }
  },

  // Add a game to favorites
  addToFavorites: (gameId) => {
    try {
      const favorites = userService.getFavorites();
      if (!favorites.includes(gameId)) {
        favorites.push(gameId);
        userService.saveFavorites(favorites);
      }
      return favorites;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return [];
    }
  },

  // Remove a game from favorites
  removeFromFavorites: (gameId) => {
    try {
      const favorites = userService.getFavorites();
      const updatedFavorites = favorites.filter(id => id !== gameId);
      userService.saveFavorites(updatedFavorites);
      return updatedFavorites;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return [];
    }
  }
};

export default userService; 