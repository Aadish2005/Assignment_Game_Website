import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../components/GameCard/GameCard';
import { fetchGames } from '../redux/slices/gamesSlice';
import './Library.css';

const Library = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.auth);
  const { games, status } = useSelector((state) => state.games);

  useEffect(() => {
    if (!games.results || games.results.length === 0) {
      dispatch(fetchGames());
    }
  }, [dispatch, games.results]);

  // Filter games to show only favorites
  const favoriteGames = games.results ? games.results.filter(game => favorites.includes(game.id)) : [];

  if (status === 'loading') {
    return (
      <div className="library-page">
        <Container>
          <h1 className="library-title">My Library</h1>
          <div className="text-center p-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="library-page">
      <Container>
        <h1 className="library-title">My Library</h1>
        {favoriteGames.length === 0 ? (
          <div className="no-games">
            <h3>No games in your library</h3>
            <p>Add games to your library by clicking the bookmark icon on game cards</p>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {favoriteGames.map((game) => (
              <Col key={game.id}>
                <GameCard 
                  game={{
                    id: game.id,
                    title: game.name,
                    imageUrl: game.background_image,
                    rating: game.rating
                  }} 
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Library; 