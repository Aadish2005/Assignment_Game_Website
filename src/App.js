import { ClerkProvider } from '@clerk/clerk-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SignIn from './components/Auth/SignIn';
import VerifyEmail from './components/Auth/VerifyEmail';
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
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/" element={<MainLayout><Games /></MainLayout>} />
            <Route path="/games" element={<MainLayout><Games /></MainLayout>} />
            <Route path="/games/:id" element={<MainLayout><GameDetails /></MainLayout>} />
            <Route 
              path="/library" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Library />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </Provider>
    </ClerkProvider>
  );
}

export default App;
