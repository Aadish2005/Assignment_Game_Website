import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/slices/authSlice';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.auth.favorites);

  const toggleFavorite = (gameId) => {
    if (favorites.includes(gameId)) {
      dispatch(removeFromFavorites(gameId));
    } else {
      dispatch(addToFavorites(gameId));
    }
  };

  const isFavorite = (gameId) => favorites.includes(gameId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}; 