import { Button, Col, Form, Row } from 'react-bootstrap';
import { create } from '../services/eventService';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {

  const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const eventData = Object.fromEntries(formData);
        const eventCategories = formData.getAll("category");
        eventData.category = eventCategories;

        const result = await create(eventData);
        console.log(result);
        
        navigate('/events');
    }
    return (
        <>
    <h2>Create new event:</h2>
    <Row className="mx-0">
      <Col md={4} className='container py-5'>
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="eventName">
        <Form.Label>Event name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter event name" />
        <Form.Text className="text-muted">
          {/*{errors ? errors : null}*/}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventDescription">
        <Form.Label>Event description</Form.Label>
        <Form.Control style={{ height: 150 }} as="textarea" name="description" placeholder="Short description about the event" />
        <Form.Text className="text-muted">
          {/*{errors ? errors : null}*/}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventImage">
        <Form.Label>Event image</Form.Label>
        <Form.Control type="text" name="image" placeholder="URL to event image" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventTrack">
        <Form.Label>Event track</Form.Label>
        <Form.Select name="track" aria-label="Default select example">
            {/* TODO - load all tracks from DB ? or json file */}
      <option>Select track</option>
      <option value="Imola">Imola</option>
      <option value="Spa">Spa Francorchamps</option>
      <option value="Hungaroring">Hungaroring</option>
    </Form.Select>
      </Form.Group>

      <Form.Group>
      <Form.Label>Car categories allowed:</Form.Label>

      <Row className="my-2">
        <Col>
            <Form.Check // prettier-ignore
                type="switch"
                id="gt2"
                label="GT2"
                inline
                name="category"
                value="GT2"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gt3"
                label="GT3"
                inline
                name="category"
                value="GT3"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gt4"
                label="GT4"
                inline
                value="GT4"
                name="category"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gtc"
                label="GTC"
                inline
                value="GTC"
                name="category"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="tcx"
                label="TCX"
                inline
                value="TCX"
                name="category"
            />
        </Col>
        </Row>
      </Form.Group>

      <Form.Group>
      <Form.Label>Event type:</Form.Label>

      <Row className="my-2">
        <Col>
          <Form.Check 
            reverse
            name="type"
            label="Solo"
            type="radio"
            value="Solo"
            id={`reverse-radio-1`}
            inline
          />
          <Form.Check
            reverse
            name="type"
            label="Team"
            type="radio"
            value="Team"
            id={`reverse-radio-2`}
            inline
          />
          <Form.Check
            reverse
            name="type"
            label="Both"
            type="radio"
            value="Both"
            id={`reverse-radio-3`}
            inline
          />
        </Col>
        </Row>
      </Form.Group>

      <Button variant="warning" type="submit">
        Create event
      </Button>
    </Form>
      </Col>
    </Row>
    </>
    );
}