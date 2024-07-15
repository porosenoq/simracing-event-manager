import { useEffect, useState } from 'react';
import { getAll } from '../../services/teamService';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                        {teams?.map(t => <ListGroup.Item className="bg-dark text-white" key={t._id}><Row><Col md="8"><Link className="navbar-link" to={`/teams/${t._id}`}>{t.name}</Link></Col><Col md="3"><Button size="sm" variant="success">follow</Button></Col></Row></ListGroup.Item>)}
                    </ListGroup>
                </Card.Body>
                </Card>
            </Container>
        </>
    );
}