import { useAuth } from '@clerk/clerk-react';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaBookmark, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/authSlice';
import './GameCard.css';

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignedIn } = useAuth();
  const { favorites } = useSelector((state) => state.auth);
  const { id, title, imageUrl, rating } = game;

  const isInLibrary = favorites.includes(Number(id));

  const handleViewDetails = () => {
    navigate(`/games/${id}`);
  };

  const handleLibraryToggle = (e) => {
    e.stopPropagation();
    if (isInLibrary) {
      dispatch(removeFromFavorites(Number(id)));
    } else {
      dispatch(addToFavorites(Number(id)));
    }
  };

  return (
    <Card className="game-card">
      <div className="game-image-wrapper">
        <Card.Img variant="top" src={imageUrl} alt={title} className="game-image" />
        {isSignedIn && (
          <Button
            variant={isInLibrary ? "success" : "primary"}
            className="bookmark-button"
            onClick={handleLibraryToggle}
          >
            <FaBookmark />
          </Button>
        )}
      </div>
      <Card.Body>
        <Card.Title className="game-title">{title}</Card.Title>
        <div className="game-rating">
          Rating: <FaStar className="star-icon" /> {rating.toFixed(2)}
        </div>
        <Button 
          variant="primary" 
          className="view-details-btn"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GameCard; 