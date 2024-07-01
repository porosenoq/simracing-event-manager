import { Button, Col, Form, Row } from 'react-bootstrap';

export default function CreateEvent() {
    return (
        <>
    <h2>Create new event:</h2>
    <Row className="mx-0">
      <Col md={4} className='container py-5'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Event name</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter event name" />
        <Form.Text className="text-muted">
          {/*{errors ? errors : null}*/}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Event image</Form.Label>
        <Form.Control type="password" name="password" placeholder="URL to event image" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventTrack">
        <Form.Label>Event track</Form.Label>
        <Form.Select aria-label="Default select example">
            {/* TODO - load all tracks from DB ? or json file */}
      <option>Select track</option>
      <option value="1">Imola</option>
      <option value="2">Spa Francorchamps</option>
      <option value="3">Hungaroring</option>
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
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gt3"
                label="GT3"
                inline
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gt4"
                label="GT4"
                inline
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="gtc"
                label="GTC"
                inline
            />
            <Form.Check // prettier-ignore
                type="switch"
                id="tcx"
                label="TCX"
                inline
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
            label="Solo"
            name="group1"
            type="radio"
            id={`reverse-radio-1`}
            inline
          />
          <Form.Check
            reverse
            label="Team"
            name="group1"
            type="radio"
            id={`reverse-radio-2`}
            inline
          />
          <Form.Check
            reverse
            label="Both"
            name="group1"
            type="radio"
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