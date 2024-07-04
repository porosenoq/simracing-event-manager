import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../services/eventService';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

export default function EventDetails() {
    const {id} = useParams();

    const [event, setEvent] = useState({});

    useEffect(() => {
        async function loadEvent() {
            const event = await getById(id);
            console.log(event);
            setEvent(event);
        }
        loadEvent();
    }, []);

    return (
        <>
        <div className="container" style={{width: "800px"}}>
        <Row>
            <Col className='my-3'>
            <Card className='bg-dark text-white' style={{fontWeight: "bold"}}>
        <Card.Img variant="top" src={event?.image} />
        <Card.Body>
          <Card.Text style={{fontSize: "3em"}}>{event?.name}</Card.Text>
          <Card.Text style={{fontSize: "2em"}}>{event?.description}</Card.Text>
          <Card.Text>Categories allowed: {event?.category}</Card.Text>
          <Card.Text>Event type: {event?.type}</Card.Text>
          <Card.Text>Track: {event?.track}</Card.Text>
          <Card.Text>Drivers: {event?.subscribers?.length}/{event?.gridSize}</Card.Text>
        </Card.Body>
      </Card>
            </Col>
        </Row>
        </div>
        </>
    );
}