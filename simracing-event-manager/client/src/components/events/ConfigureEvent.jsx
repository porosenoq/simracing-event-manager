import { useEffect, useState } from 'react';
import { getById } from '../../services/eventService';
import { useParams } from 'react-router-dom';

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
        <h2>Configure</h2>

        {event?.name}
        </>
    );
}