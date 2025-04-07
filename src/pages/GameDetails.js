import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaBookmark, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../redux/slices/authSlice';
import { clearCurrentGame, fetchGameById } from '../redux/slices/gamesSlice';
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGame, status, error } = useSelector((state) => state.games);
  const { isAuthenticated, favorites } = useSelector((state) => state.auth);
  
  const isInLibrary = favorites.includes(Number(id));

  useEffect(() => {
    dispatch(fetchGameById(id));
    return () => {
      dispatch(clearCurrentGame());
    };
  }, [dispatch, id]);

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

  const handleLibraryToggle = () => {
    if (isInLibrary) {
      dispatch(removeFromFavorites(Number(id)));
    } else {
      dispatch(addToFavorites(Number(id)));
    }
  };

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

  return (
    <div className="game-details-page py-5">
      <Container>
        <Row>
          <Col md={6}>
            <div className="game-image-container mb-4 mb-md-0">
              {currentGame.background_image ? (
                <img
                  src={currentGame.background_image}
                  alt={currentGame.name}
                  className="img-fluid rounded shadow"
                />
              ) : (
                <div className="no-image-placeholder">No Image Available</div>
              )}
            </div>
          </Col>

          <Col md={6}>
            <div className="game-info h-100">
              <div className="d-flex justify-content-between align-items-start">
                <h1 className="gametitle">{currentGame.name}</h1>
                {isAuthenticated && (
                  <Button
                    variant={isInLibrary ? "success" : "outline-primary"}
                    onClick={handleLibraryToggle}
                    className="library-button"
                  >
                    <FaBookmark className="me-2" />
                    {isInLibrary ? 'In Library' : 'Add to Library'}
                  </Button>
                )}
              </div>

              <div className="game-meta mb-4">
                <div className="game-rating d-flex align-items-center mb-2">
                  <span className="ratingclasslast">Rating:</span>
                  <FaStar className="star-icon text-warning me-1" />
                  <span className="rating-number fw-semibold">
                    {currentGame.rating?.toFixed(2) || 'N/A'}
                  </span>
                </div>
                <div className="game-release-date">
                  <span className="releasedclass">Released:</span>{' '}
                  {currentGame.released || 'Unknown'}
                </div>
              </div>

              <div className="descriptionclass">
                <h4>Description</h4>
                <div className="description-content text-muted mt-2 h-100">
                  {currentGame.description_raw || "No description available."}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameDetails;