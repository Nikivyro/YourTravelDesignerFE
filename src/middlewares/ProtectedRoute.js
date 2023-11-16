import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';

function ProtectedRoute({ component: Component, ...rest }) {
  const authState = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const storedToken = localStorage.getItem('token');
  const navigate = useNavigate();
  

  console.log('Auth dentro protected',authState);
  console.log('user dentro protected',user);
  // controllo del token nel localStorage
  // Se inizialize rimanda a userPage
  // Se loggato rimanda a userPage
  // Se non loggato rimanda a login

  if (user) {
      return <Outlet />;
  } else {
      return <Login />;
  }

}

export default ProtectedRoute;





