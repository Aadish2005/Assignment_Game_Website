import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Debounce the search navigation to prevent too many updates
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term.length >= 2) {
        navigate(`/games?search=${encodeURIComponent(term)}`);
        setIsSearching(false);
      }
    }, 500),
    [navigate]
  );

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      debouncedSearch(searchTerm);
    }
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="search-bar-container">
      <InputGroup>
        <InputGroup.Text className="search-icon">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          aria-label="Search games"
        />
      </InputGroup>
      {isSearching && searchTerm.length >= 2 && (
        <div className="search-indicator">Searching...</div>
      )}
    </div>
  );
};

export default SearchBar; 