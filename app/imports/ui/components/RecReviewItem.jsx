import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Row, Col } from 'react-bootstrap';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RecReviewItem = ({ review, idx }) => (
  <Accordion.Item eventKey={idx}>
    <Accordion.Header>
      <Row><Col>Reviewer: {review.user}</Col>
        <Col>{new Date(review.created).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        </Col>
      </Row>
    </Accordion.Header>
    <Accordion.Body>
      <h5>Rating: {review.rating}/5</h5>
      <h6>Comment: </h6>
      <p className="review-comment">{review.comment}</p>
    </Accordion.Body>
  </Accordion.Item>
);

// Require a document to be passed to this component.
RecReviewItem.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.string,
    rating: PropTypes.number,
    comment: PropTypes.string,
    created: PropTypes.instanceOf(Date),
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default RecReviewItem;
