import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import Events from './components/Events'
import Teams from './components/Teams'
import Drivers from './components/Drivers'
import Login from './components/Login'
import NotFound from './components/NotFound'

function App() {

  return (
    <>
      <NavigationBar />

      <main className="text-light">
        <Routes>
          <Route index path="/" element={<Home />}/>
          <Route path="/events" element={<Events />}/>
          <Route path="/teams" element={<Teams />}/>
          <Route path="/drivers" element={<Drivers />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
