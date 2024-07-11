import { useEffect, useState } from 'react';
import { getAll } from '../../services/teamService';
import { Card, Container, ListGroup } from 'react-bootstrap';

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
            <Container className="p-3">
                <Card className="text-white bg-dark">
                    <Card.Body>
                    <ListGroup>
                        {teams?.map(t => <ListGroup.Item className="bg-dark text-white" key={t._id}>{t.name}</ListGroup.Item>)}
                    </ListGroup>
                </Card.Body>
                </Card>
            </Container>
        </>
    );
}