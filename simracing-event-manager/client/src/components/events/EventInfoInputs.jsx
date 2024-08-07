import { Form } from 'react-bootstrap';

export default function EventInfoInputs({errors}) {
    return (
        <>
            <Form.Group className="mb-3" controlId="eventName">
              <Form.Label>Event name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter event name" />
              <Form.Text className="text-muted">
  {/*{errors ? errors : null}*/}
  {errors.name}
              </Form.Text>
              </Form.Group>

            <Form.Group className="mb-3" controlId="eventDescription">
              <Form.Label>Event description</Form.Label>
              <Form.Control style={{ height: 150 }} as="textarea" name="description" placeholder="Short description about the event" />
              <Form.Text className="text-muted">
  {errors.description}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="eventImage">
              <Form.Label>Event image</Form.Label>
              <Form.Control type="text" name="image" placeholder="URL to event image" />
              <Form.Text className="text-muted">
  {errors.image}
              </Form.Text>
            </Form.Group>
        </>
    );
}