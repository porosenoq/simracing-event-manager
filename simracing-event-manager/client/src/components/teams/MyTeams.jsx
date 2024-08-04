import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import TeamModal from './TeamModal';

import { Col, Container, ListGroup, ListGroupItem, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { BoxArrowRight, XCircle } from 'react-bootstrap-icons';

import { getAll, getById, updateAdmin } from '../../services/teamService';

import "./my_teams.css";

export default function MyTeams() {

    const { auth } = useContext(AuthContext);
    const [memberIn, setMemberIn] = useState([]);
    const [applicantIn, setApplicantIn] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [action, setAction] = useState('');
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        (async function initialLoad() {
            const teams = await getAll();
            setTeamData(teams);
        })
    }, []);

    useEffect(() => {
        (async function loadMyTeams() {
            const teams = await getAll();
            const temp_memberTeams = teams.filter(t => t.members.some(m => m._id == auth._id));
            const temp_applicantTeams = teams.filter(t => t.applicants.some(a => a._id == auth._id));

            setMemberIn(temp_memberTeams);
            setApplicantIn(temp_applicantTeams);
        })();
    }, [teamData]);

    function handleLeaveClick(team, action) {
        setAction(action);
        handleShowModal(team);
    }

    function handleCancelClick(team, action) {
        setAction(action);
        handleShowModal(team);
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

    async function leaveTeam(id) {
        try {
            const team = await getById(id);
            const teamMembers = [...team.members];
            const memberToRemove = teamMembers.findIndex(m => m._id == auth._id);

            teamMembers.splice(memberToRemove, 1);

            await updateAdmin(id, {...team, members: teamMembers});
            setTeamData(oldState => [...oldState, {members: teamMembers}]);
        } catch (err) {
            console.log(err);
        }
    }

    async function cancelApplication(id) {
        try {
            const team = await getById(id);
            const teamApplicants = [...team.applicants];
            const applicantToRemove = teamApplicants.findIndex(a => a._id == auth._id);

            teamApplicants.splice(applicantToRemove, 1);

            await updateAdmin(id, {...team, applicants: teamApplicants})
            setTeamData(oldState => [...oldState, {applicants: teamApplicants}]);
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <>
            <TeamModal showModal={showModal} hideModal={handleCloseModal} modalData={modalData} action={action} handlers={{leaveTeam, cancelApplication}}/>
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
                                    {mTeam._ownerId != auth._id && <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Leave team</Tooltip>}><BoxArrowRight onClick={() => handleLeaveClick(mTeam, 'leave')} className="mx-2 leave_team" data-toggle="test" color="red"></BoxArrowRight></OverlayTrigger>}
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
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Cancel application</Tooltip>}>
                                    <XCircle onClick={() => handleCancelClick(aTeam, 'cancel')} color="red" className="mx-2 leave_team"></XCircle>
                                    </OverlayTrigger>
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