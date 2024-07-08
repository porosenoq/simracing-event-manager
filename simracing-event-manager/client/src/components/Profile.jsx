import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

export default function Profile() {
    const [userId, setUserId] = useState('');
    //const [userData, setUserData] = useState({}); */
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        setUserId(auth._id);
        if(auth._id == id) {
            navigate('/profile/me');
        }


    }, []);

    return(
        <h1>User profile page for {id}</h1>
    );
}