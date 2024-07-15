import { useContext, useEffect, useState } from 'react';
import { Badge, Button, Card, Col, ListGroup } from 'react-bootstrap';
import AuthContext from '../../contexts/authContext';
import { Link } from 'react-router-dom';
import { update } from '../../services/eventService';

export default function EventCard({event}) {

  const {auth} = useContext(AuthContext);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [gridFull, setGridFull] = useState(false);
  const [eventInfo, setEventInfo] = useState();

  useEffect(() => {
    async function loadEventData() {
      //const eventData = await getById(event._id); // no need to make a request as we already pass the event through props
      
      setEventInfo(event);
    }
    loadEventData();
  }, [gridFull, isSignedUp]);

  useEffect(() => {
    const full = eventInfo?.subscribers.length == eventInfo?.gridSize;
    setGridFull(full);

    const isSubscribed = eventInfo?.subscribers.some(s => s._id == auth._id);
    setIsSignedUp(isSubscribed);
  }, [eventInfo]);

  async function signUphandler() {
    const eventSubscribers = event.subscribers;
    eventSubscribers.push({ _id: auth._id });
    const response = await update(event._id, {...event, subscribers: eventSubscribers});
    console.log(response);
    setIsSignedUp(true);
  }

    return (
        <Col md={3} className="my-3">
        <Card className="bg-dark text-white event-card" style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card.Img variant="top" className="card-image-h" src={event.image} />
      <Card.Body>
        <Card.Title><Link to={`/events/details/${event._id}`} className='event-title'>{event.name}</Link></Card.Title>
        <Card.Text className="event-description">
          {event.description.length > 50 ? <>{event.description.substring(0, 50)}... <Link to={'/events/details/' + event._id} className='navbar-link'>read more</Link></> : event.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush event-list-items">
        <ListGroup.Item className="bg-dark text-white event-list-items first-item">Registration: <Badge pill bg={gridFull ? 'danger' : 'success'}>{event.subscribers.length}/{event.gridSize}</Badge></ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white event-list-items">Event type: {event.type == 'both' ? 'Solo/Team' : event.type}</ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white event-list-items">Category: {event.category.map(c => <span key={c} className='mx-1'>{c}</span>)}</ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white event-list-items">Driver stint time: 60m</ListGroup.Item>
        <ListGroup.Item className="bg-dark text-white event-list-items">Event date: 05/07/2024 18:00UTC</ListGroup.Item>
      </ListGroup>
      <Card.Body className="event-list-buttons-container">
        {!auth.email ? <><span>Want to participate?<Link className='navbar-link nav-link'>Login</Link></span></> : null}
        {auth.email && !isSignedUp && !gridFull ? <Button onClick={() => signUphandler(event._id)} className="mx-2" variant="success">Sign up</Button> : null}
        {gridFull && !isSignedUp ? <Button variant="warning mx-2">Grid is currently full</Button> : null}
        {auth.email && isSignedUp ? <Button className="mx-2" variant="danger">Sign out</Button> : null}
      
      
      </Card.Body>
    </Card>
        </Col>
    );
}