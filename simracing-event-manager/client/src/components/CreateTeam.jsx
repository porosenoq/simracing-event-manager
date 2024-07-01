import { Button, Col, Form, Row } from 'react-bootstrap';

export default function CreateTeam() {
    return (
        <>
    <h2>Create team:</h2>
    <Row className="mx-0">
      <Col md={4} className='container py-5'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Team name</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter team name" />
        <Form.Text className="text-muted">
          Show errors here
          {/*{errors ? errors : null}*/}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Team avatar</Form.Label>
        <Form.Control type="password" name="password" placeholder="URL to team avatar image" />
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