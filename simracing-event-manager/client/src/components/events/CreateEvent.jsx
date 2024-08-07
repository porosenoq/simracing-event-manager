import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { create } from '../../services/eventService';
import { useNavigate } from 'react-router-dom';
import EventCarCategories from './EventCarCategories';
import EventTrackSelect from './EventTrackSelect';
import EventInfoInputs from './EventInfoInputs';
import EventGridSize from './EventGridSize';
import EventType from './EventType';
import EventDriverStintTime from './EventDriverStintTime';
import { useState } from 'react';

export default function CreateEvent() {

  const navigate = useNavigate();

  const [showDriverStintTime, setShowDriverStintTime] = useState(false);
  const [errors, setErrors] = useState({});

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const eventData = Object.fromEntries(formData);
        const eventCategories = formData.getAll("category");
        eventData.category = eventCategories;
        eventData.subscribers = [];
        eventData.minLicenseReq = 'IRON';
        eventData.eloMultiplier = 1;
        eventData.weather = {temp: 20, cloud: 0, rain: 0, randomness: 0};
        eventData.ingameTimes = {p: '16:00', q: '16:00', r: '16:00'};
        eventData.sessionsLength = {p: 2, q: 15, r: 45};
        eventData.pitStop = {
          refueling: {
          req: false,
          fixedTime: false,
          time: 0
        }, 
          tyreChange: {
            req: false,
          },
          
          pitWindow: 43
        };

        if(!eventData.name) {
          setErrors(oldState => ({...oldState, name: 'Name is required!'}));
        } else {
          setErrors(oldState => ({...oldState, name: null}));
        }

        if(!eventData.description) {
          setErrors(oldState => ({...oldState, description: 'Description can not be empty!'}));
        } else {
          setErrors(oldState => ({...oldState, description: null}));
        }

        if(!eventData.image) {
          setErrors(oldState => ({...oldState, image: 'Image can not be empty!'}));
        } else {
          setErrors(oldState => ({...oldState, image: null}));
        }

        if(!eventData.track) {
          setErrors(oldState => ({...oldState, track: 'Please select a track!'}));
        } else {
          setErrors(oldState => ({...oldState, track: null}));
        }

        if(eventData.category.length == 0) {
          setErrors(oldState => ({...oldState, category: 'Please select at least one car category!'}));
        } else {
          setErrors(oldState => ({...oldState, category: null}));
        }

        if(!eventData.gridSize || eventData.gridSize <= 0) {
          setErrors(oldState => ({...oldState, gridSize: 'Grid size must be a positive number and can not be empty!'}));
          return
        } else {
          setErrors(oldState => ({...oldState, gridSize: null}));
        }

        try {
          const createdEvent = await create(eventData);
          navigate('/events/configure/' + createdEvent._id);
        } catch(err) {
          throw new Error('Access token has expired!')
        }
    }

    function eventTypeChangeHandler(e) {
      if(e.target.value == 'Team' || e.target.value == 'Both') {
        setShowDriverStintTime(true);
      } else {
        setShowDriverStintTime(false);
      }
    }
    return (
<>
  <Container className="my-3">
    <Card className="text-white bg-dark">

      <h2>Create new event:</h2>

      <Form onSubmit={submitHandler}>
        <Row className="mx-0">
          <Col md={5} className='container py-5'>
            
            <EventInfoInputs errors={errors}/>

            <EventTrackSelect errors={errors}/>

            <EventCarCategories errors={errors}/>

            <EventGridSize errors={errors}/>

            <EventType changeHandler={eventTypeChangeHandler} />

            {showDriverStintTime && <EventDriverStintTime />}            

            <Button variant="warning" type="submit">
              Create event
            </Button>

          </Col>
        </Row>
      </Form>
    </Card>
  </Container>
</>
    );
}