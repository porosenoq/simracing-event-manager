import { Form, Button, Row, InputGroup, Spinner } from 'react-bootstrap';
import EventCard from './EventCard';
import { useContext, useEffect, useState } from 'react';
import { getAll } from '../../services/eventService';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

export default function Events() {

    const [events, setEvents] = useState();
    const [eventsArr, setEventsArr] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const {logoutHandler} = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const allEvents = await getAll();
                const eventsList = allEvents.map(event => <EventCard key={event._id} event={event}/>);
                setEvents(eventsList);
                setEventsArr(allEvents);
                setIsLoading(false);
            } catch(err) {
                if(err.message == "Invalid access token") {
                    logoutHandler();
                    navigate('/login')
                }
            }
          
        }
        fetchData();
      }, []);

      function updateSearchTerm(e) {
        setSearchTerm(e.target.value);
      }

      function search(e) {
        e.preventDefault();
        const regex = new RegExp(`${searchTerm.toLowerCase()}`, 'g');
        let eventsList = eventsArr.filter(e => e.name.toLowerCase().match(regex));
        eventsList = eventsList.map(event => <EventCard key={event._id} event={event}/>);
        setEvents(eventsList);
        setSearchCriteria(searchTerm);
        setSearchTerm('');        
      }

    return(
        <>
            <h1>All events</h1>
            <div className="container" style={{width: "750px"}}>
                <Form onSubmit={search}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={updateSearchTerm}
                            placeholder="Search events..."
                            aria-label="Search events..."
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            id="searchField"
                        />
                    <Button variant="warning" id="button-addon2">Search</Button>
                    </InputGroup>
                </Form>
                <div className="container">
                {searchCriteria ? <>Results for "{searchCriteria}":</> : null}
                </div>
                <div className="container">
                    {isLoading && <><Spinner animation="border" /><h1>Loading events...</h1></>}
                    {!events?.length && !isLoading ? <h1>No results!</h1> : null}
                </div>
            </div>
            <Row className="mx-4">
                {events}
            </Row>
        </>
    );
}