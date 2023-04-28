import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Collapse } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { TrashFill } from 'react-bootstrap-icons';
import { delReviewMethod } from '../../startup/both/Methods';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RecReviewCard = ({ doc, idx }) => {
  let review;

  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);

  _.each(doc.review, (el) => {
    if (el.userID === Meteor.userId()) {
      review = el;
    }
  });
  // console.log(review);

  const removeReview = (recipeId, reviewInfo) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Meteor.users.remove(userId);
        Meteor.call(delReviewMethod, { recipeId, reviewInfo });
        swal('Deleted!', 'The review has been deleted.', 'success');
      } else {
        swal('The review has not been deleted');
      }
    });
  };

  return (
    <Col>
      <Card className="px-0">
        <Card.Header>
          <>
            <Card.Title><Link to={`/recipes/${doc.recipeId}`}>{doc.name}</Link></Card.Title>
            <br />
          </>
          <div className="d-flex align-items-center justify-content-between">
            <Card.Subtitle className="mb-2 text-muted">
              Rating: {review.rating}/5
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Reviewed: {new Date(review.created).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Card.Subtitle>
          </div>
        </Card.Header>
        <Card.Body>
          <Button
            variant="link"
            size="sm"
            onClick={toggleCollapse}
            aria-controls="review-comment"
            aria-expanded={isOpen}
          >View Full Comment:
          </Button>
          <Collapse in={isOpen}>
            <Card.Text id="review-comment">{review.comment}</Card.Text>
          </Collapse>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button type="button" id={`review-delete-${idx}`} variant="outline-danger" onClick={() => removeReview(doc.recipeId, review)}><TrashFill /></Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

// Require a document to be passed to this component.
RecReviewCard.propTypes = {
  doc: PropTypes.shape({
    name: PropTypes.string,
    recipeId: PropTypes.string,
    review: PropTypes.arrayOf(PropTypes.shape({
      rating: PropTypes.number,
      comment: PropTypes.string,
      created: PropTypes.instanceOf(Date),
    })),
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default RecReviewCard;
