import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaGamepad className="brand-icon" /> Game Explorer
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="nav-link">
            Home
          </Nav.Link>
        </Nav>
        <Form className="d-flex search-form">
          <Form.Control
            type="search"
            placeholder="Search Games..."
            className="search-input"
            aria-label="Search"
          />
          <Button variant="primary" className="search-button">
            Search
          </Button>
        </Form>
        <Button variant="primary" className="ms-3 sign-in-button">
          Sign in
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header; 