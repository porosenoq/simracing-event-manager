import { useEffect, useState } from 'react';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function TeamListItem({teamApplicationHandler, auth, team}) {

    const [hasApplied, setHasApplied] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [applicants, setApplicants] = useState(team.applicants);
    const [members, setMembers] = useState(team.members);

    useEffect(() => {
        (async function getApplicants() {
            const alreadyApplied = applicants.some(a => a._id == auth._id);
            const alreadyMember = members.some(m => m._id == auth._id);
            const isOwner = team._ownerId == auth._id;

            setHasApplied(alreadyApplied);
            setIsMember(alreadyMember);
            setIsOwner(isOwner);
        })();
    }, [applicants]);

    return(
        <ListGroup.Item className="bg-dark text-white team_item" key={team._id}>
            <Row>
                <Col md={2}>
                    <Image className="team_image rounded" src={team.image} />
                </Col>
                <Col md={6} className="d-flex align-items-center">
                    <Link className="navbar-link" to={`/teams/${team._id}`}>{team.name}</Link>
                </Col>
                    {auth._id ? 
                <Col className="align-items-center d-flex">
                    {!hasApplied && !isMember? 
                        <Button onClick={() => {teamApplicationHandler(team._id); setApplicants(oldState => [...oldState, {_id: auth._id}])}} size="sm" variant="success">Apply</Button> : 
                        null
                        }
                    {hasApplied && 'Your application is pending...'}
                    {isMember && !isOwner && 'Already a member!'}
                    {isOwner && 'You are the owner of this team'}
                </Col> : 
                    null }
            </Row>
        </ListGroup.Item>
    );
}