import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const nagivate = useNavigate();

  const handleLogout = () => {
    setError('');
    logout()
      .then(() => {
        window.alert('logout success.');
        nagivate('/login');
      })
      .catch(() => {
        window.alert('logout failed.');
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Progile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {currentUser? <><strong>Email:</strong><span>{currentUser.email}</span></>: <></>}
          <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='danger' onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  );
};

export default Dashboard;