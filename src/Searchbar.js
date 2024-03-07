import React from "react";
import { Navbar, Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Topic: "" };
  }

  handleChange = event => {
    this.setState({ Topic: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchForTopic(this.state.Topic);
  };

  render() {
    return (
      <React.Fragment>
        <Navbar bg="light" expand="md">
          <Container>
            <Navbar.Brand href="#home">News Feed</Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <Row>
            <Col xs={12}>
              <Card className="border-0">
                <Card.Body className="px-0">
                  <Form>
                    <Row className="mb-3">
                      <Col xs={12} md={5} className='mb-2'>
                        <Form.Group controlId="formSource">
                          <Form.Control
                            type="text"
                            placeholder="Search Topic.."
                            value={this.state.Topic}
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={2} className="d-flex mb-2">
                        <Button variant="outline-primary" className='col-12' onClick={this.handleSubmit}>Search</Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default SearchBar;