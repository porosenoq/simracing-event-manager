import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/authContext';
import { getAll } from '../../services/teamService';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

import "./my_teams.css";
import { BoxArrowRight, XCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function MyTeams() {

    const { auth } = useContext(AuthContext);
    const [memberIn, setMemberIn] = useState([]);
    const [applicantIn, setApplicantIn] = useState([]);

    useEffect(() => {
        (async function loadMyTeams() {
            const teams = await getAll();
            const memberTeams = teams.filter(t => t.members.some(m => m._id == auth._id));
            const applicantTeams = teams.filter(t => t.applicants.some(a => a._id == auth._id));

            setMemberIn(memberTeams);
            setApplicantIn(applicantTeams);
        })();
    }, []);

    return(
        <>
            <Container className="text-white bg-dark my-3 py-3 rounded">
                <Row>
                    <h3>My teams:</h3>
                </Row>
                <Row>
                    <Col>
                        <h4>Member in:</h4>
                        <ListGroup>
                        {memberIn.length == 0 && 'You aren\'t a member in any team yet'}
                            {memberIn.map(m => 
                                (<ListGroupItem className="bg-dark text-white" key={m._id}>
                                    <Link to={`/teams/${m._id}`} className="navbar-link">
                                        {m.name}
                                    </Link>
                                    <BoxArrowRight className="mx-2 leave_team" data-toggle="test" color="red"></BoxArrowRight>
                                </ListGroupItem>)
                                )}                            
                        </ListGroup>

                    </Col>
                    <Col>
                        <h4>Applicant in:</h4>
                        {applicantIn.length == 0 && 'You haven\'t applied to a team yet'}
                        <ListGroup>
                            {applicantIn.map(a => 
                                (<ListGroupItem className="bg-dark text-white" key={a._id}>
                                    <Link to={`/teams/${a._id}`} className="navbar-link">
                                        {a.name}
                                    </Link>
                                    <XCircle color="red" className="mx-2 leave_team"></XCircle>
                                </ListGroupItem>)
                                )}
                        </ListGroup>
                    </Col>
                </Row>
                {applicantIn.length == 0 && memberIn.length == 0 && <div className="my-3">Head over to <Link to={'/teams'} className="navbar-link">teams</Link> page and apply for a team!</div>}

                {memberIn.length == 0 && applicantIn.length > 0 && <div className="my-3">You have {applicantIn.length} pending {applicantIn.length == 1 ? 'application' : 'applications'}</div>}
            </Container>
        </>
    );
}