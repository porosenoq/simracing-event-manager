import { useContext, useEffect, useState } from 'react';
import { getAll } from '../../services/teamService';
import { Button, Card, Col, Container, Form, Image, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

import "./teams.css";

export default function Teams() {

    const { auth } = useContext(AuthContext);
    const [teams, setTeams] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');
    const [teamsArr, setTeamsArr] = useState([]);

    useEffect(() => {
        async function loadTeams() {
            const teams = await getAll();
            setTeams(teams);
            setTeamsArr(teams);
        }
        loadTeams();
    }, []);

    function search(e) {
        console.log('search for');
        e.preventDefault();
        const regex = new RegExp(`${searchTerm.toLowerCase()}`, 'g');
        let teamsList = teamsArr.filter(t => t.name.toLowerCase().match(regex));
        setTeams(teamsList);
        setSearchCriteria(searchTerm);
        setSearchTerm('');        
      }

      function updateSearchTerm(e) {
        setSearchTerm(e.target.value);
      }

      function teamApplicationHandler() {
        console.log('apply')
      }

    return(
        <>
            <Container className="p-3">
            
                <Card className="text-white bg-dark">
                    
                    <Card.Body>
                    <Container className="team_search">
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
                    <Button type="submit" variant="warning" id="button-addon2">Search</Button>
                    </InputGroup>
                </Form>
                </Container>
                    <ListGroup>
                        {teams?.map(t => <ListGroup.Item className="bg-dark text-white team_item" key={t._id}><Row><Col><Image className="team_image rounded" src={t.image} /></Col><Col className="d-flex align-items-center"><Link className="navbar-link" to={`/teams/${t._id}`}>{t.name}</Link></Col>{auth._id ? <Col className="align-items-center d-flex"><Button onClick={teamApplicationHandler} size="sm" variant="success">Apply</Button></Col> : null }</Row></ListGroup.Item>)}
                        {!teams?.length ? `No results for "${searchCriteria}"` : null}
                    </ListGroup>
                </Card.Body>
                </Card>
            </Container>
        </>
    );
}