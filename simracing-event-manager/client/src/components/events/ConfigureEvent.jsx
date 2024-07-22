import { useEffect, useState } from 'react';
import { getById } from '../../services/eventService';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function ConfigureEvent() {

    const { id } = useParams();
    const [event, setEvent] = useState();
    
    useEffect(() => {
        (async function loadEvent() {
            const eventData = await getById(id);
            setEvent(eventData);
        })();
    }, []);

    return(
        <>
            <Container style={{width: "800px"}} className='bg-dark text-white py-3 px-5 my-3 rounded'>
                <Row>
                    <Col>
                        <h2>Configure event - {event?.name}</h2>        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="eventName">
                                <Form.Label>Minumum license required</Form.Label>
                                <Form.Control type="text" name="name" placeholder="IRON, SILVER, GOLD..." />
                                <Form.Text className="text-muted">
                                    {/*{errors ? errors : null}*/}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventDescription">
                                <Form.Label>Elo multiplier</Form.Label>
                                <Form.Control type="number" name="description" placeholder="elo multiplier" />
                                <Form.Text className="text-muted">
                                    {/*{errors ? errors : null}*/}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <Form.Label>Weather</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <Form.Label>Ingame times</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <Form.Label>Pitstop</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <Form.Label>Sessions length</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="URL to event image" />
                            </Form.Group>

                            <Button variant="success">Save configuration</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}