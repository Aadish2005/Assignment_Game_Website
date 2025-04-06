import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import GameCard from '../components/GameCard/GameCard';
import './Library.css';

const Library = () => {
  const { favorites } = useSelector((state) => state.auth);
  const { games } = useSelector((state) => state.games);

  // Filter games to show only favorites
  const favoriteGames = games.results.filter(game => favorites.includes(game.id));

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
                <GameCard game={game} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Library; 