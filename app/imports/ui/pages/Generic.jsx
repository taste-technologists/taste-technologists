import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { DatabaseFillAdd, Fire } from 'react-bootstrap-icons';
import { pageStyle } from './pageStyles';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipes/Recipes';
import { addReviewMethod, wipeoutMethod } from '../../startup/both/Methods';
import { Reviews } from '../../api/recipes/Reviews';

/* Renders a table containing all of the Recipe documents. Use <RecipeCard> to render each recipe card. */
const GenericPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { recipes, ready } = useTracker(() => {
    // Get access to RecipeReview documents.
    const subscription = Meteor.subscribe(Recipes.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();

    let recipeIDs = null;
    // Get the RecipeReview for belonging to the logged-in user.
    if (rdy) {
      recipeIDs = _.pluck(Recipes.collection.find().fetch(), '_id');
    }
    // Get the recipe that matches the _id

    return {
      recipes: recipeIDs,
      ready: rdy,
    };
  });
  // Used to display descriptive text when there are no recipes.
  const rev = Reviews;
  // console.log(rev);

  const addRev = () => {
    const sample = _.sample(recipes, recipes.length - 6);
    _.each(sample, (id) => {
      const sample2 = _.sample(rev, Math.floor(Math.random() * 10) + 1);
      _.each(sample2, (obj) => Meteor.call(addReviewMethod, { recipeId: id, reviewInfo: obj }));
    });
  };

  const wipeout = () => {
    Meteor.call(wipeoutMethod);
  };

  return (ready ? (
    <Container style={pageStyle} id="my-reviews-page" className="text-center">
      <h2 className="text-center pb-5">Review Generator</h2>
      <Row className="justify-content-center">
        <Col md={5}>
          <Row className="my-5">
            <Button type="button" variant="success" onClick={() => addRev()}><DatabaseFillAdd /> Add Random Review</Button>
          </Row>

        </Col>
      </Row>
      <Row className="my-5" />
      <Row className="my-5" />
      <Row className="my-5" />
      <Row className="my-5" />

      <Row className="py-5 mt-auto justify-content-center">
        <Col md={3}><Button type="button" variant="danger" onClick={() => wipeout()}><Fire /> This Will Wipe Out ALL REVIEWS</Button></Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default GenericPage;
