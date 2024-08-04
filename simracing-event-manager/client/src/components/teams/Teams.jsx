import { useContext, useEffect, useState } from 'react';
import { getAll, teamApply } from '../../services/teamService';
import { Button, Card, Container, Form, InputGroup, ListGroup } from 'react-bootstrap';
import AuthContext from '../../contexts/authContext';

import "./teams.css";
import TeamListItem from './TeamListItem';

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

      async function teamApplicationHandler(teamId) {
        try {
            await teamApply(teamId, auth);
        } catch (err) {
            console.log(err);
        }
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
                        {teams?.map(team => 
                            <TeamListItem 
                                key={team._id}
                                teamApplicationHandler={teamApplicationHandler}
                                auth={auth}
                                team={team}
                            />
                        )}
                    {!teams?.length ? `No results for "${searchCriteria}"` : null}
                    </ListGroup>
                </Card.Body>
                </Card>
            </Container>
        </>
    );
}