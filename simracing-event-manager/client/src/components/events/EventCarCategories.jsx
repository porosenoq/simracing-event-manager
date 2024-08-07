import { Col, Form, Row } from 'react-bootstrap';

export default function EventCarCategories({errors}) {
    return (
        <>
        <Form.Group>
            <Form.Label>Car categories allowed:</Form.Label>

              <Row className="my-2">
                <Col>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="gt2"
                        label="GT2"
                        inline
                        name="category"
                        value="GT2"
                        />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="gt3"
                        label="GT3"
                        inline
                        name="category"
                        value="GT3"
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="gt4"
                        label="GT4"
                        inline
                        value="GT4"
                        name="category"
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="gtc"
                        label="GTC"
                        inline
                        value="GTC"
                        name="category"
                    />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="tcx"
                        label="TCX"
                        inline
                        value="TCX"
                        name="category"
                    />
                </Col>
                </Row>
                <Form.Text className="text-muted">
  {errors.category}
              </Form.Text>
              </Form.Group>
        </>
    );
}