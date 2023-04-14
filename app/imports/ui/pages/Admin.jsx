import React from 'react';
import { Col, Container, Image, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileAccount from '../components/ProfileAccount';
import AdminProfileAccount from '../components/AdminProfileAccount';
import { HeartFill, Search, Shop } from 'react-bootstrap-icons';

const Admin = () => (
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
        <HeartFill className="landingIcons" /> <h3>Favorites</h3>
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

export default Admin;
