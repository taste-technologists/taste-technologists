import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image src="/images/FaS-SimpleBold-transparent.png" width={500} />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome!</h1>
        <h2>Sign up now for easy and cheap recipes perfect for the everyday college student!</h2>
      </Col>

    </Row>
  </Container>
);

export default Landing;
