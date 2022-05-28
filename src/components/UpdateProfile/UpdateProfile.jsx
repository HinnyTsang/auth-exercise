import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';

const UpdateProfile = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, userUpdateEmail, userUpdatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();

    // check if the pass word is the same.
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    else if (passwordRef.current.value.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    setError('');
    setLoading(true);

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(userUpdateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(userUpdatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        nevigate('/');
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to update account.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card >
        <Card.Body>
          <h2 className='text-center mb-4'>
                        Update Profile
          </h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required
                defaultValue={currentUser.email} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef}
                placeholder="Leave blank to keep the same."
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password confirm</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same."
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;