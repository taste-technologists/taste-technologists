import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row, Table, Button } from 'react-bootstrap';
import { BasketFill, PersonFill, FileTextFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileItem from '../components/Profiles';
import { Recipes } from '../../api/recipes/Recipes';
import { Inventory } from '../../api/vendor/VendorInventory';
import { Profiles } from '../../api/profiles/Profiles';
import InventoryView from './InventoryView';
import ListRecipes from '../components/ListRecipes';
import ListUsers from '../components/ListUsers';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListProfilesAdmin = () => {

  const [view, setView] = useState('default');

  const handleCardClick = (viewName) => {
    setView(viewName);
  };

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { profile, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    const subscription2 = Meteor.subscribe(Recipes.generalPublicationName);
    const subscription3 = Meteor.subscribe(Inventory.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    // Get the Users and Roles
    const users = Profiles.collection.find({}).fetch();

    return {
      profile: users,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id="admin-page">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>Admin Dashboard</h2></Col>
          <Row className="justify-content-center">
            <Col xs={12} sm={4} md={4} lg={4} className="text-center">
              <Button
                onClick={() => handleCardClick('default')}
                variant="primary"
                key="primary"
                text="white"
                className="mb-2 px-3"
              >
                <Card.Title>Users</Card.Title>
                <Card.Text><PersonFill className="mx-1 mb-1" />{Profiles.collection.find().count()}</Card.Text>
              </Button>
            </Col>
            <Col xs={12} sm={4} md={4} lg={4} className="text-center">
              <Button
                onClick={() => handleCardClick('recipes')}
                variant="warning"
                key="warning"
                text="white"
                className="mb-2 px-3 text-white"
              >
                <Card.Title>Recipes</Card.Title>
                <Card.Text><Link to="/search" id="admin-recipes" className="link-light"><FileTextFill className="mx-1 mb-1" /></Link>{Recipes.collection.find().count() }</Card.Text>
              </Button>
            </Col>
            <Col xs={12} sm={4} md={4} lg={4} className="text-center">
              <Button
                onClick={() => handleCardClick('inventory')}
                bg="success"
                variant="success"
                text="white"
                className="mb-2 px-3"
              >
                <Card.Title>Ingredients</Card.Title>
                <Card.Text><Link to="/inventory:" id="admin-inventory" className="link-light"><BasketFill className="mx-1 mb-1" /></Link>{Inventory.collection.find().count()}</Card.Text>
              </Button>
            </Col>
          </Row>
          {view === 'default' && <ListUsers />}
          {view === 'recipes' && <ListRecipes />}
          {view === 'inventory' && <InventoryView />}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfilesAdmin;
