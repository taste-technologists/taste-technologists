import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { DatabaseFillAdd, Fire } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { pageStyle } from './pageStyles';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipes/Recipes';
import { addReviewMethod, wipeoutMethod } from '../../startup/both/Methods';
import { Reviews } from '../../api/recipes/Reviews';

/* Renders a table containing all of the Recipe documents. Use <RecipeCard> to render each recipe card. */
const Generator = () => {
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
  // Sets rev to be the pre-filled review.
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

    swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Meteor.call(wipeoutMethod);
        swal('Deleted!', 'You have just wiped out all Reviews.', 'success');
      } else {
        swal('The reviews have not been deleted');
      }
    });
  };

  return (ready ? (
    <Container style={pageStyle} id="admin-gen" className="text-center">
      <h2 className="text-center pb-5">Review Generator</h2>
      <Row className="justify-content-center">
        <Col md={5}>
          <Row className="my-5">
            <Button type="button" id="rev-gen" variant="success" onClick={() => addRev()}><DatabaseFillAdd /> Add Random Review</Button>
          </Row>

        </Col>
      </Row>
      <Row className="my-5" />
      <Row className="my-5" />
      <Row className="my-5" />
      <Row className="my-5" />

      <Row className="py-5 mt-auto justify-content-center">
        <Col md={3}><Button type="button" id="wipeout" variant="danger" onClick={() => wipeout()}><Fire /> This Will Wipe Out ALL REVIEWS</Button></Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Generator;
