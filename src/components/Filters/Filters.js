import React from 'react';
import { Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import './Filters.css';

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterType, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }
    // Reset to page 1 when filters change
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <div className="filters-sidebar">
      

      <div className="filter-section">
        <h3>Categories</h3>
        <Form.Select
          value={searchParams.get('category') || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="rpg">RPG</option>
          <option value="shooter">Shooter</option>
          <option value="strategy">Strategy</option>
          <option value="sports">Sports</option>
          <option value="racing">Racing</option>
          <option value="simulation">Simulation</option>
        </Form.Select>
      </div>

      <div className="filter-section">
        <h3>Tags</h3>
        <Form.Select
          value={searchParams.get('tags') || ''}
          onChange={(e) => handleFilterChange('tags', e.target.value)}
          className="filter-select"
        >
          <option value="">All Tags</option>
          <option value="singleplayer">Singleplayer</option>
          <option value="multiplayer">Multiplayer</option>
          <option value="open-world">Open World</option>
          <option value="fps">FPS</option>
          <option value="pvp">PvP</option>
          <option value="co-op">Co-op</option>
          <option value="story-rich">Story Rich</option>
          <option value="competitive">Competitive</option>
        </Form.Select>
      </div>

      <div className="filter-section">
        <h3>Release Year</h3>
        <Form.Control
          type="number"
          placeholder="Enter year..."
          min="1990"
          max={new Date().getFullYear()}
          value={searchParams.get('year') || ''}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-section">
        <h3>Sort By Popularity</h3>
        <Form.Select
          value={searchParams.get('ordering') || '-rating'}
          onChange={(e) => handleFilterChange('ordering', e.target.value)}
          className="filter-select"
        >
          <option value="-rating">Rating (High to Low)</option>
          <option value="rating">Rating (Low to High)</option>
          <option value="-released">Release Date (Newest)</option>
          <option value="released">Release Date (Oldest)</option>
          {/* <option value="name">Name (A-Z)</option>
          <option value="-name">Name (Z-A)</option> */}
          <option value="name">Average Rating</option>
          <option value="-name">None</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default Filters; 