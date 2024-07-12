import { useContext, useEffect, useState } from 'react';
import { getMyEvents, getMySignedUpEvents } from '../../services/eventService';
import AuthContext from '../../contexts/authContext';
import { Col, Container, Row } from 'react-bootstrap';

export default function MyEvents() {

    const { auth } = useContext(AuthContext);

    const [myEvents, setMyEvents] = useState([]);
    const [mySignUps, setMySignUps] = useState([]);

    useEffect(() => {
        async function loadMyEvents() {
            const myEventsData = await getMyEvents(auth._id);
            setMyEvents(myEventsData);

            const mySignUpsData = await getMySignedUpEvents(auth._id);
            setMySignUps(mySignUpsData);
        }
        loadMyEvents();
    }, []);

    return (
        <>
            <Container className='bg-dark my-3 py-3 rounded'>
                <Row>
                    <Col md={6}>
                        <h2>Events created by me:</h2>
                        {myEvents.map(e => <p key={e._id}>{e.name}</p>)}    
                    </Col>

                    <Col md={6}>
                        <h2>Events I signed up for:</h2>
                        {mySignUps.map(s => <p key={s._id}>{s.name}</p>)}
                    </Col>
                </Row>
            </Container>
        </>
    );
}