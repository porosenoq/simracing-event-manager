import { Button, Col, Form, Row } from 'react-bootstrap';
import { create } from '../../services/teamService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

export default function CreateTeam() {

  const navigate = useNavigate();

  const {logoutHandler, auth} = useContext(AuthContext);



  const submitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const teamData = Object.fromEntries(formData);
      teamData.members = [{_id: auth._id}];
      teamData.applicants = [];

      try {
        const team = await create(teamData);
        navigate(`/teams/${team._id}`);
      } catch(err) {
        logoutHandler();
        navigate('/login')
      }
  }

    return (
        <>
    <h2>Create team:</h2>
    <Row className="mx-0">
      <Col md={4} className='container py-5'>
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="teamName">
        <Form.Label>Team name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter team name" />
        <Form.Text className="text-muted">
          {/*{errors ? errors : null}*/}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="teamImage">
        <Form.Label>Team avatar</Form.Label>
        <Form.Control type="text" name="image" placeholder="URL to team avatar image" />
      </Form.Group>
      <Button variant="warning" type="submit">
        Create team
      </Button>
    </Form>
      </Col>
    </Row>
    </>
    );
}