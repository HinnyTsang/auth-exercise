import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context';

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return (
    currentUser ?
      children :
      <Navigate to='/login' />
  );
};

export default PrivateRoute;