import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../../services/eventService';
import { Badge, Button, Card, Col, Container, Image, Row, Table } from 'react-bootstrap';
import AuthContext from '../../contexts/authContext';

export default function EventDetails() {

    const { auth } = useContext(AuthContext);
    const {id} = useParams();

    const [event, setEvent] = useState({});

    useEffect(() => {
        async function loadEvent() {
            const event = await getById(id);
            console.log(event);
            setEvent(event);
        }
        loadEvent();
    }, []);

    const isSignedUp = event.subscribers?.some(s => s._id == auth._id);
    const isFull = event.subscribers?.length == event.gridSize;

    return (
        <>    {/*     
        <Row className="mx-0">
            <Col md={3} className='my-3'>
            Left menu for event controls
            </Col>
            <Col md={6} className='my-3'>
            <Card className='bg-dark text-white' style={{fontWeight: "bold"}}>
        <Card.Img variant="top" src={event?.image} />
        <Card.Body>
        <ListGroup>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text style={{fontSize: "3em"}}>{event?.name}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text style={{fontSize: "2em"}}>{event?.description}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text>Categories allowed: {event?.category}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text>Event type: {event?.type}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text>Track: {event?.track}</Card.Text>
      </ListGroup.Item>
      <ListGroup.Item className='bg-dark text-white'>
        <Card.Text>Drivers: {event?.subscribers?.length}/{event?.gridSize}</Card.Text>
      </ListGroup.Item>
    </ListGroup>
        </Card.Body>
      </Card>
            </Col>
            <Col md={3} className='my-3 px-3'>
                <ListGroup>
                    <ListGroupItem className="bg-dark text-white">
                        Users signed up:
                    </ListGroupItem>
                    {event.subscribers?.length > 0 ?
                        <ListGroupItem className="bg-dark text-white py-2">
                        {event.subscribers?.map(s => <Link key={s._id} className="nav-link navbar-link" to={'/profile/' + s._id}>{s.username}</Link>)}
                        </ListGroupItem> :

                        <ListGroupItem className="bg-dark text-white py-2">
                        Nobody subscribed yet!
                        </ListGroupItem>
                    }
                </ListGroup>
                
            </Col>
        </Row> */}
         <Container className="p-3">
      <Card className="text-white bg-dark">
        <Row>
          <Col md={5}>            
            <Image src={event?.image} className="event_image"/>
          </Col>
          <Col md={7} className="event_text_section">
            <Card.Body>
              <Card.Title className="justify-content-between event_title">
                <div>
                  {/* <Badge bg="success" className="session_number">Session #134985</Badge> */}
                  <span className="event_title">{event?.name}</span>
                </div>
              </Card.Title>
              
                <Table borderless variant="dark" className="mt-3 event_body">
                  <tbody className="event_table_body">
                    <tr className="tr_first">
                      <td>Min. License Req.</td>
                      <td><Badge bg="secondary">IRON</Badge></td>
                    </tr>
                    <tr>
                      <td>Elo multiplier</td>
                      <td>1.7</td>
                    </tr>
                    <tr>
                      <td>Weather</td>
                      <td>19°C 🌡 12% ☁ 16% 🌫 30% 🌩</td>
                    </tr>
                    <tr>
                      <td>Ingame Times</td>
                      <td>P 16:00 | Q 16:00 | R 16:00</td>
                    </tr>
                    <tr>
                      <td>Pitstop</td>
                      <td>Refueling required, Refueling time fixed (25 sec.), Pit window 43 min.</td>
                    </tr>
                    <tr>
                      <td>Sessions</td>
                      <td>(P) 2 min. | (Q) 15 min. | (R) 45 min.</td>
                    </tr>
{/*                     <tr>
                      <td>Servername</td>
                      <td>lowfuelmotorsport.com | Season 15 | Synchmesh GT3 Series | WEEK 1 | LFM | #134985</td>
                    </tr>
                    <tr>
                      <td>Serverpassword</td>
                      <td>***</td>
                    </tr> */}
                  </tbody>
                </Table>

              {!isSignedUp && !isFull && <Button variant="success">Sign up</ Button>}
              {isSignedUp && <Button variant="danger">Sign Out</Button>}
              {isFull && <><Button disabled variant="warning">Grid is currently full</Button></>}
              
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
        </>
    );
}