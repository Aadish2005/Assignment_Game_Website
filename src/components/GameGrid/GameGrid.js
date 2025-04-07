import React from 'react';
import { Col, Row } from 'react-bootstrap';
import GameCard from '../GameCard/GameCard';
import './GameGrid.css';

const GameGrid = ({ games }) => {
  return (
    <div className="game-grid">
      <Row xs={1} md={2} lg={3} className="g-4">
        {games.map((game) => (
          <Col key={game.id}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GameGrid; 