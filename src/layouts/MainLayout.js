import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header/Header';

const MainLayout = ({ children }) => {
  const handleSearch = (searchTerm) => {
    // Handle search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow-1">
        <Container>
          {children}
        </Container>
      </main>

      <footer className="bg-dark text-light py-3 mt-auto">
        <Container>
          <div className="text-center">
            © 2024 GameHub. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout; 