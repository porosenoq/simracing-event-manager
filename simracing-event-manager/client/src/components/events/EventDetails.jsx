import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/eventService';
import { Badge, Button, Card, Col, Container, Image, Row, Spinner, Table } from 'react-bootstrap';
import { Gear } from 'react-bootstrap-icons';
import AuthContext from '../../contexts/authContext';
import useEventSignUp from '../../hooks/useEventSignUp';
import Loading from './Loading';

import './details_style.css'

export default function EventDetails() {

    const { auth } = useContext(AuthContext);
    const {id} = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState({loaded: false});
    
    const [isLoading, signedUpStatus, setSignedUpStatus, eventSignUpHandler, eventSignOutHandler] = useEventSignUp(event, auth._id);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function loadEvent() {
        setLoading(true);
        try {
          const event = await getById(id);
          const alreadySubscribed = event.subscribers?.some(s => s._id == auth._id);
          setSignedUpStatus(alreadySubscribed);
          setEvent(event);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      }
      loadEvent();
    }, []);
    
    const isFull = event.subscribers?.length == event?.gridSize;

    return (
      <>    
        <Container className="my-3 rounded">
          {loading ? <Loading /> : <Card className="text-white bg-dark">
            <Row>
              <Col md={5}>            
                <Image src={event?.image} className="event_image"/>
              </Col>
              <Col md={7} className="event_text_section">
                <Card.Body>
                  <Card.Title className="justify-content-between event_title">
                    <div>
                  {/* <Badge bg="success" className="session_number">Session #134985</Badge> */}
                    <span className="event_title">{event?.name} {event._ownerId == auth._id && <Gear onClick={() => navigate('/events/configure/' + id)} style={{float: 'right', cursor: 'pointer'}}/>}</span>
                    </div>
                  </Card.Title>
              
                  <Table borderless variant="dark" className="mt-3 event_body">
                    <tbody className="event_table_body">
                      <tr className="tr_first">
                        <td>Min. License Req.</td>
                        <td><Badge className={event.minLicenseReq == 'IRON' && 'bronze' || event.minLicenseReq == 'SILVER' && 'silver' || event.minLicenseReq == 'GOLD' && 'gold'}>{event?.minLicenseReq}</Badge></td>
                      </tr>
                      <tr>
                        <td>Elo multiplier</td>
                        <td>{event?.eloMultiplier}</td>
                      </tr>
                      <tr>
                        <td>Weather</td>
                        <td>{event.weather?.temp}°C 🌡 {event.weather?.cloud}% ☁ {event.weather?.randomness}% 🌫 {event.weather?.rain}% 🌩</td>
                      </tr>
                      <tr>
                        <td>Ingame Times</td>
                        <td>P {event.ingameTimes?.p} | Q {event.ingameTimes?.q} | R {event.ingameTimes?.r}</td>
                      </tr>
                      <tr>
                        <td>Pitstop</td>
                        <td>Refueling: {event.pitStop?.refueling?.req ? 'Yes' : 'No'}, {event.pitStop?.refueling?.fixedTime ? `Fixed time (${event.pitStop?.refueling?.time} sec.), ` : null} {event.pitStop?.tyreChange && 'Tyre change - yes, '}Pit window {event.pitStop?.pitWindow} min.</td>
                      </tr>
                      <tr>
                        <td>Sessions</td>
                        <td>(P) {event.sessionsLength?.p} min. | (Q) {event.sessionsLength?.q} min. | (R) {event.sessionsLength?.r} min.</td>
                      </tr>
                    </tbody>
                  </Table>

                  {auth._id && !signedUpStatus && !isFull && !isLoading && <Button onClick={eventSignUpHandler} variant="success">Sign up</ Button>}

                  {!signedUpStatus && !isFull && isLoading && 
                    <Button disabled={isLoading} onClick={eventSignUpHandler} variant="success">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      /> Loading...
                    </ Button>}

                  {auth._id && signedUpStatus && !isLoading && <Button onClick={eventSignOutHandler} variant="danger">Sign Out</Button>}

									{signedUpStatus && !isFull && isLoading && 
                    <Button disabled={isLoading} variant="danger">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      /> Loading...
                    </ Button>}

                  {/* {isFull && !signedUpStatus && event.loaded && <><Button disabled variant="warning">Grid is currently full</Button></>} */}

									{isLoading && isFull && auth._id && <><Button disabled variant="warning">Grid is currently full</Button></>}

                  {!auth._id && <>Want to participate? <Link className="navbar-link" to={'/login'}>Login</Link></>}
              
                </Card.Body>
                </Col>
              </Row>
          </Card> }
          
        </Container>
      </>
    );
}