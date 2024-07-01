import { Form, Button, Row, InputGroup } from 'react-bootstrap';
import EventCard from './EventCard';

export default function Events() {
    return(
        <>
            <h1>Events page:</h1>
            <div className="container">
                <Form>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search events..."
                            aria-label="Search events..."
                            aria-describedby="basic-addon2"
                        />
                    <Button variant="warning" id="button-addon2">Search</Button>
                    </InputGroup>
                </Form>
            </div>
            <Row className="mx-4">
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </Row>
        </>
    );
}