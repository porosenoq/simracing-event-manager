import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Events from './Events';
import Teams from './Teams';
import Drivers from './Drivers';
import Login from './Login';
import NotFound from './NotFound';

export default function MainContent() {
    return (
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
    );
}