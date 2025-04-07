import { useSignIn } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!code.trim()) {
      setError('Please enter the verification code');
      setIsLoading(false);
      return;
    }

    try {
      const completeSignIn = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: code.trim(),
      });

      if (completeSignIn.status === "complete") {
        // Sign in successful, redirect to home page
        navigate('/');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during verification:', err);
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signIn.prepareFirstFactor({
        strategy: "email_code",
        email: signIn.identifier,
      });
      // Show success message
      setError('New code sent successfully!');
    } catch (err) {
      console.error('Error resending code:', err);
      setError(err.message || 'Failed to resend code. Please try again.');
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
        <h1>Verify your email</h1>
        <p className="welcome-text">
          We've sent a verification code to your email address. Please enter it below.
        </p>

        <Form onSubmit={handleVerification}>
          <Form.Group className="mb-3">
            <Form.Label>Verification Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
            className="continue-btn mb-3"
            disabled={isLoading || !code.trim()}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>

          <Button 
            variant="link" 
            onClick={handleResendCode}
            disabled={isLoading}
            className="d-block w-100 text-center"
          >
            Resend verification code
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail; 