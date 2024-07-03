import { useContext, useEffect } from 'react';
import AuthContext from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    
    const {logoutHandler} = useContext(AuthContext);
    
    useEffect(() => {
        logoutHandler();
        navigate('/')
    })

    return (
        <h1>Logout page</h1>
    );
}