import { useEffect, useState } from 'react';
import { getById, update } from '../../services/eventService';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import "./form_style.css"

export default function ConfigureEvent() {

    const { id } = useParams();
    const [event, setEvent] = useState();
    const [config, setConfig] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        (async function loadEvent() {
            const eventData = await getById(id);
            setEvent(eventData);
            setConfig({aTemp: eventData.weather?.temp, cloudLevel: eventData.weather?.cloud, rainProbability: eventData.weather?.rain, eloMultiplier: eventData?.eloMultiplier, sessionLengthP: eventData.sessionsLength?.p, sessionLengthQ: eventData.sessionsLength?.q, sessionLengthR: eventData.sessionsLength?.r, pitWindow: eventData.pitStop?.pitWindow, ingameTimesPH: eventData.ingameTimes?.p.slice(0,2), ingameTimesPM: eventData.ingameTimes?.p.slice(3,5), ingameTimesQH: eventData.ingameTimes?.q.slice(0,2), ingameTimesQM: eventData.ingameTimes?.q.slice(3,5), ingameTimesRH: eventData.ingameTimes?.r.slice(0,2), ingameTimesRM: eventData.ingameTimes?.r.slice(3,5), refuelingRequired: eventData.pitStop.refueling?.req, mandatoryTyreChange: eventData.pitStop.tyreChange?.req, minLicenseReq: eventData.minLicenseReq, fixedTimeRefueling: eventData.pitStop.refueling?.fixedTime, fixedTime: eventData.pitStop.refueling?.time, randomness: eventData.weather?.randomness})
        })();
    }, []);

    async function handleSave() {
        const adjustedConfig = {
            eloMultiplier: config.eloMultiplier,
            minLicenseReq: config.minLicenseReq,
            weather: {
                temp: config.aTemp,
                cloud: config.cloudLevel,
                rain: config.rainProbability,
                randomness: config.randomness
            },
            ingameTimes: {
                p: config.ingameTimesPH.toString() + ':' + config.ingameTimesPM.toString(),
                q: config.ingameTimesQH.toString() + ':' + config.ingameTimesQM.toString(),
                r: config.ingameTimesRH.toString() + ':' + config.ingameTimesRM.toString()
            },
            pitStop: {
                refueling: {
                    req: config.refuelingRequired,
                    fixedTime: config.fixedTimeRefueling,
                    time: config.fixedTime
                },
                tyreChange: {
                    req: config.mandatoryTyreChange
                },
                pitWindow: config.pitWindow
            },
            sessionsLength: {
                p: config.sessionLengthP,
                q: config.sessionLengthQ,
                r: config.sessionLengthR
            }
        }

        try {
            const result = await update(id, {...event, ...adjustedConfig});
            console.log(result);
            navigate(`/events/details/${id}`);

        } catch (err) {
            console.log(err)
        }
    }    

    function handleChange(e) {
        console.log(e.target.name, e.target.value);
        
        if(e.target.name == 'refuelingRequired') {
            setConfig(oldState => ({...oldState, [e.target.name] : e.target.checked}))    
        } else if(e.target.name == 'mandatoryTyreChange') {
            setConfig(oldState => ({...oldState, [e.target.name] : e.target.checked}))    
        } else if(e.target.name == 'fixedTimeRefueling') {
            setConfig(oldState => ({...oldState, [e.target.name] : e.target.checked}))    
        } else {
            setConfig(oldState => ({...oldState, [e.target.name] : e.target.value}))
        }
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
                                <Form.Select name="minLicenseReq" onChange={handleChange} aria-label="Minimum license">
                                    <option selected={config.minLicenseReq == 'IRON'} value="IRON">IRON</option>
                                    <option selected={config.minLicenseReq == 'SILVER'} value="SILVER">SILVER</option>
                                    <option selected={config.minLicenseReq == 'GOLD'} value="GOLD">GOLD</option>
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
                                <Form.Range onChange={handleChange} max={40} step={1} name="aTemp" value={config.ambientTemp}/>

                                <Form.Label>Cloud level - {config.cloudLevel}%</Form.Label>
                                <Form.Range onChange={handleChange} name="cloudLevel" min={0} max={100} value={config.cloudLevel} />

                                <Form.Label>Probability of rain - {config.rainProbability}%</Form.Label>
                                <Form.Range onChange={handleChange} name="rainProbability" min={0} max={100} value={config.rainProbability}/>

                                <Form.Label>Weather randomness - {config.randomness}%</Form.Label>
                                <Form.Range onChange={handleChange} name="randomness" min={0} max={100} value={config.randomness}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                
                                <Form.Label>Ingame times</Form.Label>

                                <Row>
                                    <Col className="ingameTimes">
                                <Form.Control
                                    value={config.ingameTimesPH?.length == 1 ? '0' + config.ingameTimesPH : config.ingameTimesPH}
                                    className="mb-3 ingameTimesL"
                                    type="number"
                                    min={0}
                                    max={23}
                                    onChange={handleChange}
                                    name="ingameTimesPH"
                                    placeholder="hour" />
                                    </Col>:
                                    <Col>
                                    <Form.Control
                                    value={config.ingameTimesPM?.length == 1 ? '0' + config.ingameTimesPM : config.ingameTimesPM}
                                    className="mb-3 ingameTimesR"
                                    onChange={handleChange}
                                    type="number"
                                    min={0}
                                    max={59}
                                    name="ingameTimesPM"
                                    placeholder="minutes" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                <Form.Control
                                    value={config.ingameTimesQH?.length == 1 ? '0' + config.ingameTimesQH : config.ingameTimesQH}
                                    className="mb-3 ingameTimesL"
                                    onChange={handleChange}
                                    type="number"
                                    min={0}
                                    max={23}
                                    name="ingameTimesQH"
                                    placeholder="hour" />
                                    </Col>:
                                    <Col>
                                    <Form.Control
                                    value={config.ingameTimesQM?.length == 1 ? '0' + config.ingameTimesQM : config.ingameTimesQM}
                                    className="mb-3 ingameTimesR"
                                    onChange={handleChange}
                                    type="number"
                                    min={0}
                                    max={59}
                                    name="ingameTimesQM"
                                    placeholder="minutes" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                <Form.Control
                                    value={config.ingameTimesRH?.length == 1 ? '0' + config.ingameTimesRH : config.ingameTimesRH}
                                    className="mb-3 ingameTimesL"
                                    onChange={handleChange}
                                    type="number"
                                    min={0}
                                    max={23}
                                    name="ingameTimesRH"
                                    placeholder="hour" />
                                    </Col>:
                                    <Col>
                                    <Form.Control
                                    value={config.ingameTimesRM?.length == 1 ? '0' + config.ingameTimesRM : config.ingameTimesRM}
                                    className="mb-3 ingameTimesR"
                                    onChange={handleChange}
                                    type="number"
                                    min={0}
                                    max={59}
                                    name="ingameTimesRM"
                                    placeholder="minutes" />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                                                                
                                <Form.Label>Pitstop settings</Form.Label>
                                <br />
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    
                                    label="Refueling required"
                                    inline
                                    onChange={handleChange}
                                    name="refuelingRequired"
                                    value="refueling"
                                    checked={config.refuelingRequired}
                                />
                                <Form.Check // prettier-ignore
                                    type="switch"                                    
                                    label="Mandatory tyre change"
                                    onChange={handleChange}
                                    inline
                                    name="mandatoryTyreChange"
                                    value="tyreChange"
                                    checked={config.mandatoryTyreChange}
                                />

                                {config.refuelingRequired && <><br />
                                <Form.Check // prettier-ignore
                                    style={{marginTop: "20px"}}
                                    type="switch"                                    
                                    label="Fixed time refueling"
                                    onChange={handleChange}
                                    inline
                                    name="fixedTimeRefueling"
                                    value="tyreChange"
                                    checked={config.fixedTimeRefueling}
                                /></>}

                                {config.fixedTimeRefueling && <><br />
                                    <Form.Label>Fixed time refueling - {config.fixedTime} seconds</Form.Label>
                                    <Form.Control onChange={handleChange} min={0} type="number" name="fixedTime" value={config.fixedTime} />
                                </>}
                                

                                <p></p>
                                <Form.Label>Pit window in minutes {config.pitWindow}</Form.Label>
                                <Form.Control max={config.sessionLengthR} onChange={handleChange} type="number" name="pitWindow" value={config.pitWindow} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="eventImage">
                            
                                <Form.Label>Sessions length in minutes: </Form.Label>
                                <p>Qualification {config.sessionLengthQ && <>{config.sessionLengthQ} min</>}</p>
                                <Form.Range step={1} onChange={handleChange} name="sessionLengthQ" min={0} max={60} value={config.sessionLengthQ} />

                                <p>Practice {config.sessionLengthP && <>{config.sessionLengthP} min</>}</p>
                                <Form.Range step={1} onChange={handleChange} name="sessionLengthP" min={0} max={60} value={config.sessionLengthP} />

                                <p>Race {config.sessionLengthR <= 60 && <>{config.sessionLengthR} min</>} {config.sessionLengthR && config.sessionLengthR > 60 && config.sessionLengthR % 60 != 0 && <>{Math.floor(config.sessionLengthR / 60)} h {config.sessionLengthR % 60} min</>}
                                {config.sessionLengthR && config.sessionLengthR > 60 && config.sessionLengthR % 60 == 0 && <>{Math.floor(config.sessionLengthR / 60)} h</>}
                                </p>
                                <Form.Range step={1} onChange={handleChange} name="sessionLengthR" min={15} max={1440} value={config.sessionLengthR} />
                            
                            </Form.Group>

                            <Button onClick={handleSave} variant="success">Save configuration</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}