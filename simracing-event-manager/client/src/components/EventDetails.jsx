import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getById } from '../services/eventService';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

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
        <Row className="mx-0">
            <Col md={3} className='my-3'>
            Left menu for event controls
            </Col>
            <Col md={6} className='my-3'>
            <Card className='bg-dark text-white' style={{fontWeight: "bold"}}>
        <Card.Img variant="top" src={event?.image} />
        <Card.Body>
        <ListGroup>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text style={{fontSize: "3em"}}>{event?.name}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text style={{fontSize: "2em"}}>{event?.description}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text>Categories allowed: {event?.category}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text>Event type: {event?.type}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text>Track: {event?.track}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text>Drivers: {event?.subscribers?.length}/{event?.gridSize}</Card.Text>
      </ListGroup.Item>
    </ListGroup>
        </Card.Body>
      </Card>
            </Col>
            <Col md={3} className='my-3 px-3'>
                <ListGroup>
                    <ListGroupItem className="bg-dark text-white">
                        Users signed up:
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark text-white py-2">
                    {event.subscribers?.map(s => <Link key={s._id} className="nav-link navbar-link" to={'/profile/' + s._id}>{s.username}</Link>)}
                    </ListGroupItem>
                </ListGroup>
                
            </Col>
        </Row>
        </>
    );
}