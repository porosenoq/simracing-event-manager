import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import AuthContext from '../../contexts/authContext';

export default function Login() {
  
  const {loginSubmitHandler, errors} = useContext(AuthContext);
    
  //const [errors, setErrors] = useState('');

  return (
    <>
    <Container className="bg-dark text-white my-3 py-3 rounded">
      <h2>Login:</h2>
      <Row className="mx-0">
        <Col md={4} className='container py-5'>
      <Form onSubmit={loginSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            {/*{errors ? errors : null}*/}
            {errors.email ? errors.email : null}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
          <Form.Text className="text-muted">
            {/*{errors ? errors : null}*/}
            {errors.password ? errors.password : null}
          </Form.Text>
        </Form.Group>
        
        <Button variant="warning" type="submit">
          Login
        </Button>
      </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}