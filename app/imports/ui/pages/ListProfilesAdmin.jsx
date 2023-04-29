import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { BasketFill, PersonFill, FileTextFill, StarFill, KeyFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipes/Recipes';
import { Inventory } from '../../api/vendor/VendorInventory';
import { Profiles } from '../../api/profiles/Profiles';
import InventoryView from './InventoryView';
import ListRecipes from '../components/ListRecipes';
import ListUsers from '../components/ListUsers';
import { RecReviews } from '../../api/recipes/RecipeReviews';
import ListReviews from '../components/ListReviews';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListProfilesAdmin = () => {

  const [view, setView] = useState('default');

  const handleCardClick = (viewName) => {
    setView(viewName);
  };

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, reviews } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    const subscription2 = Meteor.subscribe(Recipes.generalPublicationName);
    const subscription3 = Meteor.subscribe(Inventory.userPublicationName);
    const subscription4 = Meteor.subscribe(RecReviews.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
    const reviewItems = _.sortBy(RecReviews.collection.find({ review: { $exists: true, $not: { $size: 0 } } }).fetch(), 'name');
    return {
      reviews: _.pluck(reviewItems, 'review').flat(),
      ready: rdy,
    };
  }, []);

  const sum = reviews.length;

  console.log(reviews);

  return (ready ? (
    <Container className="py-3" id="admin-page">
      <Row className="justify-content-center">
        <Col md={10}>
          <Col className="text-center"><h2>Admin Dashboard</h2></Col>
          <Row className="justify-content-center">
            <Col xs={12} sm={3} md={3} lg={3} className="text-center">
              <Button
                onClick={() => handleCardClick('default')}
                variant="primary"
                key="primary"
                text="white"
                className="mb-2 px-3"
                id="admin-profiles"
              >
                <Card.Title>Users</Card.Title>
                <Card.Text><PersonFill className="mx-1 mb-1" />{Profiles.collection.find().count()}</Card.Text>
              </Button>
            </Col>
            <Col xs={12} sm={3} md={3} lg={3} className="text-center">
              <Button
                id="admin-recipes"
                onClick={() => handleCardClick('recipes')}
                variant="warning"
                key="warning"
                text="white"
                className="mb-2 px-3 text-white"
              >
                <Card.Title>Recipes</Card.Title>
                <Card.Text><FileTextFill className="mx-1 mb-1" />{Recipes.collection.find().count() }</Card.Text>
              </Button>
            </Col>
            <Col xs={12} sm={3} md={3} lg={3} className="text-center">
              <Button
                onClick={() => handleCardClick('inventory')}
                bg="success"
                variant="success"
                text="white"
                className="mb-2 px-3"
                id="admin-inventory"
              >
                <Card.Title>Ingredients</Card.Title>
                <Card.Text><BasketFill className="mx-1 mb-1" />{Inventory.collection.find().count()}</Card.Text>
              </Button>
            </Col>
            <Col xs={12} sm={3} md={3} lg={3} className="text-center">
              <Button
                onClick={() => handleCardClick('reviews')}
                bg="success"
                variant="secondary"
                text="white"
                className="mb-2 px-3"
                id="admin-reviews"
              >
                <Card.Title>Reviews</Card.Title>
                <Card.Text><StarFill className="mx-1 mb-1" />{sum}</Card.Text>
              </Button>
            </Col>
          </Row>
          {view === 'default' && <ListUsers />}
          {view === 'recipes' && <ListRecipes />}
          {view === 'inventory' && <InventoryView />}
          {view === 'reviews' && <ListReviews />}
        </Col>
      </Row>
      <Row className="text-end"><Col xs={12}><Link to="/admin-gen" id="admin-gen"><KeyFill color="#F2F2F2" size={8} /></Link></Col></Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfilesAdmin;
