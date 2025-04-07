import { useSignIn } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/"
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleEmailContinue = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!identifier.trim()) {
      setError('Please enter an email address or username');
      setIsLoading(false);
      return;
    }

    try {
      // First attempt to create a sign in
      await signIn.create({
        identifier: identifier.trim(),
      });

      // Prepare the first factor (email)
      const firstFactor = await signIn.prepareFirstFactor({
        strategy: "email_code",
        email: identifier.trim(),
      });

      if (firstFactor) {
        // Navigate to verification page or handle the next step
        navigate('/verify-email');
      }
    } catch (err) {
      console.error('Error during email sign in:', err);
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <h1>Sign in to Game Explorer</h1>
        <p className="welcome-text">Welcome back! Please sign in to continue</p>

        <Button 
          variant="outline-dark" 
          className="google-sign-in-btn" 
          onClick={handleGoogleSignIn}
        >
          <FaGoogle className="google-icon" />
          Continue with Google
        </Button>

        <div className="divider">
          <span>or</span>
        </div>

        <Form onSubmit={handleEmailContinue}>
          <Form.Group className="mb-3">
            <Form.Label>Email address or username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              isInvalid={!!error}
              required
            />
            {error && (
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="continue-btn"
            disabled={isLoading || !identifier.trim()}
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn; 