import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Col, Container, Row, Button } from 'react-bootstrap';
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
  const { ready, reviews, profiles, recipes, inventory } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    const subscription2 = Meteor.subscribe(Recipes.adminPublicationName);
    const subscription3 = Meteor.subscribe(Inventory.userPublicationName);
    const subscription4 = Meteor.subscribe(RecReviews.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
    const reviewItems = _.sortBy(RecReviews.collection.find({ review: { $exists: true, $not: { $size: 0 } } }).fetch(), 'name');
    const profileItems = Profiles.collection.find();
    const recipeItems = Recipes.collection.find();
    const inventoryItems = Inventory.collection.find();
    return {
      reviews: _.pluck(reviewItems, 'review').flat(),
      ready: rdy,
      profiles: profileItems.count(),
      recipes: recipeItems.count(),
      inventory: inventoryItems.count(),
    };
  }, []);

  const sum = reviews.length;

  // console.log(reviews);

  // Define the styles for smaller screens using media queries

  return (ready ? (
    <Container className="py-3" id="admin-page">
      <Row className="justify-content-center">
        <Col md={10}>
          <Col className="text-center"><h2>Admin Dashboard</h2></Col>
          <Row className="justify-content-center text-center flex-nowrap">
            <Col className="pe-1">
              <Button
                onClick={() => handleCardClick('default')}
                variant="primary"
                key="primary"
                text="white"
                className="mb-2 admin-btn"
                id="admin-profiles"
              >
                <>Users<br /><PersonFill className="mx-1 mb-1" />{profiles}</>
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                id="admin-recipes"
                onClick={() => handleCardClick('recipes')}
                variant="warning"
                key="warning"
                text="white"
                className="mb-2 text-white admin-btn"
              >
                <>Recipes<br /><FileTextFill className="mx-1 mb-1" />{recipes}</>
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                onClick={() => handleCardClick('inventory')}
                bg="success"
                variant="success"
                text="white"
                className="mb-2 admin-btn"
                id="admin-inventory"
              >
                <>Inventory<br /><BasketFill className="mx-1 mb-1" />{inventory}</>
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                onClick={() => handleCardClick('reviews')}
                bg="success"
                variant="secondary"
                text="white"
                className="mb-2 admin-btn"
                id="admin-reviews"
              >
                <>Reviews<br /><StarFill className="mx-1 mb-1" />{sum}</>
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
