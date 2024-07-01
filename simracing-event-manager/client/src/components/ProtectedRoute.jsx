import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        if (!auth.email) {
            navigate("/login");
          }    
      }, [auth.email, navigate]);
    
    return (
      <Outlet />
    );
  };