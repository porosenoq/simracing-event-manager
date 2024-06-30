import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {

    function submitHandler(e) {
    
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData.get("email"));
        
        if(formData.get("email") == "asas@abv.bg") {
            setErrors('This email is taken!');
        }
    }

    const [errors, setErrors] = useState('');

  return (
    <Row className="mx-0">
      <Col md={4} className='container py-5'>
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          {errors ? errors : null}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
      </Col>
    </Row>
  );
}