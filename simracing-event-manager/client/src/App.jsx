import './App.css';

import { useState } from 'react';
import { login } from './services/authService';
import { useNavigate } from 'react-router-dom';

import Footer from './components/Footer';
import MainContent from './components/MainContent';
import NavigationBar from './components/NavigationBar';
import AuthContext from './contexts/authContext';

function App() {
  const navigate = useNavigate();
  
  const [auth, setAuth] = useState(() => {
    localStorage.removeItem('user');
    
    return {};
  });
  
  async function loginSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
   
    try {
      const user = await login(email, password);
      setAuth(user);
      localStorage.setItem('user', user.accessToken);
      navigate('/');
    } catch(err) {
      alert(err.message);
    }
  }

  return (
    <>
    <AuthContext.Provider value={{loginSubmitHandler, auth}}>
      <NavigationBar user={auth}/>

      <MainContent />

      <Footer />
    </AuthContext.Provider>
    </>
  )
}

export default App
