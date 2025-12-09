import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  // Si no hay token, redirige al login
  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return children;
};
