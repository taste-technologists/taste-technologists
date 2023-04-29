import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { pageStyle } from './pageStyles';
import LoadingSpinner from '../components/LoadingSpinner';
import { RecReviews } from '../../api/recipes/RecipeReviews';
import RecReviewCard from '../components/RecReviewCard';

/* Renders a table containing all of the Recipe documents. Use <RecipeCard> to render each recipe card. */
const RecReviewsPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { recipes, ready } = useTracker(() => {
    // Get access to RecipeReview documents.
    const subscription = Meteor.subscribe(RecReviews.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();

    let review = null;
    // Get the RecipeReview for belonging to the logged-in user.
    if (rdy) {
      review = RecReviews.collection.find({
        'review.userID': Meteor.userId(),
      }).fetch().flat();
    }
    // Get the recipe that matches the _id

    return {
      recipes: review,
      ready: rdy,
    };
  });
  // Used to display descriptive text when there are no recipes.
  const haveReviews = recipes !== null && recipes.length > 0;

  return (ready ? (
    <Container style={pageStyle} id="my-reviews-page">
      <h2 className="text-center pb-5">My Reviews</h2>
      <Row xs={1} md={2} lg={3} xl={3} className="g-2">
        {/* add parameter to switch heart fill to unfill based on current user */}
        {recipes.map((rev, idx) => <RecReviewCard key={idx} idx={idx} doc={rev} />)}
      </Row>
      <Row className="text-center pt-5" hidden={haveReviews}>
        <h2>You have no reviews!</h2>
        <h3>Click the review button on any recipe to add to this page.</h3>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default RecReviewsPage;
