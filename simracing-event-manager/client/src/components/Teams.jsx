import { useEffect, useState } from 'react';
import { getAll } from '../services/teamService';
import { ListGroup } from 'react-bootstrap';

export default function Teams() {

    const [teams, setTeams] = useState();

    useEffect(() => {
        async function loadTeams() {
            const teams = await getAll();
            setTeams(teams);
        }
        loadTeams();
    }, []);

    return(
        <>
            <div className="container my-3">
            <ListGroup>
            {teams?.map(t => <ListGroup.Item className="bg-dark text-white" key={t._id}>{t.name}</ListGroup.Item>)}
            </ListGroup>
            </div>
        </>
    );
}