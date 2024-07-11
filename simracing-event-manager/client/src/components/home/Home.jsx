import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { getRecent } from '../../services/eventService';
import AuthContext from '../../contexts/authContext';

import EventCard from '../events/EventCard';

export default function Home() {

    const [events, setEvents] = useState();
    const {logoutHandler} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try{
                const recentEvents = await getRecent();
                const eventsList = recentEvents.map(event => <EventCard key={event._id} event={event}/>);
                setEvents(eventsList);
            } catch(err) {
                if(err.message == "Invalid access token") {
                    logoutHandler();
                    navigate('/login');
                }
            }
        }
        fetchData();
      }, []); 
      
    return(
        <>
        <Row className="text-light mx-0">
            <Col>
                <h2>Welcome to Simracing Event Manager</h2>
            </Col>
        </Row>
        <Row className="text-light mx-0">
            <Col>
                Check out all the upcoming <Link className="link" to="/events">events!</Link>
                <br />
                {!localStorage.getItem("user") ? <><Link to="/register" className="link">Sign up</Link> and race alongside sim racers around the globe!</> : null}
                
            </Col>
        </Row>
        <Row className="mx-0 my-3">
            <Col>
                <h2>Upcoming events:</h2>
            </Col>
        </Row>

        <Row className="mx-4">

        {/* must display recent 4 */}

            {events}
         </Row>
         <Row className="mx-0">
            <div className='container my-3'>
                <Link to="/events">
         <Button className="btn-lg mx-3" variant="warning">Check out all upcoming events</Button>
         </Link>
            </div>
         </Row>
        </>
    );
}