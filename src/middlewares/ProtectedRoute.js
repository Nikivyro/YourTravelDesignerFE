import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...rest }) {
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
  
    if (!token) {
      navigate('/login'); // Reindirizza l'utente alla pagina di login se non è autenticato
      return null;
    }
  
    return <Outlet />; // Renderizza i componenti figli
}

export default ProtectedRoute;





