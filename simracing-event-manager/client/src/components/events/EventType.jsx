import { Col, Form, Row } from 'react-bootstrap';

export default function EventType({changeHandler}) {
    return (
        <>
            <Form.Group>
              <Form.Label>Event type:</Form.Label>

              <Row className="my-2">
                <Col>
                  <Form.Check 
                    reverse
                    name="type"
                    label="Solo"
                    type="radio"
                    value="Solo"
                    id={`reverse-radio-1`}
                    inline
                    onChange={changeHandler}
                  />
                  <Form.Check
                    reverse
                    name="type"
                    label="Team"
                    type="radio"
                    value="Team"
                    id={`reverse-radio-2`}
                    inline
                    onChange={changeHandler}
                  />
                  <Form.Check
                    reverse
                    name="type"
                    label="Both"
                    type="radio"
                    value="Both"
                    id={`reverse-radio-3`}
                    inline
                    onChange={changeHandler}
                  />
                </Col>
                </Row>
              </Form.Group>
        </>
    )
}