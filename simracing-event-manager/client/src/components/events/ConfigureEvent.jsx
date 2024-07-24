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


    function handleChange() {

    }

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
                                <Form.Control value={event?.minLicenseReq} type="text" name="name" placeholder="IRON, SILVER, GOLD..." />
                                <Form.Text className="text-muted">
                                    {/*{errors ? errors : null}*/}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventDescription">
                                <Form.Label>Elo multiplier</Form.Label>
                                <Form.Control value={event?.eloMultiplier} type="number" name="description" placeholder="elo multiplier" />
                                <Form.Text className="text-muted">
                                    {/*{errors ? errors : null}*/}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <Form.Label>Weather</Form.Label>
                                <Form.Control
                                    value={event?.weather.temp}
                                    onChange={handleChange}
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Ambient temperature in °C" />
                                <Form.Control
                                    value={event?.weather.cloud}
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Cloud level in %" />
                                <Form.Control
                                    value={event?.weather.rain}
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Probability of rain in %" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <Form.Label>Ingame times</Form.Label>
                                <Form.Control
                                    value={event?.ingameTimes.p}
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Practice session time" />
                                <Form.Control
                                    value={event?.ingameTimes.q}
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Qialification session time" />
                                <Form.Control
                                    value={event?.ingameTimes.r}
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Race session time" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <Form.Label>Pitstop</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="pitstop..." />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="pitstop..." />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="pitstop..." />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <Form.Label>Sessions length</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Practice session length" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Qialification session length" />
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    name="image"
                                    placeholder="Race session length" />
                            </Form.Group>

                            <Button variant="success">Save configuration</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}