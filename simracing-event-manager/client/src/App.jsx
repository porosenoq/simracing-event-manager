import './App.css';

import { login, register } from './services/authService';
import { useNavigate } from 'react-router-dom';

import Footer from './components/Footer';
import MainContent from './components/MainContent';
import NavigationBar from './components/NavigationBar';
import AuthContext from './contexts/authContext';
import usePersistedState from './hooks/usePersistedState';
import { useEffect } from 'react';

function App() {
  const [auth, setAuth] = usePersistedState('user', {});
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth.email) {
      localStorage.removeItem('user');
    }
  }, [])

  async function logoutHandler() {
    setAuth({});
    localStorage.removeItem('user');
  }
  
  
  async function loginSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
   
    try {
      const user = await login(email, password);
      setAuth(user);
      navigate('/');
    } catch(err) {
      alert(err.message);
    }
  }

  async function registerSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    //const repass = formData.get("repass");

    //TODO add validation ???

   
    try {
      const user = await register(email, password);
      setAuth(user);
      localStorage.setItem('user', user);
      navigate('/');
    } catch(err) {
      alert(err.message);
    }
  }

  return (
    <>
    <AuthContext.Provider value={{loginSubmitHandler, registerSubmitHandler, logoutHandler, auth}}>
      <NavigationBar user={auth}/>

      <MainContent />

      <Footer />
    </AuthContext.Provider>
    </>
  )
}

export default App
