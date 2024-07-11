import { Form } from 'react-bootstrap';

export default function EventGridSize() {
    return (
        <Form.Group className="mb-3" controlId="eventImage">
            <Form.Label>Grid size:</Form.Label>
            <Form.Control type="number" name="gridSize" placeholder="grid size" />
        </Form.Group>
    );
}