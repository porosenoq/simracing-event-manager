import { Form } from 'react-bootstrap';

export default function EventDriverStintTime() {
    return(
        <Form.Group className="mb-3" controlId="eventDescription">
            <Form.Label>Driver stint time</Form.Label>
            <Form.Control type="number" name="stintTime" placeholder="Maximum driver stint time" />
            <Form.Text className="text-muted">
  {/*{errors ? errors : null}*/}
            </Form.Text>
        </Form.Group>
    );
}