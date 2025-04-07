
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Debounce the search navigation to prevent too many updates
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term.length >= 2) {
        navigate(`/games?search=${encodeURIComponent(term)}`);
      } else if (term.length === 0) {
        // Clear search when input is empty
        navigate('/games');
      }
    }, 300),
    [navigate]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container">
      <Form className="search-form">
        <Form.Control
          type="search"
          placeholder="Search Games..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search"
          autoFocus
        />
      </Form>
    </div>
  );
};

export default SearchBar;


