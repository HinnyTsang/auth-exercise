import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';

const LogIn = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // check if the pass word is the same.

    setError('');
    setLoading(true);
    login(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        nevigate('/');
      })
      .catch(() => {
        setError('Failed to Login');
      });
    setLoading(false);
  }

  return (
    <>
      <Card >
        <Card.Body>
          <h2 className='text-center mb-4'>
            Login
          </h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>Login</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  );
};

export default LogIn;