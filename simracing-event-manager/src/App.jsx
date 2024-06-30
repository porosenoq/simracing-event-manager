import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import Events from './components/Events'
import Teams from './components/Teams'
import Drivers from './components/Drivers'
import Login from './components/Login'

function App() {

  return (
    <>
      <NavigationBar />
        <Routes>
          <Route index path="/" element={<Home />}/>
          <Route index path="/events" element={<Events />}/>
          <Route index path="/teams" element={<Teams />}/>
          <Route index path="/drivers" element={<Drivers />}/>
          <Route index path="/login" element={<Login />}/>
        </Routes>
    </>
  )
}

export default App
