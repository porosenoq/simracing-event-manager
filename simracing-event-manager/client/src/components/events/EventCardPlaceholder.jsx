import { Button, Card, Col, ListGroup, Placeholder} from 'react-bootstrap';

export default function EventCardPlaceholder() {
    return(
        <Col md={3} className="my-3">
          <Card className="bg-dark text-white event-card" style={{ width: '20rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <Card.Img variant="top" className="card-image-h" src="./public/Placeholder_image.png" />
          <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          </Card.Body>
          <ListGroup className="list-group-flush event-list-items">
            <Placeholder as={ListGroup.Item}>text</Placeholder>
            <Placeholder as={ListGroup.Item}>text</Placeholder>
            
            <Placeholder as={ListGroup.Item}>text</Placeholder>
            
            <Placeholder as={ListGroup.Item}>text</Placeholder>

            <Placeholder as={ListGroup.Item}>text</Placeholder>

          </ListGroup>
          <Card.Body className="event-list-buttons-container">
           
           <Placeholder as={Button} >Sign up</Placeholder>
          </Card.Body>
          </Card>
        </Col>
    );
}