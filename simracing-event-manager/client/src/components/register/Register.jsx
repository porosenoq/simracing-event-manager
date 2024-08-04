import { useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import AuthContext from '../../contexts/authContext';

export default function Register() {

  const { registerSubmitHandler } = useContext(AuthContext);

    return (
        <>
        <Container className="bg-dark text-white my-3 py-3 rounded">
          <h2>Register:</h2>
          <Row className="mx-0">
          <Col md={4} className='container py-5'>
        <Form onSubmit={registerSubmitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              {/* errors */}
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="repass">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control type="password" name="repass" placeholder="Repeat password" />
          </Form.Group>

          <Button variant="warning" type="submit">
            Register
          </Button>
        </Form>
          </Col>
        </Row>
      </Container>
      </>
    );
}