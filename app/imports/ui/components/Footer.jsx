import React from 'react';
import { Col, Container, Form, FormControl, Button } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center ">
        <h5>Sign Up For Ingredient Price Drop Updates!</h5>
        <hr />
        <div>
          Be notified via email when there is a sale (coming soon)
        </div>
        <Container className="d-inline-flex align-items-center">
          <Form className="form">
            <FormControl type="email" placeholder="name@example.com" />
          </Form>
          <Button>Join</Button>
        </Container>
      </Col>
    </Container>

    <Container>
      <Col className="text-center">
        Taste Technologists
        {' '}
        <br />
        University of Hawaii
        <br />
        <a href="https://forms.gle/g3BMLPyUibYVdFcs9">
          Help us improve our application through your community feedback!
        </a>
        <br />
        <a href="https://taste-technologists.github.io/">
          Project Documentation
          Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
