import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';

function ProtectedRoute({ component: Component, ...rest }) {
  const authState = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const storedToken = localStorage.getItem('token');
  const navigate = useNavigate();
  

  //console.log('Auth dentro protected',authState);
  //console.log('user dentro protected',user);

  if (user) {
      return <Outlet />;
  } else {
      return <Login />;
  }

}

export default ProtectedRoute;





