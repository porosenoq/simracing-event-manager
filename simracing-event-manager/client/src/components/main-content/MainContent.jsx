import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import Events from '../events/Events';
import Teams from '../teams/Teams';
import Drivers from '../drivers/Drivers';
import Login from '../login/Login';
import NotFound from '../not-found/NotFound';
import Register from '../register/Register';
import { GuestProtectedRoutes } from '../protected-routes/GuestProtectedRoutes';
import CreateTeam from '../teams/CreateTeam';
import CreateEvent from '../events/CreateEvent';
import EventDetails from '../events/EventDetails';
import Logout from '../logout/Logout';
import MyEvents from '../events/MyEvents';
import { UserProtectedRoutes } from '../protected-routes/UserProtectedRoutes';
import Profile from '../profile/Profile';
import TeamDetails from '../teams/TeamDetails';
import MyTeams from '../teams/MyTeams';

export default function MainContent() {
    return (
        <main className="text-light">
        <Routes>
          <Route index path="/" element={<Home />}/>
          <Route path="/events" element={<Events />}/>
          <Route path="/events/details/:id" element={<EventDetails />}/>
          <Route path="/teams" element={<Teams />}/>
          <Route path="/teams/me" element={<MyTeams />}/>
          <Route path="/teams/:teamId" element={<TeamDetails />}/>
          <Route path="/drivers" element={<Drivers />}/>
            <Route element={<GuestProtectedRoutes />}>
              <Route path="/profile/:id" element={<Profile />}/>
              <Route path="/teams/create" element={<CreateTeam />} />
              <Route path="/events/create" element={<CreateEvent />} />
              <Route path="/events/me" element={<MyEvents />} />
              <Route path="/logout" element={<Logout />}/>
            </Route>
            <Route element={<UserProtectedRoutes />}>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
            </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    );
}