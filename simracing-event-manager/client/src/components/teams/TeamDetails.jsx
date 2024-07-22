import { useEffect, useState } from 'react';
import { getById } from '../../services/teamService';
import { useParams } from 'react-router-dom';
import { Container, Image, ListGroup } from 'react-bootstrap';

import "./teams.css";

export default function TeamDetails() {
    const { teamId } = useParams();
    const [team, setTeam] = useState({});

    useEffect(() => {
        (async function loadTeamData() {
            const teamData = await getById(teamId);
            setTeam(teamData);
        })();
    }, []);
    return(
        <>
            <Container className="bg-dark text-white rounded my-3 py-3">
                <ListGroup horizontal className="my-2">
                    <ListGroup.Item className="bg-dark text-white"><Image roundedCircle style={{width: "50px"}} src={team.image}/></ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-white align-items-center d-flex">{team.name}</ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-white align-items-center d-flex">{team.members?.map(m => m._id)}</ListGroup.Item>
                </ListGroup>
            </Container>
        </>
    );
}