import { ClerkProvider } from '@clerk/clerk-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import GameDetails from './pages/GameDetails';
import Games from './pages/Games';
import Library from './pages/Library';
import { store } from './redux/store';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Provider store={store}>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Games />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/:id" element={<GameDetails />} />
              <Route path="/library" element={<Library />} />
            </Routes>
          </MainLayout>
        </Router>
      </Provider>
    </ClerkProvider>
  );
}

export default App;
