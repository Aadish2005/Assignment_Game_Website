import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearCurrentGame, fetchGameById } from '../redux/slices/gamesSlice';
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGame, status, error } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGameById(id));
    return () => {
      dispatch(clearCurrentGame());
    };
  }, [dispatch, id]);

  // Debug logs
  useEffect(() => {
    if (currentGame) {
      console.log('Game data in component:', {
        name: currentGame.name,
        description: currentGame.description,
        description_raw: currentGame.description_raw,
        fullData: currentGame
      });
    }
  }, [currentGame]);

  if (status === 'loading') {
    return (
      <div className="text-center p-5">
        <div className="spinner"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center text-danger p-5">Error: {error}</div>;
  }

  if (!currentGame) {
    return <div className="text-center p-5">Game not found</div>;
  }

  // Debug log right before rendering
  console.log('Rendering description:', currentGame.description);

  return (
    <div className="game-details-page">
      <Container>
        <Row>
          <Col md={6}>
            <div className="game-image-container">
              <img
                src={currentGame.background_image}
                alt={currentGame.name}
                className="game-image"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="game-info">
              <h1 className="game-title">{currentGame.name}</h1>
              
              <div className="game-meta">
                <div className="game-rating">
                  <span>Rating: </span>
                  <FaStar className="star-icon" />
                  <span className="rating-number">
                    {currentGame.rating?.toFixed(2) || 'N/A'}
                  </span>
                </div>
                <div className="game-release-date">
                  <span>Released: </span>
                  <span>{currentGame.released || 'Unknown'}</span>
                </div>
              </div>

              <div className="game-description">
                <h2>Description</h2>
                <div 
                  className="description-content"
                  style={{ 
                    color: '#666',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    backgroundColor: '#ffffff',
                    padding: '1rem',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    display: 'block'  // Ensure visibility
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: currentGame.description || currentGame.description_raw || 'No description available'
                  }} 
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameDetails;