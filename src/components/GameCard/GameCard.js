import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const { id, title, imageUrl, rating } = game;

  const handleViewDetails = () => {
    navigate(`/games/${id}`);
  };

  return (
    <Card className="game-card">
      <div className="game-image-wrapper">
        <Card.Img variant="top" src={imageUrl} alt={title} className="game-image" />
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