import { Button, Col, Row } from 'react-bootstrap';
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

            <EventCard title={'24h of Imola GT3'}/>
            <EventCard title={'3h of Spa Francorchamp'}/>
            <EventCard title={'Nurburging Endurance race 6h'}/>
            <EventCard title={'Brands Hatch Sprint Race'}/>
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