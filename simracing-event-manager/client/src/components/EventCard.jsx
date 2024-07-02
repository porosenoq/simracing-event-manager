import { useContext } from 'react';
import { Badge, Button, Card, Col, ListGroup } from 'react-bootstrap';
import AuthContext from '../contexts/authContext';

export default function EventCard({event}) {

  const {auth} = useContext(AuthContext);
  const isSignedUp = false; // TODO - check if the user has signed up for the event

    return (
        <Col md={3} className="my-3">
        <Card style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card.Img variant="top" className="card-image-h" src={event.image} />
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>
          {event.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Registration: <Badge pill bg="success">22/40</Badge></ListGroup.Item>
        <ListGroup.Item>Event type: {event.type == 'both' ? 'Solo/Team' : event.type}</ListGroup.Item>
        <ListGroup.Item>Category: {event.category.map(c => <span key={c} className='mx-1'>{c}</span>)}</ListGroup.Item>
        <ListGroup.Item>Driver stint time: 60m</ListGroup.Item>
        <ListGroup.Item>Event date: 05/07/2024 18:00UTC</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <b>-- Show buttons depending on if the user has signed up or not --</b>
        {auth.email ? <Button className="mx-2" variant="success">Sign up</Button> : null}
        {auth.email && isSignedUp ? <Button className="mx-2" variant="danger">Sign out</Button> : null}
      
      
      </Card.Body>
    </Card>
        </Col>
    );
}