import { useContext } from 'react';
import { Badge, Button, Card, Col, ListGroup } from 'react-bootstrap';
import AuthContext from '../contexts/authContext';

export default function EventCard() {

  const {auth} = useContext(AuthContext);
  const isSignedUp = false; // TODO - check if the user has signed up for the event

    return (
        <Col md={3} className="my-3">
        <Card style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo-zgQ0O12LZbC42tBJLT4v7RMRYh9TxxDDw&s" />
      <Card.Body>
        <Card.Title>Event title</Card.Title>
        <Card.Text>
          On 01 of July we are going to the Iconic track of Imola to race in the 24h race for charity!
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Registration: <Badge pill bg="success">22/40</Badge></ListGroup.Item>
        <ListGroup.Item>Type: Solo/Team/Both</ListGroup.Item>
        <ListGroup.Item>Category: GT3</ListGroup.Item>
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