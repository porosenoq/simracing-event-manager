import { useContext, useEffect, useState } from 'react';
import { getById, teamApply, update } from '../../services/teamService';
import { useParams } from 'react-router-dom';
import { Button, Container, Image, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PersonDashFill, PersonPlusFill, } from 'react-bootstrap-icons';

import "./teams.css";
import "./teams_card.css";
import AuthContext from '../../contexts/authContext';

export default function TeamDetails() {
	const { auth } = useContext(AuthContext);

	const { teamId } = useParams();
	const [team, setTeam] = useState({});
	const [showAccept, setShowAccept] = useState(false);
	const [showDeny, setShowDeny] = useState(false);
	const [showRemove, setShowRemove] = useState(false);
	const [currentModalusername, setCurrentModalUsername] = useState('');
	const [currentModalId, setCurrentModalId] = useState('');

	useEffect(() => {
		(async function loadTeamData() {
				const teamData = await getById(teamId);
				setTeam(teamData);
		})();
	}, []);

	async function persistStateOnBackend(data) {
		const result = await update(teamId, data);
		console.log(result);
	}

	async function handleClose(modal, choice, userId) {
		if(modal == 'accept') {
			if(choice) {
					console.log('remove user from applicants');
					console.log('add user to members');
					const teamApplicants = [...team.applicants];

					const index = teamApplicants.findIndex(a => a._id == userId);
					const memberToAdd = teamApplicants.splice(index, 1);
					const memberObjToAdd = memberToAdd[0];
					
					setTeam(oldState => ({...oldState, members: [...oldState.members, memberObjToAdd], applicants: [...teamApplicants]}));

					const newState = {...team, members: [...team.members, memberObjToAdd], applicants: [...teamApplicants]};

					persistStateOnBackend(newState);
			}
			setShowAccept(false)
		} else if(modal == 'deny') {
			if(choice) {
					console.log('remove user from applicants');
					const teamApplicants = [...team.applicants];
					const index = teamApplicants.findIndex(a => a._id == userId);
					const applicantToRemove = teamApplicants.splice(index, 1);

					console.log(applicantToRemove);

					setTeam(oldState => ({...oldState, applicants: [...teamApplicants]}));

					const newState = {...team, applicants: [...teamApplicants]};

					persistStateOnBackend(newState);
			}
			setShowDeny(false);
		} else if(modal == 'remove') {
			if(choice) {
					console.log('remove user from members');
					const teamMembers = [...team.members];
					const index = teamMembers.findIndex(m => m._id == userId);
					const memberToRemove = teamMembers.splice(index, 1);

					console.log(memberToRemove);

					setTeam(oldState => ({...oldState, members: [...teamMembers]}));

					const newState = {...team, members: [...teamMembers]};

					persistStateOnBackend(newState);
			}
			setShowRemove(false);
		}
	}

	function handleAccept(username, id) {
		setCurrentModalUsername(username);
		setCurrentModalId(id);
		setShowAccept(true);
	}

	function handleDeny(username, id) {
		setCurrentModalUsername(username);
		setCurrentModalId(id);
		setShowDeny(true);
	}

	function handleRemove(username, id) {
		setCurrentModalUsername(username);
		setCurrentModalId(id);
		setShowRemove(true);
	}

	async function handleApply(teamId) {
		try {
				const result = await teamApply(teamId, auth);
				setTeam(result);
				console.log(result);
				// may add a modal to tell the user his application is pending
		} catch (err) {
				console.log(err);
		}
	}

	return(
		<>
			<Modal className="modal_accept" show={showAccept} onHide={() => {handleClose('accept', false)}}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to add {currentModalusername} to members?</Modal.Title>
				</Modal.Header>
				<Modal.Body>id: {currentModalId}</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={() => {handleClose('accept', true, currentModalId)}}>
							Yes
					</Button>
					<Button variant="danger" onClick={() => {handleClose('accept', false)}}>
							No
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showDeny} onHide={() => {handleClose('deny', false)}}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to decline membership for {currentModalusername}?</Modal.Title>
				</Modal.Header>
				<Modal.Body>id: {currentModalId}</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={() => {handleClose('deny', true)}}>
							Yes
					</Button>
					<Button variant="danger" onClick={() => {handleClose('deny', false)}}>
							No
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showRemove} onHide={() => {handleClose('remove', false)}}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to remove {currentModalusername} from team?</Modal.Title>
				</Modal.Header>
				<Modal.Body>id: {currentModalId}</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={() => {handleClose('remove', true)}}>
							Yes
					</Button>
					<Button variant="danger" onClick={() => {handleClose('remove', false)}}>
							No
					</Button>
				</Modal.Footer>
			</Modal>

			<Container className="py-3 my-3 rounded">
				<div className="page-content page-container" id="page-content">
					<div className="padding">
						<div className="row container d-flex justify-content-center">
							<div className="col-xl-10 col-md-12">
								<div className="card user-card-full">
									<div className="row m-l-0 m-r-0">
										<div className="col-sm-4 bg-c-lite-green user-profile">
											<div className="card-block text-center text-white">
													<div className="m-b-25">
															<Image className="img-radius" src={team.image}/ >
													</div>
													<h5 className="f-w-600">{team.name}</h5>
													{team.applicants?.some(a => a._id == auth._id) || team.members?.some(m => m._id == auth._id) ? null : <Button onClick={() => handleApply(teamId)}variant="success" size="sm">apply</Button>}													
													<i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
											</div>
										</div>
										<div className="col-sm-8 bg-dark">
											<div className="card-block bg-dark text-white">
												<h5 className="m-b-20 p-b-5 b-b-default f-w-600">Members</h5>
												<div className="row">
														<div className="col-sm-12">
																{team.members?.map(m => <h5 key={m._id} className="m-b-10 f-w-600">{m.username}{team._ownerId == auth._id && m._id != auth._id &&
																				<>
																						<OverlayTrigger overlay={<Tooltip id="tooltip-accept">Remove member!</Tooltip>}>
																						<Button
																								onClick={() => handleRemove(m.email, m._id)}
																								variant="danger" 
																								size="sm"
																								className="mx-2"
																						>
																								<PersonDashFill />
																						</Button>
																						</OverlayTrigger>
																				</>
																		}</h5>)}
																
																{team.members?.length == 0 && <h6 className=" f-w-600">no members yet</h6>}
																<p className="m-b-10 f-w-600"></p>
														</div>
												</div>
												<h5 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Pending applications</h5>
												<div className="row">
																<div className="col-sm-12">
																{team.applicants?.map(a =>
																<h5 key={a._id} className="m-b-10 f-w-600">
																		{a.username}
																		{team._ownerId == auth._id && 
																				<>
																				<OverlayTrigger overlay={<Tooltip id="tooltip-accept">Accept!</Tooltip>}>
																						<Button
																								onClick={() => handleAccept(a.email, a._id)}
																								variant="success" 
																								size="sm"
																								className="mx-2"
																						>
																								<PersonPlusFill />
																						</Button>
																						</OverlayTrigger>
																						<OverlayTrigger overlay={<Tooltip id="tooltip-accept">Deny!</Tooltip>}>
																						<Button
																								onClick={() => handleDeny(a.email, a._id)}
																								variant="danger" 
																								size="sm"
																								className="mx-2"
																						>
																								<PersonDashFill />
																						</Button>
																						</OverlayTrigger>
																				</>
																		}
																		
																</h5>)}
																{team.applicants?.length == 0 && <h6 className="f-w-600">no applications yet</h6>}
														</div>
												</div>
												<ul className="social-link list-unstyled m-t-40 m-b-10">
														<li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
														<li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
														<li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}