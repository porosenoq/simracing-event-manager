import { useEffect, useState } from 'react';
import { getById } from '../../services/eventService';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function ConfigureEvent() {

    const { id } = useParams();
    const [event, setEvent] = useState();
    const [config, setConfig] = useState({});
    
    useEffect(() => {
        (async function loadEvent() {
            const eventData = await getById(id);
            setEvent(eventData);
            setConfig({aTemp: eventData.weather?.temp, cloudLevel: eventData.weather?.cloud, rainProbability: eventData.weather?.rain, eloMultiplier: eventData.eloMultiplier})
        })();
    }, []);
    

    function handleChange(e) {
        setConfig(oldState => ({...oldState, [e.target.name] : e.target.value}))
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
                                <Form.Select aria-label="Minimum license">
                                    <option value="IRON">Iron</option>
                                    <option value="SILVER">Silver</option>
                                    <option value="GOLD">Gold</option>
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    {/*{errors ? errors : null}*/}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventDescription">
                                <Form.Label>Elo multiplier - {config.eloMultiplier}</Form.Label>
                                <Form.Range step={0.1} onChange={handleChange} name="eloMultiplier" min={0} max={2} value={config.eloMultiplier} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                <h5>Weather</h5>
                          
                                <Form.Label>Ambient temperature - {config.aTemp}°C</Form.Label>
                                <Form.Range onChange={handleChange} name="aTemp" min={10} max={40} value={config.ambientTemp} />

                                <Form.Label>Cloud level - {config.cloudLevel}%</Form.Label>
                                <Form.Range onChange={handleChange} name="cloudLevel" min={0} max={100} value={config.cloudLevel} />

                                <Form.Label>Probability of rain - {config.rainProbability}%</Form.Label>
                                <Form.Range onChange={handleChange} name="rainProbability" min={0} max={100} value={config.rainProbability}/>
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