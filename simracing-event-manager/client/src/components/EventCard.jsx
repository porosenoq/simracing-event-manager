import { Badge, Button, Card, Col, ListGroup } from 'react-bootstrap';

export default function EventCard({title}) {
    return (
        <Col md={3} className="my-3">
        <Card style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo-zgQ0O12LZbC42tBJLT4v7RMRYh9TxxDDw&s" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          On 01 of July we are going to the Iconic track of Imola to race in the 24h race for charity!
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Registration: <Badge pill bg="success">22/40</Badge></ListGroup.Item>
        <ListGroup.Item>Category: GT3</ListGroup.Item>
        <ListGroup.Item>Driver stint time: 60m</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <b>-- Show buttons depending on if the user has signed up or not --</b>
      <Button className="mx-2" variant="success">Sign up</Button>
      <Button className="mx-2" variant="danger">Sign out</Button>
      </Card.Body>
    </Card>
        </Col>
    );
}