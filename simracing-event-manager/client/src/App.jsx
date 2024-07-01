import './App.css';

import { login, register } from './services/authService';
import { useNavigate } from 'react-router-dom';

import Footer from './components/Footer';
import MainContent from './components/MainContent';
import NavigationBar from './components/NavigationBar';
import AuthContext from './contexts/authContext';
import usePersistedState from './hooks/usePersistedState';

function App() {
  const navigate = useNavigate();
  
  const [auth, setAuth] = usePersistedState('user', {});
  
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
      localStorage.setItem('user', user.accessToken);
      navigate('/');
    } catch(err) {
      alert(err.message);
    }
  }

  return (
    <>
    <AuthContext.Provider value={{loginSubmitHandler, registerSubmitHandler, auth}}>
      <NavigationBar user={auth}/>

      <MainContent />

      <Footer />
    </AuthContext.Provider>
    </>
  )
}

export default App
