import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { RecReviews } from '../../api/recipes/RecipeReviews';
import AdminRecReviewItem from './AdminRecReviewItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, reviews } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(RecReviews.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const reviewItems = _.sortBy(RecReviews.collection.find({ review: { $exists: true, $not: { $size: 0 } } }).fetch(), 'name');
    return {
      reviews: reviewItems,
      ready: rdy,
    };
  }, []);
  const reviewsToDisplay = reviews
    .filter(recipe => recipe.review.length > 0)
    .map(recipe => recipe.review.map((user, index) => (
      <AdminRecReviewItem
        review={user}
        name={recipe.name}
        recId={recipe.recipeId}
        key={index}
        idx={index}
      />
    )));
  const indexOfLastReview = currentPage * 5;
  const indexOfFirstReview = indexOfLastReview - 5;
  const currentReviews = reviewsToDisplay.slice(indexOfFirstReview, indexOfLastReview);

  return (ready ? (
    <Container className="py-3" id="admin-review-page">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2>Reviews</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Author</th>
              <th>Recipe</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Created</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews}
          </tbody>
        </Table>
        <Pagination>
          {Array.from({ length: Math.ceil(reviewsToDisplay.length / 5) }, (__, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>

      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListReviews;
