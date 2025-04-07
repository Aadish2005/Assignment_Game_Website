import { useAuth, UserButton } from '@clerk/clerk-react';
import React, { useRef, useState } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { FaBookmark } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-container">
          <img 
            src={require('../../assets/images/mediaamp-logo.png')}
            alt="MediaAmp Logo" 
            className="brand-logo"
          />
          
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
          </Nav>
          
          <div className="d-flex align-items-center">
            <Form className="d-flex search-form" onSubmit={handleSearch}>
              <div className="search-input-wrapper" onClick={handleSearchClick}>
                <Form.Control
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search Games..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                />
              </div>
              <Button 
                variant="primary" 
                type="submit" 
                className="search-button"
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
            </Form>

            {isSignedIn && (
              <Nav.Link as={Link} to="/library" className="nav-link library-link ms-3">
                <FaBookmark className="me-1" /> Library
              </Nav.Link>
            )}

            {isSignedIn ? (
              <div className="ms-3">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Button 
                variant="primary" 
                className="ms-3 sign-in-button"
                onClick={handleSignIn}
              >
                Sign in
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 