import './App.css';

import { login, register } from './services/authService';
import { useNavigate } from 'react-router-dom';

import Footer from './components/footer/Footer';
import MainContent from './components/main-content/MainContent';
import Header from './components/header/Header';
import AuthContext from './contexts/authContext';
import usePersistedState from './hooks/usePersistedState';
import { useEffect, useState } from 'react';

function App() {
  const [auth, setAuth] = usePersistedState('user', {});
  const [errors, setErrors] = useState({});

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

    if(!email) {
      setErrors(oldState => ({...oldState, email: 'Email is required'}))
    } else {
      setErrors(oldState => ({...oldState, email: null}))
    }

    if(!password) {
      setErrors(oldState => ({...oldState, password: 'Password is required'}))
    } else {
      setErrors(oldState => ({...oldState, password: null}))
    }
     
    try {
      const user = await login(email, password);
      setAuth(user);
      navigate('/');
    } catch(err) {
      setErrors(oldState => ({...oldState, serverErr: err.message}))
    }
  }

  async function registerSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repass = formData.get("repass");

    if(!email) {
      setErrors(oldState => ({...oldState, email: 'Email is required'}))
    } else {
      setErrors(oldState => ({...oldState, email: null}))
    }

    if(!repass) {
      setErrors(oldState => ({...oldState, repass: 'Missing fields!'}))
    } else {
      setErrors(oldState => ({...oldState, repass: null}))
    }

    if(password != repass) {
      setErrors(oldState => ({...oldState, password: 'Passwords don\'t match'}))
      return
    } else {
      setErrors(oldState => ({...oldState, password: null}))
    }
   
    try {
      const user = await register(email, password);
      setAuth(user);
      navigate('/');
    } catch(err) {
      console.log(err.message);
    }
  }

  return (
    <>
    <AuthContext.Provider value={{loginSubmitHandler, registerSubmitHandler, logoutHandler, auth, errors}}>
      <Header />

      <MainContent />

      <Footer />
    </AuthContext.Provider>
    </>
  )
}

export default App
