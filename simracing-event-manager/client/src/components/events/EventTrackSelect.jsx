import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { get } from '../../utils/request';

export default function EventTrackSelect() {
    
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        async function loadTracks() {
            const allTracks = await get("http://localhost:3030/data/tracks");
            setTracks(allTracks);
        }
        loadTracks();
    }, []);
    return(
        <Form.Group className="mb-3" controlId="eventTrack">
            <Form.Label>Event track</Form.Label>
            <Form.Select name="track" aria-label="Default select example">
                <option value=''>select track</option>
                {tracks?.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
            </Form.Select>
        </Form.Group>
    );
}