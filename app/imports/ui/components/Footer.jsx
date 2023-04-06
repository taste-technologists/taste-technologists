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
        Last Updated: 4/5/2023
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
