import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters/Filters';
import GameCard from '../components/GameCard/GameCard';
import Pagination from '../components/Pagination/Pagination';
import SearchBar from '../components/SearchBar/SearchBar';
import { fetchGames } from '../redux/slices/gamesSlice';
import './Games.css';

const Games = () => {
  const dispatch = useDispatch();
  const { games, status, error } = useSelector((state) => state.games);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = {
      page: searchParams.get('page') || 1,
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      tags: searchParams.get('tags') || '',
      year: searchParams.get('year') || '',
      ordering: searchParams.get('ordering') || '-rating'
    };

    console.log('Fetching games with params:', params);
    dispatch(fetchGames(params));
  }, [dispatch, searchParams]);

  // Debug logs
  useEffect(() => {
    console.log('Current games state:', {
      status,
      error,
      gamesCount: games?.results?.length,
      totalCount: games?.count,
      games: games?.results
    });
  }, [games, status, error]);

  if (status === 'loading') {
    return (
      <div className="text-center p-5">
        <div className="spinner"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-danger p-5">
        Error: {error}
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="games-page">
      <Container>
        <Row>
          <Col md={3}>
            <div className="filters-wrapper">
              <h2>Filters</h2>
              <Filters />
            </div>
          </Col>
          <Col md={9}>
            <div className="games-content">
              <h1>Games</h1>
              <SearchBar />
              
              {!games?.results?.length ? (
                <div className="no-results">
                  <h3>No games found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  <div className="games-count mb-3">
                    Found {games.count} games
                  </div>
                  <div className="games-grid">
                    {games.results.map((game) => (
                      <GameCard 
                        key={game.id} 
                        game={{
                          id: game.id,
                          title: game.name,
                          imageUrl: game.background_image,
                          rating: game.rating,
                          released: game.released
                        }} 
                      />
                    ))}
                  </div>
                  <Pagination
                    currentPage={parseInt(searchParams.get('page') || '1')}
                    totalPages={Math.ceil(games.count / 20)}
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Games; 