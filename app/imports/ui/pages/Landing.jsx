import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Heart, Shop, Search } from 'react-bootstrap-icons';

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
      <Col>
        <Heart className="landingIcons" /> <h3>Favorites</h3>
        <h4>Favorite recipes that you enjoy or frequently use </h4>
      </Col>
      <Col>
        <Shop className="landingIcons" /> <h3>Vendors</h3>
        <h4>Find vendors near campus that sell ingredients </h4>
      </Col>
      <Col>
        <Search className="landingIcons" /> <h3>Search</h3>
        <h4>Search and filter various college student friendly recipes! </h4>
      </Col>
    </Row>
  </Container>
);

export default Landing;
