import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

export default function Home() {
    return(
        <>
        <Row className="text-light mx-0">
            <Col>
                <h2>Welcome to Simracing Event Manager</h2>
            </Col>
        </Row>
        <Row className="text-light mx-0">
            <Col>
                Check out our <Link to="/events">events!</Link>
                Sign up and race alongside sim racers around the globe!
            </Col>
        </Row>
        <Row className="mx-0 my-5">
            <Col>
                <h2>Upcoming events:</h2>
            </Col>
        </Row>
        <Row className="mx-4">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </Row>
        </>
    );
}