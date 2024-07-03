import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Events from './Events';
import Teams from './Teams';
import Drivers from './Drivers';
import Login from './Login';
import NotFound from './NotFound';
import Register from './Register';
import { ProtectedRoute } from './ProtectedRoute';
import CreateTeam from './CreateTeam';
import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
import Logout from './Logout';

export default function MainContent() {
    return (
        <main className="text-light">
        <Routes>
          <Route index path="/" element={<Home />}/>
          <Route path="/events" element={<Events />}/>
          <Route path="/events/details/:id" element={<EventDetails />}/>
          <Route path="/teams" element={<Teams />}/>
          <Route path="/drivers" element={<Drivers />}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Login />}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/teams/create" element={<CreateTeam />} />
              <Route path="/events/create" element={<CreateEvent />} />
            </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    );
}