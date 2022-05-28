import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute, UpdateProfile, Dashboard, SignUp, LogIn, ForgotPassword } from '../components';


const App = () => {
  return (
    <AuthProvider>
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ minHeight: '100vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={
                <PrivateRoute><Dashboard /></PrivateRoute>
              } />
              <Route path='/update-profile' element={
                <PrivateRoute><UpdateProfile /></PrivateRoute>
              } />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Container>
    </AuthProvider>
  );
};

export default App;