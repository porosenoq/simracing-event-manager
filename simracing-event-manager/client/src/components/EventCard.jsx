import { useContext, useEffect, useState } from 'react';
import { Badge, Button, Card, Col, ListGroup } from 'react-bootstrap';
import AuthContext from '../contexts/authContext';
import { Link } from 'react-router-dom';
import { getById, update } from '../services/eventService';

export default function EventCard({event}) {

  const {auth} = useContext(AuthContext);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    async function loadEventData() {
      const eventData = await getById(event._id);
      const isSubscribed = eventData.subscribers.includes(auth._id);
      setIsSignedUp(isSubscribed);
    }
    loadEventData();
  }, []);

  async function signUphandler() {
    const eventSubscribers = event.subscribers;
    eventSubscribers.push(auth._id);
    const response = await update(event._id, {...event, subscribers: eventSubscribers});
    console.log(response);
    setIsSignedUp(true);
  }

    return (
        <Col md={3} className="my-3">
        <Card className="bg-dark text-white event-card" style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card.Img variant="top" className="card-image-h" src={event.image} />
      <Card.Body>
        <Card.Title><Link className='event-title'>{event.name}</Link></Card.Title>
        <Card.Text className="event-description">
          {event.description.length > 50 ? event.description.substring(0, 50) + '...' : event.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush event-list-items">
        <ListGroup.Item className="bg-dark text-white event-list-items first-item">Registration: <Badge pill bg="success">{event.subscribers.length}/{event.gridSize}</Badge></ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white event-list-items">Event type: {event.type == 'both' ? 'Solo/Team' : event.type}</ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white event-list-items">Category: {event.category.map(c => <span key={c} className='mx-1'>{c}</span>)}</ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white event-list-items">Driver stint time: 60m</ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white event-list-items">Event date: 05/07/2024 18:00UTC</ListGroup.Item>
      </ListGroup>
      <Card.Body className="event-list-buttons-container">
        {auth.email && !isSignedUp ? <Button onClick={() => signUphandler(event._id)} className="mx-2" variant="success">Sign up</Button> : null}
        {auth.email && isSignedUp ? <Button className="mx-2" variant="danger">Sign out</Button> : null}
      
      
      </Card.Body>
    </Card>
        </Col>
    );
}