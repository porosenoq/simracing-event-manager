import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { create } from '../../services/eventService';
import { useNavigate } from 'react-router-dom';
import EventCarCategories from './EventCarCategories';
import EventTrackSelect from './EventTrackSelect';
import EventInfoInputs from './EventInfoInputs';
import EventGridSize from './EventGridSize';
import EventType from './EventType';

export default function CreateEvent() {

  const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const eventData = Object.fromEntries(formData);
        const eventCategories = formData.getAll("category");
        eventData.category = eventCategories;
        eventData.subscribers = [];

        try {
          const result = await create(eventData);
          console.log(result);
        } catch(err) {
          throw new Error('Access token has expired!')
        }
        
        navigate('/events');
    }
    return (
<>
  <Container className="my-3">
    <Card className="text-white bg-dark">

      <h2>Create new event:</h2>

      <Form onSubmit={submitHandler}>
        <Row className="mx-0">
          <Col md={5} className='container py-5'>
            
            <EventInfoInputs />

            <EventTrackSelect />

            <EventCarCategories />

            <EventGridSize />

            <EventType />

            <Button variant="warning" type="submit">
              Create event
            </Button>

          </Col>
        </Row>
      </Form>
    </Card>
  </Container>
</>
    );
}