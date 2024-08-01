import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { CheckCircle, Gear, Trash } from 'react-bootstrap-icons';

import AuthContext from '../../contexts/authContext';
import { getMyEvents, getMySignedUpEvents } from '../../services/eventService';
import EventDeleteModal from './EventDeleteModal';

export default function MyEvents() {

    const { auth } = useContext(AuthContext);

    const [myEvents, setMyEvents] = useState([]);
    const [mySignUps, setMySignUps] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        async function loadMyEvents() {
            const myEventsData = await getMyEvents(auth._id);
            setMyEvents(myEventsData);

            const mySignUpsData = await getMySignedUpEvents(auth._id);
            setMySignUps(mySignUpsData);
        }
        loadMyEvents();
    }, []);

    function handleShowModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <>
            <EventDeleteModal showModal={showModal} hideModal={handleCloseModal} modalData={modalData}/>
            <Container className='bg-dark my-3 py-3 rounded'>
                <Row>
                    <Col md={6}>
                        <h2>My events:</h2>
                        <Row className="py-3">
                            <Col md={9}>Event:</Col>
                            <Col md={3}>Manage:</Col>
                        </Row>
                        {myEvents.length > 0 ? 
                            myEvents.map(e => (
                                <Row className="hover_row py-2" key={e._id}>
                                    <Col md={9}>
                                        <Link className="navbar-link" to={`/events/details/${e._id}`}>
                                            {e.name + ' '}
                                        </Link>
                                    </Col>
                                    <Col md={3}>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Publish</Tooltip>}>
                                            <CheckCircle className="mx-1" size="24" color="#198754"/>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Configure</Tooltip>}>
                                            <Link className="config" to={`/events/configure/${e._id}`}>
                                                <Gear className="mx-1" size="24" />
                                            </Link>
                                        </ OverlayTrigger>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete</Tooltip>}>
                                            <Trash className="mx-1" style={{cursor: 'pointer'}} onClick={() => {setModalData({id: e._id, name: e.name}); handleShowModal();}} color="#dc3545" size="24" />
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            )) :
                            <>
                                <p>You haven't created any events yet!
                                <Link className="navbar-link" to={'/events/create'}> Create</Link> your first one now!</p>
                            </>
                        }    
                    </Col>

                    <Col md={6}>
                        <h2>Events I signed up for:</h2>
                        <Row className="py-3">
                            <Col md={8}>Event:</Col>
                            <Col md={3}>Actions:</Col>
                        </Row>
                        {mySignUps.length > 0 ? 
                            mySignUps.map(s => (
                                <Row key={s._id}>
                                    <Col md={8}>
                                        <p key={s._id}>
                                            <Link className="navbar-link" to={`/events/details/${s._id}`}>{s.name}</Link>
                                        </p>
                                    </Col>
                                    <Col md={3}>
                                        <Button size="sm" variant="danger">Sign out</Button>
                                    </Col>
                                </Row>
                            )) :
                            <>
                                <p>You haven't signed up for an event yet! Head over to <Link className="navbar-link" to={'/events'}>events</Link> page and start racing now!</p>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
}