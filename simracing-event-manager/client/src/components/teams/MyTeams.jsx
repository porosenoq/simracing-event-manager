import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import TeamModal from './TeamModal';

import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { BoxArrowRight, XCircle } from 'react-bootstrap-icons';

import { getAll } from '../../services/teamService';

import "./my_teams.css";

export default function MyTeams() {

    const { auth } = useContext(AuthContext);
    const [memberIn, setMemberIn] = useState([]);
    const [applicantIn, setApplicantIn] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [action, setAction] = useState('');

    useEffect(() => {
        (async function loadMyTeams() {
            const teams = await getAll();
            const memberTeams = teams.filter(t => t.members.some(m => m._id == auth._id));
            const applicantTeams = teams.filter(t => t.applicants.some(a => a._id == auth._id));

            setMemberIn(memberTeams);
            setApplicantIn(applicantTeams);
        })();
    }, []);

    async function leaveTeam(team, action) {
        setAction(action);
        handleShowModal(team);
        console.log('leave team');
    }

    async function cancelApplication(team, action) {
        setAction(action);
        handleShowModal(team);
        console.log('cancel application');
    }

    function handleShowModal(team) {
        const id = team._id;
        const name = team.name;
        setModalData({id, name});
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    return(
        <>
            <TeamModal showModal={showModal} hideModal={handleCloseModal} modalData={modalData} action={action}/>
            <Container className="text-white bg-dark my-3 py-3 rounded">
                <Row>
                    <h3>My teams:</h3>
                </Row>
                <Row>
                    <Col>
                        <h4>Member in:</h4>
                        <ListGroup>
                        {memberIn.length == 0 && <div className="my-3">You aren't a member in any team yet</div>}
                            {memberIn.map(mTeam => 
                                (<ListGroupItem className="bg-dark text-white" key={mTeam._id}>
                                    <Link to={`/teams/${mTeam._id}`} className="navbar-link">
                                        {mTeam.name}
                                    </Link>
                                    <BoxArrowRight onClick={() => leaveTeam(mTeam, 'leave')} className="mx-2 leave_team" data-toggle="test" color="red"></BoxArrowRight>
                                </ListGroupItem>)
                                )}                            
                        </ListGroup>

                    </Col>
                    <Col>
                        <h4>Applicant in:</h4>
                        {applicantIn.length == 0 && <div className="my-3">You haven't applied to a team yet</div>}
                        <ListGroup>
                            {applicantIn.map(aTeam => 
                                (<ListGroupItem className="bg-dark text-white" key={aTeam._id}>
                                    <Link to={`/teams/${aTeam._id}`} className="navbar-link">
                                        {aTeam.name}
                                    </Link>
                                    <XCircle onClick={() => cancelApplication(aTeam, 'cancel')} color="red" className="mx-2 leave_team"></XCircle>
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