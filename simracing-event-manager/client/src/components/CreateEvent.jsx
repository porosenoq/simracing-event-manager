import { Button, Col, Form, Row } from 'react-bootstrap';
import { create } from '../services/eventService';

export default function CreateEvent() {

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const eventData = Object.fromEntries(formData);
        const eventCategories = formData.getAll("category");
        eventData.category = eventCategories;

        console.log(eventData);
        const result = await create(eventData);
        console.log(result);
        // we need to pass eventData to the function that will create the event in the backend
    }
    return (
        <>
    <h2>Create new event:</h2>
    <Row className="mx-0">
      <Col md={4} className='container py-5'>
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Event name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter event name" />
        <Form.Text className="text-muted">
          {/*{errors ? errors : null}*/}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Event description</Form.Label>
        <Form.Control style={{ height: 150 }} as="textarea" name="description" placeholder="Short description about the event" />
        <Form.Text className="text-muted">
          {/*{errors ? errors : null}*/}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
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
                value="gt2"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gt3"
                label="GT3"
                inline
                name="category"
                value="gt3"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gt4"
                label="GT4"
                inline
                value="gt4"
                name="category"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gtc"
                label="GTC"
                inline
                value="gtc"
                name="category"
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="tcx"
                label="TCX"
                inline
                value="tcx"
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
            value="solo"
            id={`reverse-radio-1`}
            inline
          />
          <Form.Check
            reverse
            name="type"
            label="Team"
            type="radio"
            value="team"
            id={`reverse-radio-2`}
            inline
          />
          <Form.Check
            reverse
            name="type"
            label="Both"
            type="radio"
            value="both"
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